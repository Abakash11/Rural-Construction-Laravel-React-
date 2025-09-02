import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../backend/context/Auth';

const SideBar = () => {
  const { logout } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-22  z-50">
        
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded-md bg-blue-800 text-white focus:outline-none"
        >
          SideBar
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
        
      </div>

      {/* Sidebar */}
      <div
        className={`fixed lg:static lg:flex lg:min-w-[20%] min-h-full bg-gradient-to-b from-blue-900 to-blue-700 text-white p-6 shadow-lg transform transition-transform duration-300 ease-in-out z-40 ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="flex flex-col h-full">
          <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>
          <ul className="space-y-4 flex-1">
            <li>
              <Link
                to="/admin/services"
                className="block no-underline font-semibold text-lg hover:text-yellow-400 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Services
              </Link>
            </li>
            <li>
              <Link
                to="/admin/projects"
                className="block no-underline font-semibold text-lg hover:text-yellow-400 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Projects
              </Link>
            </li>
             <li>
              <Link
                to="/admin/testimonial"
                className="block no-underline font-semibold text-lg hover:text-yellow-400 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Testimonial
              </Link>
            </li>
            <li>
              <Link
                to="/admin/blogs"
                className="block no-underline font-semibold text-lg hover:text-yellow-400 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Blogs
              </Link>
            </li>
              <li>
              <Link
                to="/admin/members"
                className="block no-underline font-semibold text-lg hover:text-yellow-400 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Members
              </Link>
            </li>
            <li>
              <Link
                to="/admin/dashboard"
                className="block no-underline font-semibold text-lg hover:text-yellow-400 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Dashboard
              </Link>
            </li>
          </ul>
          <div className="mt-auto">
            <button
              onClick={logout}
              className="w-full text-left bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md font-semibold transition"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default SideBar;

