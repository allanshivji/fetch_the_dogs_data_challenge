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
  Input, 
  Alert
} from 'reactstrap';
import { getBreeds, searchDogs, getDogsByIds, matchDogs } from '../services/api';
import DogCard from '../components/DogCard';
import PaginationComponent from './PaginationComponent';

const SearchPage: React.FC = () => {
  const [dogs, setDogs] = useState<any[]>([]);
  const [breeds, setBreeds] = useState<string[]>([]);
  const [selectedBreed, setSelectedBreed] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<string>('breed:asc');
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
      sort: sortOrder,
    };
    try {
      const response = await searchDogs(params);
      console.log('Search Dogs', response)
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

  // // Determine the range of pages to display
  // const getPageRange = () => {
  //   const range: number[] = [];
  //   const leftLimit = Math.max(1, page - Math.floor(maxPagesToShow / 2));
  //   const rightLimit = Math.min(totalPages, leftLimit + maxPagesToShow - 1);

  //   for (let i = leftLimit; i <= rightLimit; i++) {
  //     range.push(i);
  //   }

  //   return range;
  // };

  // Function to render the page numbers with ellipses and last page
  // const renderPagination = () => {
  //   const range = getPageRange();

  //   const pages: JSX.Element[] = [];

  //   // Always show "1" and "..." before the range if not the first pages
  //   if (range[0] > 1) {
  //     pages.push(
  //       <PaginationItem key="first">
  //         <PaginationLink onClick={() => setPage(1)}>1</PaginationLink>
  //       </PaginationItem>
  //     );
  //     if (range[0] > 2) {
  //       pages.push(
  //         <PaginationItem key="ellipsis-start">
  //           <PaginationLink disabled>...</PaginationLink>
  //         </PaginationItem>
  //       );
  //     }
  //   }

  //   // Add the range of pages
  //   range.forEach((pageNum) => {
  //     pages.push(
  //       <PaginationItem key={pageNum} active={pageNum === page}>
  //         <PaginationLink onClick={() => setPage(pageNum)}>{pageNum}</PaginationLink>
  //       </PaginationItem>
  //     );
  //   });

  //   // Always show "..." and the last page if not the last pages
  //   if (range[range.length - 1] < totalPages) {
  //     if (range[range.length - 1] < totalPages - 1) {
  //       pages.push(
  //         <PaginationItem key="ellipsis-end">
  //           <PaginationLink disabled>...</PaginationLink>
  //         </PaginationItem>
  //       );
  //     }
  //     pages.push(
  //       <PaginationItem key="last">
  //         <PaginationLink onClick={() => setPage(totalPages)}>{totalPages}</PaginationLink>
  //       </PaginationItem>
  //     );
  //   }

  //   return pages;
  // };

  return (
    <Container>
      <h2 className="my-4">Search for Your Perfect Dog</h2>
      {error && <Alert color="danger">{error}</Alert>}
      <Form>
        <FormGroup>
          <Label for="breed">Breed</Label>
          <Input
            type="select"
            name="breed"
            id="breed"
            value={selectedBreed}
            onChange={(e) => setSelectedBreed(e.target.value)}
          >
            <option value="">Select Breed</option>
            {breeds.map((breed) => (
              <option key={breed} value={breed}>
                {breed}
              </option>
            ))}
          </Input>
        </FormGroup>
        <FormGroup>
          <Label for="sortOrder">Sort Order</Label>
          <Input
            type="select"
            name="sortOrder"
            id="sortOrder"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="breed:asc">Breed Ascending</option>
            <option value="breed:desc">Breed Descending</option>
            <option value="name:asc">Name Ascending</option>
            <option value="name:desc">Name Descending</option>
          </Input>
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