import { Link } from 'react-router-dom';
import { FaPlus, FaSun, FaMoon } from 'react-icons/fa';
import logo from '../assets/logo_small.png';
import {useDarkMode} from '../context/ThemeContext';

const Navbar = () => {
 const {dark, toggleDark} = useDarkMode();

  return (
    <nav className={`py-2 shadow-sm w-100`} style={{backgroundColor: dark ? '#233142' : '#fafafa', position: 'fixed', top:0, zIndex:2 }}>
      <div className="container d-flex justify-content-between align-items-center">
        <Link to='/' className='text-decoration-none'>
          <div className="d-flex align-items-center gap-2">
            <img src={logo} className="rounded-5" height="50" alt="logo" />
            <h4
              className="mb-0 fw-bold"
              style={{
                background: 'linear-gradient(to right, #28a745, #a0e75a)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              Seed Store
            </h4>
          </div>
        </Link>
        
        <div className="d-flex align-items-center gap-2">
          <Link to="/create" className="btn btn-outline-success">
            <FaPlus />
          </Link>
          <button
            onClick={toggleDark}
            className={`btn ${dark ? 'text-white'  :  'text-black'}`}
          >
            {dark ? <FaMoon /> : <FaSun /> }
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
