import { FC, useState, useCallback, useEffect } from 'react';
import { Button, Form, FormGroup, Label } from 'reactstrap';
import Select from 'react-select';

import { searchLocations } from '../../services/api';
import { debounceSearch } from '../../services/debounceSearch';
import { CityFilterProps, FilterState, SelectOption, Location } from '../../ts_types'

const CityFilter = (props: CityFilterProps) => {

  const { selectedCities, setTempSelectedFilters, tempSelectedFilters } = props

  const [filters, setFilters] = useState<FilterState>({ selectedOptions: [], options: [], loading: false });

  useEffect(() => {
    if (selectedCities.length > 0) {
      setFilters({ ...filters, selectedOptions: selectedCities })
    }
  }, [])

  useEffect(() => {
    setTempSelectedFilters({ ...tempSelectedFilters, selectedCities: filters.selectedOptions })
  }, [filters])

  const fetchOptions = async (inputValue: string) => {
    if (!inputValue) return;

    setFilters(prev => ({ ...prev, loading: true }));

    try {
      const response = await searchLocations({ city: inputValue }); // Fetch cities

      const locations: Location[] = response.results;

      const transformedOptions: SelectOption[] = locations.map(loc => ({
        label: `${loc.city}, ${loc.state} - ${loc.zip_code}`,
        value: loc.zip_code,
      }));

      setFilters(prev => ({ ...prev, options: transformedOptions, loading: false }));
    } catch (error) {
      console.error(`Error fetching options:`, error);
      setFilters(prev => ({ ...prev, loading: false }));
    }
  };

  const debouncedFetch = useCallback(
    debounceSearch((inputValue: string) => fetchOptions(inputValue)),
    []
  );

  const handleSelectionChange = (selected: SelectOption[] | null) => {
    // updateCities([...(selected || [])])
    setFilters(prev => ({ ...prev, selectedOptions: selected || [] }));
  };

  // const handleSearch = (event: any) => {
  //   event.preventDefault()
  //   updateCities([...(filters.selectedOptions || [])])
  //   if (filters.selectedOptions.length === 0) return
  //   handleAllZipCodes()
  // }

  return (
    <Form>
      <FormGroup>
        <Label for="citySearch">City</Label>
        <Select
          isMulti
          isLoading={filters.loading}
          value={filters.selectedOptions}
          options={filters.options}
          onChange={(selected) => handleSelectionChange(selected as SelectOption[])}
          onInputChange={(newVal) => debouncedFetch(newVal)}
          placeholder="Type City Name"
        />
      </FormGroup>
      {/* <Button onClick={(event: any) => handleSearch(event)}>Apply Changes</Button> */}
    </Form>
  )
}

export default CityFilter;