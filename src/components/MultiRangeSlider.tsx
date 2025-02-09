import { Label } from 'reactstrap';
import Range from 'rc-slider';

import 'rc-slider/assets/index.css';
// import './MultiRangeSlider.css';
import { RcRangeSliderProps } from '../ts_types';

const RcRangeSlider = (props: RcRangeSliderProps) => {
  const { id, label, ageRange, setRange, setCurrentPage } = props;

  return (
    <>
      <Label for={id}>
        {`${label}: `} {ageRange.min} - {ageRange.max}
      </Label>
      <Range
        id={id}
        range={true}
        min={0}
        max={20}
        value={[ageRange.min, ageRange.max]}
        allowCross={true}
        styles={{
          handle: {
            zIndex: 'unset'
          }
        }}
        defaultValue={[ageRange.min, ageRange.max]}
        onChange={(value: any) => {
          const [min, max] = value;
          setRange({ min, max });
          setCurrentPage(1);
        }}
      />
    </>
  );
};

export default RcRangeSlider;
