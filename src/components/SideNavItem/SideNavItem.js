import './SideNavItem.css'

function SideNavItem(props) {

  return (
    <div className='item'>
        <img src={props.img} alt={props.text} />
    </div>
  );
}

export default SideNavItem;