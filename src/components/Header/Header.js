import './Header.css';
import logo from '../../assets/logo/logo.png';
import { Link } from "react-router-dom";

function Header() {
    return (
      <header className="header">
          <Link to="/"><img src={logo} alt='SportSee' /></Link>
          <Link to="/">Accueil</Link>
          <Link to="/">Profil</Link>
          <Link to="/">Réglage</Link>
          <Link to="/">Communauté</Link>
      </header>
    );
  }
  
  export default Header;