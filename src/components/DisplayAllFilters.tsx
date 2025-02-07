import { useState } from "react";

import { FiltersState, DisplayAllFiltersProps, SelectOption } from "../ts_types";

const DisplayAllFilters = (props: DisplayAllFiltersProps) => {
  const { stateFilters } = props;
  console.log('stateFilters',stateFilters)
  const [data, setData] = useState<any>(stateFilters);

  // Function to handle tile removal
  // const removeTile = (key: string, labelToRemove) => {
    // setData((prevData) => {
    //   return {
    //     ...prevData,
    //     [key]: prevData[key].filter((item) => item.label !== labelToRemove),
    //   };
    // });
  // };

  return (
    <div>
      {/* Iterate over each key in the data */}
      {Object.keys(data).map((key) => (
        <div key={key}>
          <h3>{key.toUpperCase()}:</h3>
          {/* Render the labels as tiles with X button */}
          <div>
            {data[key].map((item: SelectOption) => (
              <span key={item.label} style={{ margin: '5px', display: 'inline-block' }}>
                <span
                  style={{
                    padding: '5px 10px',
                    border: '1px solid #ccc',
                    borderRadius: '15px',
                    backgroundColor: '#f0f0f0',
                    display: 'inline-flex',
                    alignItems: 'center',
                  }}
                >
                  {item.label}
                  <button
                    // onClick={() => removeTile(key, item.label)}
                    style={{
                      marginLeft: '5px',
                      backgroundColor: 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      color: 'red',
                    }}
                  >
                    X
                  </button>
                </span>
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default DisplayAllFilters;