import './SideNav.css';
import SideNavItem from '../SideNavItem/SideNavItem';
import M from '../../assets/nav-icons/haltere.png';
import N from '../../assets/nav-icons/nage.png';
import V from '../../assets/nav-icons/velo.png';
import Y from '../../assets/nav-icons/yoga.png';

function SideNav() {
  const items = [
    {
      src: Y,
      text: 'yoga'
    },
    {
      src: N,
      text: 'natation'
    },
    {
      src: V,
      text: 'vélo'
    },
    {
      src: M,
      text: 'musculation'
    }
  ];

  return (
    <nav className="side-nav">
      <div>
        {items.map((item) => (
            <SideNavItem key={item.text} text={item.text} img={item.src}/>
          ))}
      </div>
      
      <p className='side-nav-copyright'>Copyright, SportSee 2020</p>
    </nav>
  );
}

export default SideNav;