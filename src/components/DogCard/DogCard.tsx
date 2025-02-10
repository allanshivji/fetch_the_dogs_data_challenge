import { Card, CardBody, CardTitle, CardImg, Button } from 'reactstrap';

import { DogCardProps } from '../../ts_types';
import IntlMessages from '../common/IntlMessages';

const DogCard = (props: DogCardProps) => {
  const { dog, showFavoriteButton, optionAdded, onFavorite } = props;

  return (
    <Card className="mb-4">
      <CardImg top src={dog.img} alt={dog.name} />
      <CardBody>
        <CardTitle tag="h5">{dog.name}</CardTitle>
        <p>
          <IntlMessages id="dogs.title-age" />: {dog.age}
        </p>
        <p>
          <IntlMessages id="dogs.title-breed" />: {dog.breed}
        </p>
        <p>
          <IntlMessages id="dogs.title-zip-code" />: {dog.zip_code}
        </p>
        {showFavoriteButton && (
          <Button
            color={`${optionAdded ? 'secondary' : 'primary'}`}
            onClick={onFavorite}
          >
            {
              <IntlMessages
                id={
                  optionAdded ? 'button.favorite-added' : 'button.add-favorite'
                }
              />
            }
          </Button>
        )}
      </CardBody>
    </Card>
  );
};

export default DogCard;
