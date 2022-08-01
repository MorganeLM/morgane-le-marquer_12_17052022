import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import UserDataService from '../../services/UserDataService';

function WelcomeBanner(props) {
  const [userInfos, setUserInfos] = useState([])

  useEffect(() => {
    async function callService(){
      let userInfos = await UserDataService.getUserInfos(props.userId)
      setUserInfos(userInfos.userInfos);
    }
    callService();
  }, [props.userId])

  return (
    <section className='welcome-banner'>
        <h1>Bonjour <span className='welcome-banner-name'>{userInfos.firstName}</span></h1>
        <p>Félicitations ! Vous avez explosé vos objectifs hier 👏</p>
    </section>
  );
}
  
  export default WelcomeBanner;


WelcomeBanner.propTypes = {
  userId: PropTypes.string.isRequired,
}