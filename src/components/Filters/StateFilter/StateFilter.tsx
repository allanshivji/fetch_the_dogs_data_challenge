import { useState, useCallback, useEffect } from 'react';
import { Form, FormGroup, Label } from 'reactstrap';
import Select from 'react-select';

import { API } from '../../../services/api.service';
import { debounceSearch } from '../../../services/debounce-search';
import {
  StateFilterProps,
  FilterState,
  SelectOption,
  Location
} from '../../../ts_types';
import IntlMessages from '../../common/IntlMessages';

const StateFilter = (props: StateFilterProps) => {
  const { selectedStates, setTempSelectedFilters, tempSelectedFilters } = props;

  const [filters, setFilters] = useState<FilterState>({
    selectedOptions: [],
    options: [],
    loading: false
  });

  useEffect(() => {
    if (selectedStates.length > 0) {
      setFilters({ ...filters, selectedOptions: selectedStates });
    }
  }, []);

  useEffect(() => {
    setTempSelectedFilters({
      ...tempSelectedFilters,
      selectedStates: filters.selectedOptions
    });
  }, [filters]);

  const fetchOptions = async (inputValue: string) => {
    if (!inputValue) return;

    setFilters((prev) => ({ ...prev, loading: true }));

    try {
      const response = await API.SEARCH_LOCATIONS({ states: [inputValue] }); // Fetch states

      const locations: Location[] = response.data.results;

      const transformedOptions: SelectOption[] = locations.map((loc) => ({
        label: `${loc.state} - ${loc.zip_code}`,
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
        <Label for="stateSearch">
          <IntlMessages id="filters.title-state" />
        </Label>
        <Select
          isMulti
          isLoading={filters.loading}
          value={filters.selectedOptions}
          options={filters.options}
          onChange={(selected) =>
            handleSelectionChange(selected as SelectOption[])
          }
          onInputChange={(newVal) => debouncedFetch(newVal.toUpperCase())}
          placeholder="Type State Name"
        />
      </FormGroup>
    </Form>
  );
};

export default StateFilter;
