import { useState, useCallback, useEffect } from 'react';
import { Form, FormGroup, Label } from 'reactstrap';
import Select from 'react-select';

import { API } from '../../../services/api.service';
import { debounceSearch } from '../../../services/debounce-search';
import {
  CityFilterProps,
  FilterState,
  SelectOption,
  Location
} from '../../../ts_types';
import IntlMessages from '../../common/IntlMessages';

const CityFilter = (props: CityFilterProps) => {
  const { selectedCities, setTempSelectedFilters, tempSelectedFilters } = props;

  const [filters, setFilters] = useState<FilterState>({
    selectedOptions: [],
    options: [],
    loading: false
  });

  useEffect(() => {
    if (selectedCities.length > 0) {
      setFilters({ ...filters, selectedOptions: selectedCities });
    }
  }, []);

  useEffect(() => {
    setTempSelectedFilters({
      ...tempSelectedFilters,
      selectedCities: filters.selectedOptions
    });
  }, [filters]);

  const fetchOptions = async (inputValue: string) => {
    if (!inputValue) return;

    setFilters((prev) => ({ ...prev, loading: true }));

    try {
      const response = await API.SEARCH_LOCATIONS({ city: inputValue });

      const locations: Location[] = response.data.results;

      const transformedOptions: SelectOption[] = locations.map((loc) => ({
        label: `${loc.city}, ${loc.state} - ${loc.zip_code}`,
        value: loc.zip_code
      }));

      setFilters((prev) => ({
        ...prev,
        options: transformedOptions,
        loading: false
      }));
    } catch (error) {
      console.error(`Error fetching options:`, error);
      setFilters((prev) => ({ ...prev, loading: false }));
    }
  };

  const debouncedFetch = useCallback(
    debounceSearch((inputValue: string) => fetchOptions(inputValue)),
    []
  );

  const handleSelectionChange = (selected: SelectOption[] | null) => {
    setFilters((prev) => ({ ...prev, selectedOptions: selected || [] }));
  };

  return (
    <Form>
      <FormGroup>
        <Label for="citySearch">
          <IntlMessages id="filters.title-city" />
        </Label>
        <Select
          isMulti
          isLoading={filters.loading}
          value={filters.selectedOptions}
          options={filters.options}
          onChange={(selected) =>
            handleSelectionChange(selected as SelectOption[])
          }
          onInputChange={(newVal) => debouncedFetch(newVal)}
          placeholder="Type City Name"
        />
      </FormGroup>
    </Form>
  );
};

export default CityFilter;
