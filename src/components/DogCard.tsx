import React from 'react';
import { Card, CardBody, CardTitle, CardImg, Button } from 'reactstrap';

interface DogCardProps {
  dog: { id: string; img: string; name: string; age: number; breed: string; zip_code: string };
  onFavorite: () => void;
}

const DogCard: React.FC<DogCardProps> = ({ dog, onFavorite }) => {
  return (
    <Card className="mb-4">
      <CardImg top src={dog.img} alt={dog.name} />
      <CardBody>
        <CardTitle tag="h5">{dog.name}</CardTitle>
        <p>Age: {dog.age}</p>
        <p>Breed: {dog.breed}</p>
        <p>Zip Code: {dog.zip_code}</p>
        <Button color="primary" onClick={onFavorite}>
          Add to Favorites
        </Button>
      </CardBody>
    </Card>
  );
};

export default DogCard;