import Header from '../components/Header/Header';
import SideNav from '../components/SideNav/SideNav';
import Stats from '../components/Stats/Stats';
import WelcomeBanner from '../components/WelcomeBanner/WelcomeBanner';
import '../styles/ProfilePage.css';
import { useParams } from 'react-router-dom';
//import { useEffect } from 'react';

function ProfilePage() {
  const params = useParams()
  // const navigate = useNavigate();

  // useEffect(() => {
  //   if(params.userId !== 12 || 18){
  //     navigate("*", {replace: true});
  //   }
  // }, [params.userId])
  
  return (
    <div>
      <Header />
      <main className='profil-wrapper'>
        <SideNav />
        <div className='profil-content'>
          <WelcomeBanner userId={params.userId} />
          <Stats userId={params.userId} />
        </div>
      </main>
    </div>
  );
}

export default ProfilePage;
