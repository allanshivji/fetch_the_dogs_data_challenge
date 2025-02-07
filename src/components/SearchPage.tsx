import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Alert
} from 'reactstrap';
import Select from 'react-select';
import { getBreeds, searchDogs, getDogsByIds, matchDogs } from '../services/api';
import DogCard from './DogCard';
import PaginationComponent from './PaginationComponent';
import LocationFilterComponent from './LocationFilterComponent';
import MultiRangeSlider from './MultiRangeSlider';
import TabsPanelComponent from './TabsPanel/TabsPanelComponent';
import { FiltersState, RangeType, SelectOption, SearchPageProps } from '../ts_types';
import DisplayAllFilters from './DisplayAllFilters';
import ModalComponentContainer from './Modal/ModalComponentContainer';

const SearchPage = (props: SearchPageProps) => {

  const { stateFilters, updateCities, updateStates, updateZipCodes, updateGeoLocations } = props;

  const [dogs, setDogs] = useState<any[]>([]);
  const [breeds, setBreeds] = useState<string[]>([]);
  const [selectedBreed, setSelectedBreed] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<any>({ value: 'breed:asc', label: 'Breed Ascending' });
  const [favorites, setFavorites] = useState<string[]>([]);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [error, setError] = useState<string | null>(null);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [zipCodesFromFilter, setZipCodesFromFilter] = useState<string[]>([]);
  const [ageRange, setAgeRange] = useState<RangeType>({ min: 0, max: 20 });

  const [allZipCodes, setAllZipCodes] = useState<string[]>([])
  // const [api, setApi] = useState<any>({});

  const dogsPerPage = 24; // Number of dogs per page
  const maxPagesToShow = 5; // Number of page numbers to display at once

  const navigate = useNavigate();

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const breedList = await getBreeds();
        setBreeds(breedList);
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
  }, [page, selectedBreed, sortOrder, zipCodesFromFilter, ageRange]);

  useEffect(() => {
    fetchDogs()
  }, [allZipCodes])

  const fetchDogs = async () => {
    const params: any = {
      breeds: selectedBreed ? [selectedBreed] : [],
      size: dogsPerPage,
      from: (page - 1) * dogsPerPage,
      sort: sortOrder.value,
      ageMin: ageRange.min,
      ageMax: ageRange.max,
      // zipCodes: [...zipCodesFromFilter],
      zipCodes: [...allZipCodes],
    };

    try {
      const response = await searchDogs(params);
      const dogDetails = await getDogsByIds(response.resultIds);
      setDogs(dogDetails);
      setTotalPages(Math.ceil(response.total / dogsPerPage)); // Calculate total pages
    } catch (err) {
      setError('Error fetching dogs');
    }
  };

  // const handleAllZipCodes = (zipCodes: string[]) => {
  const handleApplyFilters = (allSelectedFilters: FiltersState, doNotToggleModal?: boolean) => {
    const allZipCodesFromFilters = Object.values(allSelectedFilters).flat().map((item: SelectOption) => item.value)
    setAllZipCodes(allZipCodesFromFilters)
    if (!doNotToggleModal) {
      setPage(1)
      handleToggleModal()
    }
  }

  const handleAgeChange = (range: any) => {
    setAgeRange(range)
  }

  const handleZipCodesFromFilter = (zipCodes: string[]) => {
    setZipCodesFromFilter(zipCodes)
  }

  const handleFavorite = (dogId: string) => {
    setFavorites((prev) => {
      if (prev.includes(dogId)) {
        return prev.filter((id) => id !== dogId);
      } else {
        return [...prev, dogId];
      }
    });
  };

  const handleGenerateMatch = async () => {
    try {
      const match = await matchDogs(favorites);
      alert(`You matched with dog ID: ${match.match}`);
    } catch (err) {
      setError('Error generating match');
    }
  };

  const handleToggleModal = () => setModalIsOpen(!modalIsOpen)

  return (
    <Container>
      <h2 className="my-4">Welcome to Fetch! 🐶 Find Your New Best Friend</h2>
      {error && <Alert color="danger">{error}</Alert>}
      <Form>
        <FormGroup>
          <Label for="breed">Breed</Label>
          <Select
            id="breed"
            onChange={(e: any) => {
              if (e?.value) {
                setSelectedBreed(e.value)
              } else {
                setSelectedBreed('')
              }
            }}
            getOptionLabel={(e) => e.label}
            getOptionValue={(e) => e.value}
            isClearable={true}
            options={
              breeds.map((breed: string) => ({
                value: breed,
                label: breed
              }))
            }
            placeholder="Breed"
          />
        </FormGroup>
        <FormGroup>
          <Label for="sortOrder">Sort Order</Label>
          <Select
            id="sortOrder"
            onChange={(selected) => setSortOrder(selected)}
            getOptionLabel={(e) => e.label}
            getOptionValue={(e) => e.value}
            options={[
              { value: 'breed:asc', label: 'Breed Ascending' },
              { value: 'breed:desc', label: 'Breed Descending' },
              { value: 'name:asc', label: 'Name Ascending' },
              { value: 'name:desc', label: 'Name Descending' },
            ]}
            placeholder="Sort Order"
          />
        </FormGroup>
        <FormGroup>
          <Label for="slider">Select Value: {ageRange.min} - {ageRange.max}</Label>
            <MultiRangeSlider minRangeValue={ageRange.min} maxRangeValue={ageRange.max} handleChange={handleAgeChange} />
          </FormGroup>
        <FormGroup>
          {/* <LocationFilterComponent
            handleZipCodesFromFilter={handleZipCodesFromFilter}
          /> */}
        </FormGroup>
      </Form>
      <Button color="primary" onClick={handleToggleModal}>
        Search By Location
      </Button>
      <ModalComponentContainer
        isModalOpen={modalIsOpen}
        modalTitle={'Search By Location'}
        handleToggleModal={handleToggleModal}
        modalComponent={TabsPanelComponent}
        handleApplyFilters={handleApplyFilters}
      />
      { allZipCodes.length > 0 &&
        <DisplayAllFilters
          stateFilters={stateFilters}
          handleApplyFilters={handleApplyFilters}
          updateCities={updateCities}
          updateStates={updateStates}
          updateZipCodes={updateZipCodes}
          updateGeoLocations={updateGeoLocations}
        />
      }

      {/*<Modal isOpen={filterModalOpen} toggle={toggleFilterModal}>
        <ModalHeader toggle={toggleFilterModal}>Search By Location</ModalHeader>
        <AdditionalFilters
          toggleFilterModal={toggleFilterModal}
        /> 
      </Modal>
      */}

      {
        dogs.length !== 0 ?
          <>
            <Row>
              {dogs.filter((dog) => dog).map((dog) => (
                <Col key={dog.id} sm="12" md="6" lg="4" xl="3">
                  <DogCard dog={dog} onFavorite={() => handleFavorite(dog.id)} />
                </Col>
              ))}
            </Row>

            {/* Pagination */}
            <div className="d-flex justify-content-center mt-4">
              <PaginationComponent
                page={page}
                setPage={setPage}
                maxPagesToShow={maxPagesToShow}
                totalPages={totalPages}
              />
            </div>

            <Button color="danger" onClick={handleGenerateMatch} className="mt-3 ml-3">
              Generate Match
            </Button>
          </>
          : 'No Dogs Found'
      }
    </Container>
  );
};

export default SearchPage;