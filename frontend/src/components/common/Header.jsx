// import { Link } from "react-router-dom";
// import Nav from "react-bootstrap/Nav";
// import Navbar from "react-bootstrap/Navbar";

// function Header() {
//   return (
//     <header className="sticky top-0 z-50 w-full shadow-lg">
//       <Navbar expand="lg" className="bg-gradient-to-r from-blue-700 via-green-500 to-yellow-500 px-4">
//         {/* Brand */}
//         <Navbar.Brand as={Link} to="/" className="flex items-center">
//           <span className="bg-pink-700 font-bold tracking-widest px-2 py-1 rounded text-sm md:text-xl text-lime-400 shadow-md">
//             Rural{" "}
//             <span className="md:text-2xl text-sky-300">Construction</span>
//           </span>
//         </Navbar.Brand>

//         {/* Toggle Button (Mobile) */}
//         <Navbar.Toggle
//           aria-controls="basic-navbar-nav"
//           className="border-0 focus:outline-none focus:ring-0"
//         />

//         {/* Collapsible Menu */}
//         <Navbar.Collapse id="basic-navbar-nav">
//           <Nav className="ms-auto flex flex-col lg:flex-row gap-2 lg:gap-6 py-3 lg:py-0">
//             <Nav.Link
//               as={Link}
//               to="/"
//               className="text-blue-900 font-semibold hover:text-white hover:bg-pink-600 px-4 py-2 rounded-md transition-all duration-300"
//             >
//               Home
//             </Nav.Link>
//             <Nav.Link
//               as={Link}
//               to="/about"
//               className="text-blue-900 font-semibold hover:text-white hover:bg-pink-600 px-4 py-2 rounded-md transition-all duration-300"
//             >
//               About Us
//             </Nav.Link>
//             <Nav.Link
//               as={Link}
//               to="/services"
//               className="text-blue-900 font-semibold hover:text-white hover:bg-pink-600 px-4 py-2 rounded-md transition-all duration-300"
//             >
//               Services
//             </Nav.Link>
//             <Nav.Link
//               as={Link}
//               to="/projects"
//               className="text-blue-900 font-semibold hover:text-white hover:bg-pink-600 px-4 py-2 rounded-md transition-all duration-300"
//             >
//               Our Projects
//             </Nav.Link>
//             <Nav.Link
//               as={Link}
//               to="/blogs"
//               className="text-blue-900 font-semibold hover:text-white hover:bg-pink-600 px-4 py-2 rounded-md transition-all duration-300"
//             >
//               Blogs
//             </Nav.Link>
//             <Nav.Link
//               as={Link}
//               to="/contact"
//               className="text-blue-900 font-semibold hover:text-white hover:bg-pink-600 px-4 py-2 rounded-md transition-all duration-300"
//             >
//               Contact Us
//             </Nav.Link>
//           </Nav>
//         </Navbar.Collapse>
//       </Navbar>
//     </header>
//   );
// }

// export default Header;

import { Link, useLocation } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

function Header() {
  const location = useLocation();

  // Utility to check active route
  const isActive = (path) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full shadow-lg">
      <Navbar
        expand="lg"
        className="bg-gradient-to-r from-blue-700 via-green-500 to-yellow-500 px-4"
      >
        {/* Brand */}
        <Navbar.Brand as={Link} to="/" className="flex items-center">
          <span className="bg-pink-700 font-bold tracking-widest px-2 py-1 rounded text-sm md:text-xl text-lime-400 shadow-md">
            Rural{" "}
            <span className="md:text-2xl text-sky-300">Construction</span>
          </span>
        </Navbar.Brand>

        {/* Toggle Button (Mobile) */}
        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          className="border-0 focus:outline-none focus:ring-0"
        />

        {/* Collapsible Menu */}
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto flex flex-col lg:flex-row gap-2 lg:gap-6 py-3 lg:py-0">
            {[
              { path: "/", label: "Home" },
              { path: "/about", label: "About Us" },
              { path: "/services", label: "Services" },
              { path: "/projects", label: "Our Projects" },
              { path: "/blogs", label: "Blogs" },
              { path: "/contact", label: "Contact Us" },
            ].map((item) => (
              <Nav.Link
                as={Link}
                key={item.path}
                to={item.path}
                className={`font-semibold px-4 py-2 rounded-md transition-all duration-300 ${
                  isActive(item.path)
                    ? "bg-dark border-2 border-bottom  border-info text-white shadow-md"
                    : "text-blue-900 hover:text-white hover:bg-pink-600"
                }`}
              >
                {item.label}
              </Nav.Link>
            ))}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </header>
  );
}

export default Header;

