import './WelcomeBanner.css'

function WelcomeBanner(props) {
  const firstName = props.userName || '';

    return (
      <section className='welcome-banner'>
          <h1>Bonjour <span className='welcome-banner-name'>{firstName}</span></h1>
          <p>Félicitations ! Vous avez explosé vos objectifs hier 👏</p>
      </section>
    );
  }
  
  export default WelcomeBanner;