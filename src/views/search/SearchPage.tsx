import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  Container,
  Alert,
  Spinner,
  Row,
  Col,
  Card,
  CardBody,
  ButtonGroup
} from 'reactstrap';
import { API } from '../../services/api.service';
import IntlMessages from '../../components/common/IntlMessages';

import DogCard from '../../components/DogCard/DogCard';
import PaginationComponent from '../../components/Pagination/PaginationComponent';
import TabsPanelComponent from '../../components/TabsPanel/TabsPanelComponent';
import {
  FiltersState,
  RangeType,
  SelectOption,
  SearchPageProps,
  ModalType
} from '../../ts_types';
import ModalComponentContainer from '../../components/Modal/ModalComponentContainer';
import DogsGrid from '../../components/DogsGrid/DogsGrid';
import FiltersView from '../../components/Filters/DisplayFilters/FiltersView';
import FiltersComponent from '../../components/Filters/FiltersComponent';
import {
  PAGE_SIZE,
  AGE_RANGE_MINIMUM,
  AGE_RANGE_MAXIMUM,
  CURRENT_PAGE,
  TOTAL_RECORDS
} from '../../constants/general.constants';
import Theme from '../../components/common/Theme';

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
  const [currentPage, setCurrentPage] = useState<number>(CURRENT_PAGE);
  const [totalRecords, setTotalRecords] = useState<number>(TOTAL_RECORDS);
  const [error, setError] = useState<string | null>(null);
  const [matchedDog, setMatchedDog] = useState<any[]>([]);
  const [modalIsOpen, setModalIsOpen] = useState<ModalType>(null);
  const [ageRange, setAgeRange] = useState<RangeType>({
    min: AGE_RANGE_MINIMUM,
    max: AGE_RANGE_MAXIMUM
  });
  const [allZipCodes, setAllZipCodes] = useState<string[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchBreedList = async () => {
      try {
        const breedList = await API.GET_BREEDS();
        setBreeds(breedList.data);
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
  }, [currentPage, selectedBreed, sortOrder, ageRange, allZipCodes]);

  const fetchDogs = async () => {
    setIsLoading(true);
    const params: any = {
      breeds:
        selectedBreed.length > 0
          ? [...selectedBreed.map((option: SelectOption) => option.value)]
          : [],
      size: PAGE_SIZE,
      from: (currentPage - 1) * PAGE_SIZE,
      sort: sortOrder.value,
      ageMin: ageRange.min,
      ageMax: ageRange.max,
      zipCodes: [...allZipCodes]
    };

    try {
      const response = await API.SEARCH_DOGS({ params });
      const { total, resultIds } = response.data;
      const dogDetails = await API.GET_DOGS_BY_ID(resultIds);
      setDogs(dogDetails.data);
      setTotalRecords(total);
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
      const matchedDogId = await API.MATCH_DOGS(favoritesFromState.favoriteIds);
      const { match } = matchedDogId.data;
      const matchedDogDetails = await API.GET_DOGS_BY_ID([match]);
      if (matchedDogDetails.data.length > 0) {
        handleToggleModal('matchedDog');
      }
      setMatchedDog(matchedDogDetails.data);
      updateFavorites([]);
    } catch (err) {
      setError('Error generating match');
    }
  };

  const handleToggleModal = (modalType: ModalType) => {
    setModalIsOpen(modalType);
  };

  const handleLogout = () => {
    API.LOGOUT();
    navigate('/');
  };

  const handleFavoritesReset = () => {
    clearAllFavorites();
  };

  return (
    <div className="min-vh-100 ">
      <Row className="mb-4 px-4 pt-4 ">
        <Col
          xs={12}
          className="d-flex justify-content-between align-items-center flex-wrap"
        >
          <h2 className="mb-0">
            <IntlMessages id="page.title" />
          </h2>
          <div className="d-flex gap-2 mt-2 mt-sm-0">
            <Theme />
            <Button color="danger" onClick={handleLogout} size="sm">
              <IntlMessages id="button.logout" />
            </Button>
          </div>
        </Col>
      </Row>
      <Container fluid className="px-4">
        {error && (
          <Alert color="danger" className="mb-4">
            {error}
          </Alert>
        )}

        <Card className="mb-4 shadow-sm action-card-background">
          <CardBody>
            <Row className="align-items-center">
              <Col xs={12} md={6} className="mb-3 mb-md-0">
                <ButtonGroup className="w-100">
                  <Button
                    color="primary"
                    onClick={handleGenerateMatch}
                    disabled={favoritesFromState.favoriteIds.length === 0}
                  >
                    <IntlMessages id="button.generate-match" />
                  </Button>
                  <Button
                    color="secondary"
                    onClick={handleFavoritesReset}
                    disabled={favoritesFromState.favoriteIds.length === 0}
                  >
                    <IntlMessages id="button.reset-favorites" />
                  </Button>
                </ButtonGroup>
              </Col>
              <Col xs={12} md={6}>
                <Button
                  color="info"
                  onClick={() => handleToggleModal('locationSearch')}
                  className="w-100"
                  outline
                >
                  <IntlMessages id="button.search-by-location" />
                </Button>
              </Col>
            </Row>
          </CardBody>
        </Card>

        <Card className="mb-4 shadow-sm action-card-background">
          <CardBody>
            <FiltersComponent
              breeds={breeds}
              setSelectedBreed={setSelectedBreed}
              sortOrder={sortOrder}
              setSortOrder={setSortOrder}
              ageRange={ageRange}
              setAgeRange={setAgeRange}
              setCurrentPage={setCurrentPage}
            />
          </CardBody>
        </Card>

        {/* Active Filters Display */}
        {allZipCodes.length > 0 && (
          <Card className="mb-4 shadow-sm action-card-background">
            <CardBody>
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
            </CardBody>
          </Card>
        )}

        {/* Results Section */}
        <Card className="shadow-sm action-card-background">
          <CardBody>
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
                <div className="d-flex justify-content-center mt-4">
                  <PaginationComponent
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    dogsPerPage={PAGE_SIZE}
                    total={totalRecords}
                  />
                </div>
              </>
            ) : (
              <div className="text-center my-5">
                <IntlMessages id="error.no-dogs-found" />
              </div>
            )}
          </CardBody>
        </Card>
      </Container>

      {/* Modals */}
      <ModalComponentContainer
        isModalOpen={modalIsOpen === 'locationSearch'}
        modalTitle={'modal.title-search-by-location'}
        handleToggleModal={() => handleToggleModal(null)}
        modalComponent={TabsPanelComponent}
        showApplyAllButton={true}
        handleApplyFilters={handleApplyFilters}
        showResetButton={true}
        handleResetChanges={handleResetChanges}
      />

      {matchedDog.length > 0 && (
        <ModalComponentContainer
          isModalOpen={modalIsOpen === 'matchedDog'}
          modalTitle={'modal.title-congrats-match'}
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
    </div>
  );
};

export default SearchPage;
