import Select from 'react-select';
import { Label } from 'reactstrap';

import { DropdownComponentProps, DropdownValue } from '../../../ts_types';

const DropdownComponent = <T extends boolean>(
  props: DropdownComponentProps<T>
) => {
  const {
    id,
    label,
    placeHolder,
    dropdownOptions,
    isClearable,
    isMultiSelect,
    defaultValue,
    setChange,
    setCurrentPage
  } = props;

  return (
    <>
      <Label for={id}>{label}</Label>
      <Select
        id={id}
        classNamePrefix="react-select"
        isMulti={isMultiSelect}
        placeholder={placeHolder}
        defaultValue={defaultValue || null}
        onChange={(selected) => {
          setCurrentPage(1);
          setChange(selected as DropdownValue<T>);
        }}
        getOptionLabel={(e) => e.label}
        getOptionValue={(e) => e.value}
        isClearable={isClearable}
        options={dropdownOptions}
      />
    </>
  );
};

export default DropdownComponent;
