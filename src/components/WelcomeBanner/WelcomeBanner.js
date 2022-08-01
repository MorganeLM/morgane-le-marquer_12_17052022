import PropTypes from 'prop-types';
import '../WelcomeBanner/WelcomeBanner.css';

function WelcomeBanner(props) {
  return (
    <section className='welcome-banner'>
        <h1>Bonjour <span className='welcome-banner-name'>{props.firstName}</span></h1>
        <p>Félicitations ! Vous avez explosé vos objectifs hier 👏</p>
    </section>
  );
}
  
  export default WelcomeBanner;


WelcomeBanner.propTypes = {
  firstName: PropTypes.string.isRequired,
}