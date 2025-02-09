import {
  SelectOption,
  FiltersState,
  DisplayAllFiltersViewProps
} from '../ts_types';
import FilterTag from './FilterTag';

const DisplayAllFiltersView = (props: DisplayAllFiltersViewProps) => {
  const { stateFilters, removeFilter } = props;

  return (
    <div className="flex flex-wrap gap-2">
      {Object.keys(stateFilters).map((key) =>
        stateFilters[key as keyof FiltersState].map((option: SelectOption) => (
          <FilterTag
            key={`filter-tag-${key}-${option.label}`}
            filterKey={key}
            option={option}
            removeFilter={removeFilter}
          />
        ))
      )}
    </div>
  );
};

export default DisplayAllFiltersView;
