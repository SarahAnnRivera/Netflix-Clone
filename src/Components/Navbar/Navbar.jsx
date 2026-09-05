import { useEffect, useRef, useState } from 'react'
import './Navbar.css'
import logo from '../../assets/logo.png'
import search_icon from '../../assets/search_icon.svg'
import bell_icon from '../../assets/bell_icon.svg'
import profile_img from '../../assets/profile_img.png'
import caret_icon from '../../assets/caret_icon.svg'
import { logout } from '../../Firebase'
import { useNavigate } from "react-router-dom";


const Navbar = () => {
    const [showSearch, setShowSearch] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const navRef = useRef();
    const navigate = useNavigate();

  useEffect(() => {
  const handleScroll = () => {
    if (!navRef.current) return;

    if (window.scrollY >= 80) {
      navRef.current.classList.add("nav-dark");
    } else {
      navRef.current.classList.remove("nav-dark");
    }
  };

  window.addEventListener("scroll", handleScroll);

  return () => {
    window.removeEventListener("scroll", handleScroll);
  };
}, []);

useEffect(() => {
  if (!searchTerm.trim()) {
    setSearchResults([]);
    return;
  }

  const timer = setTimeout(() => {
    fetch(
      `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(searchTerm)}&language=en-US&page=1`,
      {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
        },
      }
    )
      .then((res) => res.json())
      .then((res) => {
        setSearchResults(res.results);
      })
      .catch((err) => console.error(err));
  }, 300);

  return () => clearTimeout(timer);
}, [searchTerm]);


  return (
    <div ref={navRef} className='navbar'>
        <div className= 'navbar-left'>
            <img src={logo}/>
            <ul>
  <li><a href="#popular">Popular</a></li>
  <li><a href="#top-rated">Top Rated</a></li>
  <li><a href="#upcoming">Upcoming</a></li>
  <li><a href="#only-on-netflix">Only on Netflix</a></li>
</ul>
        </div>
        <div className= 'navbar-right'>
            <img
  src={search_icon}
  className="icons"
  onClick={() => setShowSearch((prev) => !prev)}
/>

{showSearch && (
    <div className="search-container">
  <input
    type="text"
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    placeholder="Search movies..."
    className="search-input"
  />
   {searchResults.length > 0 && (
      <div className="search-results">
        {searchResults.map((movie) => (
          <div key={movie.id} className="search-result"
          onClick={() => navigate(`/player/${movie.id}`)}>
            {movie.title}
          </div>
        ))}
      </div>
    )}
  </div>
)}
            <p>Children</p>
            <img src={bell_icon} className='icons'/>
            <div className='navbar-profile'>
                <img src={profile_img} className='profile'/>
                 <img src={caret_icon} />
                 <div className='dropdown'>
                    <p onClick={()=>{logout()}}>Sign Out of NetFlix</p>
                 </div>


            </div>
        </div>
      
    </div>
  )
}

export default Navbar
