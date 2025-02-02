import { FC, useEffect, useState } from "react";
import Range from "rc-slider";
import "rc-slider/assets/index.css";
import './MultiRangeSlider.css'

interface RangeType {
  min: number;
  max: number;
}

interface RcRangeSliderProps {
  minRangeValue: number;
  maxRangeValue: number;
  handleChange: (ranges: RangeType) => void;
}

const RcRangeSlider: FC<RcRangeSliderProps> = ({ minRangeValue, maxRangeValue, handleChange }) => {
  // const [range, setRange] = useState<RangeType>({ min: 0, max: 20 });

  // useEffect(() => {
  //   handleChange(range)
  // }, [range])

  return (
    <Range
      range={true}
      min={0}
      max={20}
      // value={[range.min, range.max]}
      value={[minRangeValue, maxRangeValue]}
      allowCross={true}
      // defaultValue={[range.min, range.max]}
      defaultValue={[minRangeValue, maxRangeValue]}
      onChange={(value: any) => {
        const [min, max] = value;
        handleChange({ min, max })
        // setRange({ min, max });
      }}
    />
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    width: "300px",
    margin: "20px auto",
    textAlign: "center",
  },
};

export default RcRangeSlider;
