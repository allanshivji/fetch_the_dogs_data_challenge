import { useState, useEffect } from 'react';
import Select from 'react-select';
import { Form, FormGroup, Label } from 'reactstrap';

import { ZipCodeFilterProps, SelectOption } from '../../ts_types'

const ZipCodeFilter = (props: ZipCodeFilterProps) => {

  const { selectedZipCodes, setTempSelectedFilters, tempSelectedFilters } = props;

  const [tags, setTags] = useState<SelectOption[]>([]);
  const [inputValue, setInputValue] = useState<string>('');

  useEffect(() => {
    if (selectedZipCodes.length > 0) {
      setTags( Array.from(new Set([ ...tags, ...selectedZipCodes ])) )
    }
  }, [])

  useEffect(() => {
    setTempSelectedFilters({ ...tempSelectedFilters, selectedZipCodes: tags})
  }, [tags])

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && inputValue.trim() !== '') {
      const newTag = inputValue.trim();
      if (!tags.some(tag => tag.value === newTag)) {
        setTags([...tags, { label: newTag, value: newTag }]);
      }
      setInputValue(''); // Clear input after adding tag
      event.preventDefault();
    }
  };

  return (
    <Form>
      <FormGroup>
        <Label for="sortOrder">Zip Code</Label>
        <Select
          isMulti
          isClearable
          options={[]}
          value={tags}
          inputValue={inputValue}
          onInputChange={(value) => setInputValue(value)}
          onKeyDown={handleKeyDown}
          placeholder="Type and press enter..."
          components={{
            DropdownIndicator: null, // Hide dropdown arrow
            IndicatorSeparator: () => null, // Remove separator
            Menu: () => null, // Completely hide the dropdown menu
          }}
          styles={{
            control: (base) => ({
              ...base,
              cursor: "text", // Make it behave like an input field
            }),
          }}
        />
      </FormGroup>
    </Form>
  )
}

export default ZipCodeFilter;