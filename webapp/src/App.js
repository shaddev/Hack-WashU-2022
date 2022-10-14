import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import LoginPage from './components/LoginPage'

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/login' element={<LoginPage />}/>
      </Routes>
    </Router>
  );
}

export default App;
