import { Link } from 'react-router-dom';

function Navigation() {
return(
<div>
    <header>

            
                    <Link to='/'>Home</Link>
                    <Link to='/about'>About</Link>
                    <Link to='/contact'>Services</Link>
                    <Link to='/contact'>Contact</Link>
          
          
    </header>
</div>
);
}

export default Navigation;

