import { Card, CardBody, CardTitle, CardImg, Button, Badge } from 'reactstrap';

import { DogCardProps } from '../../ts_types';
import IntlMessages from '../common/IntlMessages';

const DogCard = (props: DogCardProps) => {
  const { dog, showFavoriteButton, optionAdded, onFavorite } = props;

  return (
    <Card className="h-100 shadow-sm border-0 hover-shadow mb-4 individual-card-background">
      <div className="position-relative">
        <div className="dog-card-image-wrapper">
          <CardImg
            top
            src={dog.img}
            alt={dog.name}
            className="dog-card-image"
          />
        </div>

        {/* Age badge */}
        <Badge
          color="success"
          className="position-absolute top-0 end-0 m-2 px-2 py-1 rounded-pill"
        >
          {dog.age} <IntlMessages id="dogs.years" />
        </Badge>
      </div>

      <CardBody className="d-flex flex-column">
        <CardTitle tag="h5" className="mb-3">
          {dog.name}
        </CardTitle>

        <div className="flex-grow-1">
          <div className="d-flex align-items-center mb-2">
            <span className="me-2">
              <IntlMessages id="dogs.title-breed" />:
            </span>
            <span className="fw-medium">{dog.breed}</span>
          </div>

          <div className="d-flex align-items-center mb-3">
            <span className="me-2">
              <IntlMessages id="dogs.title-zip-code" />:
            </span>
            <span className="fw-medium">{dog.zip_code}</span>
          </div>
        </div>

        {showFavoriteButton && (
          <div className="mt-auto">
            <Button
              color={optionAdded ? 'secondary' : 'primary'}
              onClick={onFavorite}
              className="w-100"
              size="sm"
            >
              <IntlMessages
                id={
                  optionAdded ? 'button.favorite-added' : 'button.add-favorite'
                }
              />
            </Button>
          </div>
        )}
      </CardBody>
    </Card>
  );
};

export default DogCard;
