import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate
} from 'react-router-dom';
import { useEffect, ReactNode, JSX } from 'react';
import { IntlProvider } from 'react-intl';

import Login from './views/login/Login';
import SearchContainer from './views/search/SearchContainer';
import { setNavigationCallback } from '././services/app.service';
import AppLocale from './lang';
import { LOCALE } from './constants/general.constants';

interface NavigationHandlerProps {
  children: ReactNode;
}

const NavigationHandler = ({
  children
}: NavigationHandlerProps): JSX.Element => {
  const navigate = useNavigate();

  useEffect(() => {
    setNavigationCallback(() => {
      navigate('/');
    });
  }, [navigate]);

  return <>{children}</>;
};

const App = (): JSX.Element => {
  const currentAppLocale = AppLocale[LOCALE];

  return (
    <IntlProvider
      locale={currentAppLocale.locale}
      messages={currentAppLocale.messages}
      defaultLocale="en"
    >
      <Router>
        <NavigationHandler>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/search" element={<SearchContainer />} />
          </Routes>
        </NavigationHandler>
      </Router>
    </IntlProvider>
  );
};

export default App;
