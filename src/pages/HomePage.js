import Header from '../components/Header/Header';
import SideNav from '../components/SideNav/SideNav';
import { Link } from "react-router-dom";

function HomePage() {
  

  return (
    <div>
      <Header />
      <main className='profil-wrapper'>
        <SideNav />
        <div className='profil-content'>
            <h2><i>Mode : {process.env.REACT_APP_ENV}</i></h2><br/>
            <p>Pour ce projet, veuillez consulter les pages des utilisateurs 12 ou 18 pour exemples de données :</p>
            <ul>
                <li><Link to="/12">Utilisateur 12</Link></li>
                <li><Link to="/18">Utilisateur 18</Link></li>
            </ul>
        </div>
      </main>
    </div>
  );
}

export default HomePage;
