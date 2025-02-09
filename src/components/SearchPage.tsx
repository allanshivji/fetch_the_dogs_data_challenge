import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Container, Alert, Spinner } from 'reactstrap';
import {
  getBreeds,
  searchDogs,
  getDogsByIds,
  matchDogs,
  logout
} from '../services/api';
import DogCard from './DogCard';
import PaginationComponent from './PaginationComponent';
import TabsPanelComponent from './TabsPanel/TabsPanelComponent';
import {
  FiltersState,
  RangeType,
  SelectOption,
  SearchPageProps,
  ModalType
} from '../ts_types';
import ModalComponentContainer from './Modal/ModalComponentContainer';
import DogsGrid from './DogsGrid';
import FiltersView from './FiltersView';
import FiltersComponent from './FiltersComponent';

const dogsPerPage = 25; // Number of dogs per page

const SearchPage = (props: SearchPageProps) => {
  const {
    stateFilters,
    favoritesFromState,
    updateCities,
    updateStates,
    updateZipCodes,
    updateGeoLocations,
    updateFavorites,
    clearLocationFilters,
    clearAllFavorites
  } = props;

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [dogs, setDogs] = useState<any[]>([]);
  const [breeds, setBreeds] = useState<string[]>([]);
  const [selectedBreed, setSelectedBreed] = useState<SelectOption[]>([]);
  const [sortOrder, setSortOrder] = useState<SelectOption>({
    value: 'breed:asc',
    label: 'Breed Ascending'
  });
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalRecords, setTotalRecords] = useState<number>(1);
  const [error, setError] = useState<string | null>(null);
  const [matchedDog, setMatchedDog] = useState<any[]>([]);
  const [modalIsOpen, setModalIsOpen] = useState<ModalType>(null);
  const [ageRange, setAgeRange] = useState<RangeType>({ min: 0, max: 20 });
  const [allZipCodes, setAllZipCodes] = useState<string[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchBreedList = async () => {
      try {
        const breedList = await getBreeds();
        setBreeds(breedList);
      } catch (err) {
        setError('Error fetching Breed List');
        navigate('/');
      }
    };
    fetchBreedList();
  }, []);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        fetchDogs();
        if (error) {
          setError('');
        }
      } catch (err) {
        setError('Error fetching data');
        navigate('/');
      }
    };

    fetchInitialData();
  }, [currentPage, selectedBreed, sortOrder, ageRange]);

  useEffect(() => {
    fetchDogs();
  }, [allZipCodes]);

  const fetchDogs = async () => {
    setIsLoading(true);
    const params: any = {
      breeds:
        selectedBreed.length > 0
          ? [...selectedBreed.map((option: SelectOption) => option.value)]
          : [],
      size: dogsPerPage,
      from: (currentPage - 1) * dogsPerPage,
      sort: sortOrder.value,
      ageMin: ageRange.min,
      ageMax: ageRange.max,
      zipCodes: [...allZipCodes]
    };

    try {
      const response = await searchDogs(params);
      const dogDetails = await getDogsByIds(response.resultIds);
      setDogs(dogDetails);
      setTotalRecords(response.total);
    } catch (err) {
      setError('Error fetching dogs');
    } finally {
      setIsLoading(false);
    }
  };

  const handleApplyFilters = (
    allSelectedFilters: FiltersState,
    doNotToggleModal?: boolean
  ) => {
    const allZipCodesFromFilters = Object.values(allSelectedFilters)
      .flat()
      .map((item: SelectOption) => item.value);
    setAllZipCodes(allZipCodesFromFilters);
    if (!doNotToggleModal) {
      setCurrentPage(1);
      handleToggleModal(null);
    }
  };

  const handleResetChanges = () => {
    if (Object.values(stateFilters).flat().length > 0) {
      clearLocationFilters();
    }
  };

  const handleFavorite = (dogId: string) => {
    if (favoritesFromState.favoriteIds.includes(dogId)) {
      favoritesFromState.favoriteIds.filter((id: string) => id !== dogId);
    }
    const favoritesToUpdate = favoritesFromState.favoriteIds.includes(dogId)
      ? favoritesFromState.favoriteIds.filter((id: string) => id !== dogId)
      : [...favoritesFromState.favoriteIds, dogId];
    updateFavorites(favoritesToUpdate);
  };

  const handleGenerateMatch = async () => {
    try {
      const matchedDogId = await matchDogs(favoritesFromState.favoriteIds);
      const matchedDogDetails = await getDogsByIds([matchedDogId.match]);
      if (matchedDogDetails.length > 0) {
        handleToggleModal('matchedDog');
      }
      setMatchedDog(matchedDogDetails);
      updateFavorites([]);
    } catch (err) {
      setError('Error generating match');
    }
  };

  const handleToggleModal = (modalType: ModalType) => {
    setModalIsOpen(modalType);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleFavoritesReset = () => {
    clearAllFavorites();
  };

  return (
    <Container>
      <h2 className="my-4">Welcome to Fetch! 🐶 Find Your New Best Friend</h2>
      {error && <Alert color="danger">{error}</Alert>}
      <Button
        color="primary"
        onClick={handleGenerateMatch}
        disabled={favoritesFromState.favoriteIds.length === 0}
        className="mt-3 ml-3"
      >
        Generate Match
      </Button>
      <Button
        color="secondary"
        onClick={handleFavoritesReset}
        disabled={favoritesFromState.favoriteIds.length === 0}
        className="mt-3 ml-3"
      >
        Reset Favorites
      </Button>
      <Button color="danger" onClick={handleLogout} className="mt-3 ml-3">
        Logout
      </Button>
      <br />
      <FiltersComponent
        breeds={breeds}
        setSelectedBreed={setSelectedBreed}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
        ageRange={ageRange}
        setAgeRange={setAgeRange}
        setCurrentPage={setCurrentPage}
      />
      <Button
        color="primary"
        onClick={() => handleToggleModal('locationSearch')}
      >
        Search By Location
      </Button>
      <ModalComponentContainer
        isModalOpen={modalIsOpen === 'locationSearch'}
        modalTitle={'Search By Location'}
        handleToggleModal={() => handleToggleModal(null)}
        modalComponent={TabsPanelComponent}
        showApplyAllButton={true}
        handleApplyFilters={handleApplyFilters}
        showResetButton={true}
        handleResetChanges={handleResetChanges}
      />
      {allZipCodes.length > 0 && (
        <FiltersView
          isModalOpen={modalIsOpen}
          stateFilters={stateFilters}
          handleApplyFilters={handleApplyFilters}
          updateCities={updateCities}
          updateStates={updateStates}
          updateZipCodes={updateZipCodes}
          updateGeoLocations={updateGeoLocations}
          handleToggleModal={handleToggleModal}
        />
      )}
      {matchedDog.length > 0 && (
        <ModalComponentContainer
          isModalOpen={modalIsOpen === 'matchedDog'}
          modalTitle={'Congratulations! You have matched with...'}
          handleToggleModal={() => handleToggleModal(null)}
          modalComponent={DogCard}
          modalComponentProps={{
            dog: matchedDog[0],
            showFavoriteButton: false
          }}
          showApplyAllButton={false}
          handleApplyFilters={handleApplyFilters}
          showResetButton={false}
          handleResetChanges={handleResetChanges}
        />
      )}
      {isLoading ? (
        <div className="d-flex justify-content-center my-5">
          <Spinner color="primary" />
        </div>
      ) : dogs.length !== 0 ? (
        <>
          <DogsGrid
            dogs={dogs}
            handleFavorite={handleFavorite}
            favoritesFromState={favoritesFromState}
          />
          {/* Pagination */}
          <div className="d-flex justify-content-center mt-4">
            <PaginationComponent
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              dogsPerPage={dogsPerPage}
              total={totalRecords}
            />
          </div>
        </>
      ) : (
        <div className="text-center my-5">No Dogs Found</div>
      )}
    </Container>
  );
};

export default SearchPage;
