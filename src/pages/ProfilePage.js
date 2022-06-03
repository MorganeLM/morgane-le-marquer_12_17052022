import { useState, useEffect } from "react";
import Header from '../components/Header/Header';
import SideNav from '../components/SideNav/SideNav';
import Stats from '../components/Stats/Stats';
import WelcomeBanner from '../components/WelcomeBanner/WelcomeBanner';
import '../styles/ProfilePage.css';

function ProfilePage() {
  const axios = require('axios').default;
  const [userInfo, getUserInfo] = useState({});

  useEffect(() => {
   // Make a request for a user with a given ID
    axios.get('http://localhost:3000/user/18')
    .then(function (response) {
      getUserInfo(response.data.data);
      console.log(response.data.data)
    })
    .catch(function (error) {
      console.log(error);
    })
  }, [axios]);

  return (
    <div>
      <Header />
      <main className='profil-wrapper'>
        <SideNav />
        <div className='profil-content'>
          <WelcomeBanner userName={userInfo.userInfos.firstName} />
          <Stats userId={userInfo.id} />
        </div>
      </main>
    </div>
  );
}

export default ProfilePage;
