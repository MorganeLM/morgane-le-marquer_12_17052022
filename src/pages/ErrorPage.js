import Header from '../components/Header/Header';
import SideNav from '../components/SideNav/SideNav';
import { Link } from "react-router-dom";

function ErrorPage() {
  return (
    <div>
      <Header />
      <main className='profil-wrapper homepage'>
        <SideNav />
        <div className='profil-content'>
            <h2>Error 404</h2>
            <p>Cette page n'existe pas...</p>
            <ul>
                <li><Link to="/">Retour à la page d'accueil</Link></li>
            </ul>
        </div>
      </main>
    </div>
  );
}

export default ErrorPage;
