import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Login from './components/Login';
import SearchContainer from './components/SearchContainer';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/search" element={<SearchContainer />} />
      </Routes>
    </Router>
  );
};

export default App;
