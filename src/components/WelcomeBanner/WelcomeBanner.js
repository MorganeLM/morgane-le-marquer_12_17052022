import './WelcomeBanner.css';
import { useState, useEffect } from 'react';

function WelcomeBanner(props) {
  const [userInfos, loadUserInfos] = useState([])
  //const userInfosEndPoint = "http://localhost:3000/user/18";
  //const userInfosMockEndPoint = "http://localhost:3001/user18mock.json"

  useEffect(() => {
    const userInfosEndPoint = "http://localhost:3000/user/" + props.userId;

    fetch(userInfosEndPoint).then(response => {
        return response.json();
        }).then(data => {
          loadUserInfos(data.data.userInfos);
        }).catch(err => {
            console.log(err);
        });
    }, [props.userId])

  return (
    <section className='welcome-banner'>
        <h1>Bonjour <span className='welcome-banner-name'>{userInfos.firstName}</span></h1>
        <p>Félicitations ! Vous avez explosé vos objectifs hier 👏</p>
    </section>
  );
}
  
  export default WelcomeBanner;