import { Dispatch, FC, SetStateAction } from 'react';

export interface FormErrors {
  name?: string;
  email?: string;
}

export interface RangeType {
  min: number;
  max: number;
}

export interface Dog {
  id: string;
  img: string;
  name: string;
  age: number;
  breed: string;
  zip_code: string;
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

export interface FiltersState {
  selectedCities: SelectOption[];
  selectedStates: SelectOption[];
  selectedZipCodes: SelectOption[];
  selectedGeoLocations: SelectOption[];
}

export interface FavoritesIds {
  favoriteIds: string[];
}

export interface Location {
  zip_code: string;
  city: string;
  state: string;
}

export type ModalType =
  | 'locationSearch'
  | 'matchedDog'
  | 'displayAllFilters'
  | null;

export interface TabComponent {
  id: number;
  tabComponentTitle: string;
  tabComponent: FC<{
    setTempSelectedFilters: (selections: FiltersState) => void;
    tempSelectedFilters: FiltersState;
  }>;
}

// ************************************ Component Props **********************************

export interface DogCardProps {
  dog: Dog;
  onFavorite?: () => void;
  showFavoriteButton: boolean;
  optionAdded?: boolean;
}

interface BaseContentProps {
  tempSelectedFilters: FiltersState;
  setTempSelectedFilters: (filters: FiltersState) => void;
}

export interface ModalComponentProps<T = {}> {
  isModalOpen: boolean;
  modalTitle: string;
  handleToggleModal: (modalType: ModalType) => void;
  handleApplyFilters: (
    tempSelectedFilters: FiltersState,
    doNotToggleModal?: boolean
  ) => void;
  handleResetChanges: () => void;
  modalComponent: FC<BaseContentProps & T>;
  modalComponentProps?: Omit<T, keyof BaseContentProps>;
  showApplyAllButton: boolean;
  showResetButton: boolean;
  // modalComponent: FC<{ tempSelectedFilters: FiltersState, setTempSelectedFilters: (selection: FiltersState) => void }>,
  updateCities: (cities: SelectOption[]) => void;
  updateStates: (states: SelectOption[]) => void;
  updateZipCodes: (zipCodes: SelectOption[]) => void;
  updateGeoLocations: (geoLocations: SelectOption[]) => void;
}

export interface TabsPanelComponentProps {
  setTempSelectedFilters: (selections: FiltersState) => void;
  tempSelectedFilters: FiltersState;
}

export interface CityFilterProps {
  selectedCities: SelectOption[];
  setTempSelectedFilters: (selections: FiltersState) => void;
  tempSelectedFilters: FiltersState;
}

export interface StateFilterProps {
  selectedStates: SelectOption[];
  setTempSelectedFilters: (selections: FiltersState) => void;
  tempSelectedFilters: FiltersState;
}

export interface ZipCodeFilterProps {
  selectedZipCodes: SelectOption[];
  setTempSelectedFilters: (selections: FiltersState) => void;
  tempSelectedFilters: FiltersState;
}

export interface SearchPageProps {
  stateFilters: FiltersState;
  favoritesFromState: FavoritesIds;
  updateCities: (cities: SelectOption[]) => void;
  updateStates: (states: SelectOption[]) => void;
  updateZipCodes: (zipCodes: SelectOption[]) => void;
  updateGeoLocations: (geoLocations: SelectOption[]) => void;
  updateFavorites: (favoriteIds: string[]) => void;
  clearLocationFilters: () => void;
  clearAllFavorites: () => void;
}

export interface FilterListProps {
  stateFilters: FiltersState;
  handleApplyFilters: (
    tempSelectedFilters: FiltersState,
    doNotToggleModal?: boolean
  ) => void;
  updateCities: (cities: SelectOption[]) => void;
  updateStates: (states: SelectOption[]) => void;
  updateZipCodes: (zipCodes: SelectOption[]) => void;
  updateGeoLocations: (geoLocations: SelectOption[]) => void;
}

export interface GeoLocationFilterProps {
  setTempSelectedFilters: (selections: FiltersState) => void;
  tempSelectedFilters: FiltersState;
}

export interface RcRangeSliderProps {
  id: string;
  label: string;
  ageRange: RangeType;
  setRange: Dispatch<SetStateAction<RangeType>>;
  setCurrentPage: Dispatch<SetStateAction<number>>;
}

export type DropdownValue<T extends boolean> = T extends true
  ? SelectOption[]
  : SelectOption;

export interface DropdownComponentProps<T extends boolean> {
  id: string;
  label: string;
  placeHolder: string;
  dropdownOptions: SelectOption[];
  isClearable: boolean;
  isMultiSelect: boolean;
  defaultValue?: DropdownValue<T>;
  setChange: Dispatch<SetStateAction<DropdownValue<T>>>;
  setCurrentPage: Dispatch<SetStateAction<number>>;
}

export interface FiltersViewProps {
  isModalOpen: string | null;
  stateFilters: FiltersState;
  handleApplyFilters: (
    tempSelectedFilters: FiltersState,
    doNotToggleModal?: boolean
  ) => void;
  updateCities: (cities: SelectOption[]) => void;
  updateStates: (states: SelectOption[]) => void;
  updateZipCodes: (zipCodes: SelectOption[]) => void;
  updateGeoLocations: (geoLocations: SelectOption[]) => void;
  handleToggleModal: (modalType: ModalType) => void;
}

export interface DisplayAllFiltersViewProps {
  stateFilters: FiltersState;
  removeFilter: (key: string, labelToRemove: string) => void;
}

export interface FilterTagProps {
  filterKey: string;
  option: SelectOption;
  removeFilter: (key: string, labelToRemove: string) => void;
}

export interface FiltersComponentProps {
  breeds: string[];
  setSelectedBreed: Dispatch<SetStateAction<SelectOption[]>>;
  sortOrder: SelectOption;
  setSortOrder: Dispatch<SetStateAction<SelectOption>>;
  ageRange: RangeType;
  setAgeRange: Dispatch<SetStateAction<RangeType>>;
  setCurrentPage: Dispatch<SetStateAction<number>>;
}

export interface ToggleSwitchFilterProps {
  onChange: (value: boolean) => void;
  defaultChecked?: boolean;
  offLabel: string;
  onLabel: string;
}
