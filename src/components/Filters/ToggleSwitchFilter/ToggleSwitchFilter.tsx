import { useState, ChangeEvent } from 'react';
import { Input, Label, FormGroup } from 'reactstrap';

import { ToggleSwitchFilterProps } from '../../../ts_types';
import IntlMessages from '../../common/IntlMessages';

const ToggleSwitchFilter = (props: ToggleSwitchFilterProps) => {
  const { offLabel, onLabel, defaultChecked, onChange } = props;

  const [isDark, setIsDark] = useState(defaultChecked);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIsDark(e.target.checked);
    onChange(e.target.checked);
  };

  const switchStyles = {
    width: '40px',
    height: '20px',
    backgroundColor: isDark ? '#4c4c4c' : '#fff',
    border: isDark ? '1px solid #4c4c4c' : '1px solid #ccc',
    cursor: 'pointer'
  };

  return (
    <FormGroup switch className="d-flex align-items-center">
      <Label check className="me-5">
        <IntlMessages id={offLabel} />
      </Label>
      <Input
        type="switch"
        checked={isDark}
        onChange={handleChange}
        style={switchStyles}
      />
      <Label check className="ms-2">
        <IntlMessages id={onLabel} />
      </Label>
    </FormGroup>
  );
};

export default ToggleSwitchFilter;
