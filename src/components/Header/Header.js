import './Header.css';
import logo from '../../assets/logo/logo.png';
import { Link } from "react-router-dom";

function Header() {
    return (
      <header className="header">
          <Link to="/"><img src={logo} alt='SportSee' /></Link>
          <a href='#'>Accueil</a>
          <a href='#'>Profil</a>
          <a href='#'>Réglage</a>
          <a href='#'>Communauté</a>
      </header>
    );
  }
  
  export default Header;