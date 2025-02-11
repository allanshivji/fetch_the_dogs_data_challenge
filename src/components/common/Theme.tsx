import { useEffect } from 'react';
import ToggleSwitchFilter from '../Filters/ToggleSwitchFilter/ToggleSwitchFilter';

const Theme = () => {
  const setTheme = (switchedValue: boolean) => {
    document
      .querySelector('body')
      ?.setAttribute('data-theme', switchedValue ? 'dark' : 'light');
  };

  useEffect(() => {
    return () => {
      setTheme(false);
    };
  }, []);

  return (
    <ToggleSwitchFilter
      onLabel="button.toggle-theme-off-label"
      offLabel="button.toggle-theme-oon-label"
      defaultChecked={false}
      onChange={setTheme}
    />
  );
};
export default Theme;
