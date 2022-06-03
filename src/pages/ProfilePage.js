import Header from '../components/Header/Header';
import SideNav from '../components/SideNav/SideNav';
import Stats from '../components/Stats/Stats';
import WelcomeBanner from '../components/WelcomeBanner/WelcomeBanner';
import '../styles/ProfilePage.css';
import { useParams } from 'react-router-dom';

function ProfilePage() {
  const { userId } = useParams();
  console.log(userId)

  return (
    <div>
      <Header />
      <main className='profil-wrapper'>
        <SideNav />
        <div className='profil-content'>
          <WelcomeBanner userId={userId} />
          <Stats userId={userId} />
        </div>
      </main>
    </div>
  );
}

export default ProfilePage;
