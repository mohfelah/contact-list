import { Route, Routes } from 'react-router-dom';
import './App.css';
import AddEdit from './components/AddEdit';
import AppNavBar from './components/AppNavBar';
import ContactList from './components/ContactList';
import Home from './components/Home';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Profile from './components/auth/Profile';
import PrivateRoute from './components/auth/PrivateRoute';

function App() {
  return (
    <div className="App">
      <AppNavBar/>
      <Routes>
        <Route path = "/" element={<Home/>} />
        <Route path = "/contact_list" element={<PrivateRoute><ContactList/></PrivateRoute>} />
        <Route path = "/add" element={<PrivateRoute><AddEdit/></PrivateRoute>} />
        <Route path = "/edit/:id" element={<PrivateRoute><AddEdit/></PrivateRoute>} />
        <Route path = "/profile" element={<PrivateRoute><Profile/></PrivateRoute>} />
      </Routes>
     <ToastContainer/>
    </div>
  );
}

export default App;
