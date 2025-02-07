import { FC } from 'react'

export interface RangeType {
  min: number;
  max: number;
}

export interface SelectOption {
  label: string;
  value: string;
}

export interface FilterState {
  selectedOptions: SelectOption[];
  options: SelectOption[];
  loading: boolean;
}
// export interface FilterState {
//   selectedZipCodes: string[];
//   options: SelectOption[];
//   loading: boolean;
// }

export interface FiltersState {
  selectedCities: SelectOption[];
  selectedStates: SelectOption[];
  selectedZipCodes: SelectOption[];
  selectedGeoLocations: SelectOption[];
}

export interface Location {
  zip_code: string;
  city: string;
  state: string;
}

export interface TabComponent {
  id: number;
  tabComponentTitle: string;
  tabComponent: FC<{ setTempSelectedFilters: (selections: FiltersState) => void, tempSelectedFilters: FiltersState }>
}



export interface ModalComponentProps {
  isModalOpen: boolean;
  modalTitle: string;
  handleToggleModal: () => void;
  handleApplyFilters: (tempSelectedFilters: FiltersState, doNotToggleModal?: boolean) => void;
  modalComponent: FC<{ tempSelectedFilters: FiltersState, setTempSelectedFilters: (selection: FiltersState) => void }>,
  updateCities: (cities: SelectOption[]) => void;
  updateStates: (states: SelectOption[]) => void;
  updateZipCodes: (zipCodes: SelectOption[]) => void;
  updateGeoLocations: (geoLocations: SelectOption[]) => void;
}

export interface TabsPanelComponentProps {
  setTempSelectedFilters: (selections: FiltersState) => void;
  tempSelectedFilters: FiltersState
}

export interface CityFilterProps {
  selectedCities: SelectOption[];
  setTempSelectedFilters: (selections: FiltersState) => void;
  tempSelectedFilters: FiltersState
}

export interface StateFilterProps {
  selectedStates: SelectOption[];
  setTempSelectedFilters: (selections: FiltersState) => void;
  tempSelectedFilters: FiltersState
}

export interface ZipCodeFilterProps {
  selectedZipCodes: SelectOption[];
  setTempSelectedFilters: (selections: FiltersState) => void;
  tempSelectedFilters: FiltersState
}

export interface SearchPageProps {
  stateFilters: FiltersState;
  updateCities: (cities: SelectOption[]) => void;
  updateStates: (states: SelectOption[]) => void;
  updateZipCodes: (zipCodes: SelectOption[]) => void;
  updateGeoLocations: (geoLocations: SelectOption[]) => void;
}

export interface DisplayAllFiltersProps {
  stateFilters: FiltersState;
  handleApplyFilters: (tempSelectedFilters: FiltersState, doNotToggleModal?: boolean) => void;
  updateCities: (cities: SelectOption[]) => void;
  updateStates: (states: SelectOption[]) => void;
  updateZipCodes: (zipCodes: SelectOption[]) => void;
  updateGeoLocations: (geoLocations: SelectOption[]) => void;
}

export interface GeoLocationFilterProps {
  selectedGeoLocations: SelectOption[];
  setTempSelectedFilters: (selections: FiltersState) => void;
  tempSelectedFilters: FiltersState
}