import './WelcomeBanner.css';
import { useState, useEffect } from "react";


function WelcomeBanner(props) {
  const axios = require('axios').default;
  const [userInfo, getUserInfo] = useState({});
  //const userInfosEndPoint = 'http://localhost:3000/user/' + props.userId;

  useEffect(() => {
   // Make a request for a user with a given ID
    axios.get('/user18mock.json')
    .then(function (response) {
      getUserInfo(response.data.data);
      console.log(response.data.data)
    })
    .catch(function (error) {
      console.log(error);
    })
  }, [axios]);

    return (
      <section className='welcome-banner'>
          {/* <h1>Bonjour <span className='welcome-banner-name'>{userInfo.userInfos.firstName}</span></h1> */}
          <p>Félicitations ! Vous avez explosé vos objectifs hier 👏</p>
      </section>
    );
  }
  
  export default WelcomeBanner;