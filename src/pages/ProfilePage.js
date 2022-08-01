import Header from '../components/Header/Header';
import SideNav from '../components/SideNav/SideNav';
import Stats from '../components/Stats/Stats';
import WelcomeBanner from '../components/WelcomeBanner/WelcomeBanner';
import '../styles/ProfilePage.css';
import { useParams, useNavigate  } from 'react-router-dom';
import { useState, useEffect } from "react";
import UserDataService from "../services/UserDataService";


function ProfilePage() {
  const params = useParams();
  const [userFirstname, setFirstname] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    async function callService(){
      let userInfos = await UserDataService.getUserInfos(params.userId);
      if(userInfos){
        setFirstname(userInfos.userInfos.firstName);
      }else{
        navigate("*", {replace: true});
      }
    }
    callService();
  }, [params.userId, navigate])
  
  return (
    <div>
      <Header />
      <main className='profil-wrapper'>
        <SideNav />
        <div className='profil-content'>
          <WelcomeBanner firstName={userFirstname} />
          <Stats userId={params.userId} />
        </div>
      </main>
    </div>
  );
}

export default ProfilePage;
