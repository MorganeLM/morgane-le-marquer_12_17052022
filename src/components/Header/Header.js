import './Header.css';
import logo from '../../assets/logo/logo.png'

function Header() {
    return (
      <header className="header">
          <a href='#'><img src={logo} alt='SportSee' /></a>
          <a href='#'>Accueil</a>
          <a href='#'>Profil</a>
          <a href='#'>Réglage</a>
          <a href='#'>Communauté</a>
      </header>
    );
  }
  
  export default Header;