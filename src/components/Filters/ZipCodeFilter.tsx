import { useState, useEffect } from 'react';
import Select from 'react-select';
import { Form, FormGroup, Label, Button } from 'reactstrap';

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
  
  // const handleSearch = (event: any) => {
  //   event.preventDefault()
  //   // handleAllZipCodes([...tags.map((tag: TagOption) => tag.value)])
  // }

  return (
    <Form>
      <FormGroup>
        <Label for="sortOrder">Zip Code</Label>
        <Select
          isMulti
          isClearable
          options={[]} // No dropdown options
          value={tags}
          inputValue={inputValue}
          onInputChange={(value) => setInputValue(value)}
          // onChange={(selected) => setTags(selected as TagOption[])}
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
      {/* <Button onClick={(event: any) => handleSearch(event)}>Search</Button> */}
    </Form>
  )
}

export default ZipCodeFilter;