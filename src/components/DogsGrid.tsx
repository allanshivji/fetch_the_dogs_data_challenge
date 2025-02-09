import { Row, Col } from 'reactstrap';

import DogCard from './DogCard';
import { Dog, FavoritesIds } from '../ts_types';

interface DogGridProps {
  dogs: Dog[];
  favoritesFromState: FavoritesIds;
  handleFavorite: (id: string) => void;
}

const DogGrid = (props: DogGridProps) => {
  const { dogs, favoritesFromState, handleFavorite } = props;

  return (
    <>
      <Row className="justify-content-start">
        {dogs
          .filter((dog) => dog)
          .map((dog) => (
            <Col
              key={dog.id}
              xs="12"
              sm="6"
              md="4"
              lg="3"
              className="col-xl" // This will make columns equal width on xl screens
              style={{ minWidth: '20%', maxWidth: '300px' }} // Forces 5 columns on xl screens
            >
              <DogCard
                dog={dog}
                onFavorite={() => handleFavorite(dog.id)}
                showFavoriteButton={true}
                optionAdded={favoritesFromState.favoriteIds.includes(dog.id)}
              />
            </Col>
          ))}
      </Row>
    </>
  );
};

export default DogGrid;
