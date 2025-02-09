import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  Container,
  Alert
} from 'reactstrap';
import { getBreeds, searchDogs, getDogsByIds, matchDogs, logout } from '../services/api';
import DogCard from './DogCard';
import PaginationComponent from './PaginationComponent';
import MultiRangeSlider from './MultiRangeSlider';
import TabsPanelComponent from './TabsPanel/TabsPanelComponent';
import { FiltersState, RangeType, SelectOption, SearchPageProps } from '../ts_types';
import FilterList from './FilterList';
import ModalComponentContainer from './Modal/ModalComponentContainer';
import DropdownFilter from './DropdownFilter';
import DogsGrid from './DogsGrid';

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

  const [dogs, setDogs] = useState<any[]>([]);
  const [breeds, setBreeds] = useState<string[]>([]);
  const [selectedBreed, setSelectedBreed] = useState<SelectOption[]>([]);
  const [sortOrder, setSortOrder] = useState<SelectOption>({ value: 'breed:asc', label: 'Breed Ascending' });
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalRecords, setTotalRecords] = useState<number>(1);
  const [error, setError] = useState<string | null>(null);
  const [matchedDog, setMatchedDog] = useState<any[]>([]) 
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [ageRange, setAgeRange] = useState<RangeType>({ min: 0, max: 20 });
  const [allZipCodes, setAllZipCodes] = useState<string[]>([])

  const navigate = useNavigate();

  useEffect(() => {
    const fetchBreedList = async () => {
      try {
        const breedList = await getBreeds();
        setBreeds(breedList);
      } catch (err) {
        setError('Error fetching Breed List');
        navigate('/')
      }
    }
    fetchBreedList()
  }, [])

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        fetchDogs();
        if (error) {
          setError('')
        }
      } catch (err) {
        setError('Error fetching data');
        navigate('/')
      }
    };

    fetchInitialData();
  }, [currentPage, selectedBreed, sortOrder, ageRange]);


  useEffect(() => {
    fetchDogs()
  }, [allZipCodes])


  const fetchDogs = async () => {
    const params: any = {
      breeds: selectedBreed.length > 0 ? [...selectedBreed.map((option: SelectOption) => option.value)] : [],
      size: dogsPerPage,
      from: (currentPage - 1) * dogsPerPage,
      sort: sortOrder.value,
      ageMin: ageRange.min,
      ageMax: ageRange.max,
      zipCodes: [...allZipCodes],
    };

    try {
      const response = await searchDogs(params);
      const dogDetails = await getDogsByIds(response.resultIds);
      setDogs(dogDetails);
      setTotalRecords(response.total)
    } catch (err) {
      setError('Error fetching dogs');
    }
  };

  const handleApplyFilters = (allSelectedFilters: FiltersState, doNotToggleModal?: boolean) => {
    const allZipCodesFromFilters = Object.values(allSelectedFilters).flat().map((item: SelectOption) => item.value)
    setAllZipCodes(allZipCodesFromFilters)
    if (!doNotToggleModal) {
      setCurrentPage(1)
      handleToggleModal()
    }
  }

  const handleResetChanges = () => {
    if (Object.values(stateFilters).flat().length > 0) {
      clearLocationFilters()
    }
  }

  const handleFavorite = (dogId: string) => {
    if (favoritesFromState.favoriteIds.includes(dogId)) {
       favoritesFromState.favoriteIds.filter((id: string) => id !== dogId)
    }
    const favoritesToUpdate = favoritesFromState.favoriteIds.includes(dogId)
      ? favoritesFromState.favoriteIds.filter((id: string) => id !== dogId)
      : [ ...favoritesFromState.favoriteIds, dogId]
    updateFavorites(favoritesToUpdate)
  };

  const handleGenerateMatch = async () => {
    try {
      const matchedDogId = await matchDogs(favoritesFromState.favoriteIds);
      const matchedDogDetails = await getDogsByIds([matchedDogId.match])
      setMatchedDog(matchedDogDetails)
      updateFavorites([])
      handleToggleModal()
    } catch (err) {
      setError('Error generating match');
    }
  };

  const handleToggleModal = () => {
    setModalIsOpen(!modalIsOpen)
    if (matchedDog.length > 0) {
      setMatchedDog([])
    }
  }

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const handleFavoritesReset = () => {
    clearAllFavorites()
  }

  return (
    <Container>
      <h2 className="my-4">Welcome to Fetch! 🐶 Find Your New Best Friend</h2>
      {error && <Alert color="danger">{error}</Alert>}
      <Button color="primary" onClick={handleGenerateMatch} disabled={favoritesFromState.favoriteIds.length === 0} className="mt-3 ml-3">
        Generate Match
      </Button>
      <Button color="secondary" onClick={handleFavoritesReset} disabled={favoritesFromState.favoriteIds.length === 0} className="mt-3 ml-3">
        Reset Favorites
      </Button>
      <Button color="danger" onClick={handleLogout} className="mt-3 ml-3">
        Logout
      </Button>
      <br/>
      <DropdownFilter<true>
        id={'breed'}
        label={'Breed'}
        placeHolder={'Breed'}
        isClearable={true}
        isMultiSelect={true}
        dropdownOptions={
          breeds.map((breed: string) => ({
            value: breed,
            label: breed
          }))
        }
        setChange={setSelectedBreed}
      />
      <DropdownFilter<false>
        id={'sortOrder'}
        label={'Sort By'}
        placeHolder={'Sort By'}
        isClearable={false}
        isMultiSelect={false}
        defaultValue={sortOrder}
        dropdownOptions={[
          { value: 'breed:asc', label: 'Breed Ascending' },
          { value: 'breed:desc', label: 'Breed Descending' },
          { value: 'name:asc', label: 'Name Ascending' },
          { value: 'name:desc', label: 'Name Descending' },
        ]}
        setChange={setSortOrder}
      />
      <MultiRangeSlider 
        id={'slider'}
        label={'Age Range'}
        ageRange={ageRange}
        setRange={setAgeRange}
        setCurrentPage={setCurrentPage}
      />
      <Button color="primary" onClick={handleToggleModal}>
        Search By Location
      </Button>
      <ModalComponentContainer
        isModalOpen={modalIsOpen}
        modalTitle={'Search By Location'}
        handleToggleModal={handleToggleModal}
        modalComponent={TabsPanelComponent}
        handleApplyFilters={handleApplyFilters}
        handleResetChanges={handleResetChanges}
      />
      { allZipCodes.length > 0 &&
        <FilterList
          stateFilters={stateFilters}
          handleApplyFilters={handleApplyFilters}
          updateCities={updateCities}
          updateStates={updateStates}
          updateZipCodes={updateZipCodes}
          updateGeoLocations={updateGeoLocations}
        />
      }
      {
        matchedDog.length > 0 &&
        <ModalComponentContainer
          isModalOpen={modalIsOpen}
          modalTitle={'Congratulations! You have matched with...'}
          handleToggleModal={handleToggleModal}
          modalComponent={DogCard}
          modalComponentProps={{
            dog: matchedDog[0],
            showFavoriteButton: false
          }}
          hideModalFooter={true}
          handleApplyFilters={handleApplyFilters}
          handleResetChanges={handleResetChanges}
        />
      }
      {
        dogs.length !== 0 ?
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
          : 'No Dogs Found'
      }
    </Container>
  );
};

export default SearchPage;