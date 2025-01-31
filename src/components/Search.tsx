import React, { useState, useEffect, JSX } from 'react';
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
import DogCard from '../components/DogCard';
import PaginationComponent from './PaginationComponent';

const SearchPage: React.FC = () => {
  const [dogs, setDogs] = useState<any[]>([]);
  const [breeds, setBreeds] = useState<string[]>([]);
  const [selectedBreed, setSelectedBreed] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<any>({value: 'breed:asc', label: 'Breed Ascending'});
  const [favorites, setFavorites] = useState<string[]>([]);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [error, setError] = useState<string | null>(null);
  const dogsPerPage = 24; // Number of dogs per page
  const maxPagesToShow = 5; // Number of page numbers to display at once
  
  const navigate = useNavigate();

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const breedList = await getBreeds();
        setBreeds(breedList);
        fetchDogs();
      } catch (err) {
        setError('Error fetching data');
        navigate('/')
      }
    };

    fetchInitialData();
  }, [page, selectedBreed, sortOrder]);

  const fetchDogs = async () => {
    const params: any = {
      breeds: selectedBreed ? [selectedBreed] : [],
      size: dogsPerPage,
      from: (page - 1) * dogsPerPage,
      sort: sortOrder.value,
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

  return (
    <Container>
      <h2 className="my-4">Search for Your Perfect Dog</h2>
      {error && <Alert color="danger">{error}</Alert>}
      <Form>
        <FormGroup>
          <Label for="breed">Breed</Label>
          <Select
            id="breed"
            onChange={(e: any) => setSelectedBreed(e.value)}
            getOptionLabel={(e) => e.label}
            getOptionValue={(e) => e.value}
            options={
              breeds.map((breed: string) => ({
                value: breed,
                label: breed
              }))
            }
            placeholder="Sort Order"
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
      </Form>

      <Row>
        {dogs.map((dog) => (
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
    </Container>
  );
};

export default SearchPage;