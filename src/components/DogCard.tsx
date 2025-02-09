import { Card, CardBody, CardTitle, CardImg, Button } from 'reactstrap';

import { DogCardProps } from '../ts_types'

const DogCard = (props: DogCardProps) => {
  const {
    dog,
    showFavoriteButton,
    optionAdded,
    onFavorite
  } = props;

  return (
    <Card className="mb-4">
      <CardImg top src={dog.img} alt={dog.name} />
      <CardBody>
        <CardTitle tag="h5">{dog.name}</CardTitle>
        <p>Age: {dog.age}</p>
        <p>Breed: {dog.breed}</p>
        <p>Zip Code: {dog.zip_code}</p>
        {showFavoriteButton &&
          <Button color={`${optionAdded ? 'secondary' : 'primary'}`} onClick={onFavorite}>
            {`${optionAdded ? 'Added' : 'Add'} to Favorites`}
          </Button>
        }
      </CardBody>
    </Card>
  );
};

export default DogCard;