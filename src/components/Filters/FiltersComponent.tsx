import DropdownFilter from './DropdownFilter/DropdownFilter';
import MultiRangeSlider from './MultiRangeSliderFilter/MultiRangeSlider';
import { FiltersComponentProps } from '../../ts_types';

const FiltersComponent = (props: FiltersComponentProps) => {
  const {
    breeds,
    setSelectedBreed,
    sortOrder,
    setSortOrder,
    ageRange,
    setAgeRange,
    setCurrentPage
  } = props;

  return (
    <>
      <DropdownFilter<true>
        id={'breed'}
        label={'Breed'}
        placeHolder={'Breed'}
        isClearable={true}
        isMultiSelect={true}
        dropdownOptions={breeds.map((breed: string) => ({
          value: breed,
          label: breed
        }))}
        setChange={setSelectedBreed}
        setCurrentPage={setCurrentPage}
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
          { value: 'name:desc', label: 'Name Descending' }
        ]}
        setChange={setSortOrder}
        setCurrentPage={setCurrentPage}
      />
      <MultiRangeSlider
        id={'slider'}
        label={'Age Range'}
        ageRange={ageRange}
        setRange={setAgeRange}
        setCurrentPage={setCurrentPage}
      />
    </>
  );
};

export default FiltersComponent;
