import { FC, useState, useCallback, MouseEventHandler, ChangeEvent, useEffect } from 'react';
import { Button, Form, FormGroup, Label } from 'reactstrap';
import Select from 'react-select';
import { searchLocations } from '../../services/api';

interface SelectOption {
  label: string;
  value: string;
}

interface Location {
  zip_code: string;
  city: string;
  state: string;
}

// Define the structure of each filter
interface FilterState {
  selectedZipCodes: string[]; // Stores only zip_code
  options: SelectOption[];  // Available options fetched from API
  loading: boolean;         // Loading state
}

// Define the state structure for multiple filters
interface FiltersState {
  city: FilterState;
  state: FilterState;
}

interface CityAndStateFiltersProps {
  handleAllZipCodes: (zipCodes: string[]) => void 
}

type FilterKey = keyof FiltersState; // "city" | "state"

const debounce = (func: (...args: any[]) => void) => {
  let timer: NodeJS.Timeout;
  return (...args: any[]) => {
    clearTimeout(timer);
    timer = setTimeout(() => func(...args), 1000);
  };
};

const CityAndStateFilters:FC<CityAndStateFiltersProps> = ({ handleAllZipCodes }) => {

  const [filters, setFilters] = useState<FiltersState>({
    city: { selectedZipCodes: [], options: [], loading: false },
    state: { selectedZipCodes: [], options: [], loading: false }
  });

  useEffect(() => {
    return () => {
      console.log('Doing Cleanup')
      setFilters({
        city: { selectedZipCodes: [], options: [], loading: false },
        state: { selectedZipCodes: [], options: [], loading: false }
      })
    }
  }, [])

  const fetchOptions = async (inputValue: string, filterKey: FilterKey) => {
    if (!inputValue) return;

    setFilters(prev => ({
      ...prev,
      [filterKey]: { ...prev[filterKey], loading: true }
    }));

    try {

      let response;
      if (filterKey === "city") {
        response = await searchLocations({ city: inputValue }); // Fetch cities
      } else {
        response = await searchLocations({ states: [inputValue] }); // Fetch states
      }

      const locations = response.results as Location[];
      let transformedOptions: SelectOption[];

      if (filterKey === "city") {
        transformedOptions = locations.map(loc => ({
          label: `${loc.city}, ${loc.state} - ${loc.zip_code}`,
          value: loc.zip_code,
        }));
      } else {
        transformedOptions = locations.map(loc => ({
          label: `${loc.state} - ${loc.zip_code}`,
          value: loc.zip_code,
        }));
      }

      setFilters(prev => ({
        ...prev,
        [filterKey]: { ...prev[filterKey], options: transformedOptions, loading: false }
      }));
    } catch (error) {
      console.error(`Error fetching ${filterKey} options:`, error);
      setFilters(prev => ({
        ...prev,
        [filterKey]: { ...prev[filterKey], loading: false }
      }));
    }
  };


  // const debouncedFetch = useCallback(debounce(fetchOptions), []);
  const debouncedFetch = useCallback(
    debounce((inputValue: string, filterKey: FilterKey) => fetchOptions(inputValue, filterKey)),
    []
  );

  const handleSelectionChange = (selected: SelectOption[] | null, filterKey: FilterKey) => {
    const selectedZipCodes = selected ? selected.map(option => option.value) : [];
    setFilters(prev => ({
      ...prev,
      [filterKey]: { ...prev[filterKey], selectedZipCodes }
    }));
  };

  const handleSearch = (event: any) => {
    event.preventDefault()
    handleAllZipCodes([ ...filters.city.selectedZipCodes, ...filters.state.selectedZipCodes ])
  }

  console.log('filters',filters)


  return (
    <>
      <Form>
        <FormGroup>
          <Label for="citySearch">City</Label>
          <Select
            isMulti
            isLoading={filters.city.loading}
            options={filters.city.options}
            onChange={(selected) => handleSelectionChange(selected as SelectOption[], "city")}
            onInputChange={(newVal) => debouncedFetch(newVal, "city")}
            placeholder="Type City Name"
          />
        </FormGroup>
        <FormGroup>
          <Label for="stateSearch">State</Label>
          <Select
            isMulti
            isLoading={filters.state.loading}
            options={filters.state.options}
            onChange={(selected) => handleSelectionChange(selected as SelectOption[], "state")}
            onInputChange={(newVal) => debouncedFetch(newVal.toUpperCase(), "state")}
            placeholder="Type State Name"
          />
        </FormGroup>
        <Button onClick={(event: any) => handleSearch(event)}>Search</Button>
      </Form>
    </>
  )
}

export default CityAndStateFilters;