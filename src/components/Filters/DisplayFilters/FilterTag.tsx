import { FilterTagProps } from '../../../ts_types';

const FilterTag = (props: FilterTagProps) => {
  const { filterKey, option, removeFilter } = props;

  return (
    <span key={option.label} style={{ margin: '5px', display: 'inline-block' }}>
      <span
        style={{
          padding: '5px 10px',
          border: '1px solid #ccc',
          borderRadius: '15px',
          display: 'inline-flex',
          alignItems: 'center'
        }}
      >
        {option.label}
        <button
          onClick={() => removeFilter(filterKey, option.label)}
          style={{
            marginLeft: '5px',
            backgroundColor: 'transparent',
            border: 'none',
            cursor: 'pointer',
            color: 'red'
          }}
        >
          X
        </button>
      </span>
    </span>
  );
};

export default FilterTag;
