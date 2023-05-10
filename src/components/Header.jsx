import { Link, NavLink } from 'react-router-dom';
import Avatar from '../assets/images/avatar-icon.png';

export default function Header() {
	const activeStyles = {
		fontWeight: 'bold',
		textDecoration: 'underline',
		color: '#161616',
	};

	function fakeLogOut() {
		localStorage.removeItem('loggedin');
	}

	return (
		<header>
			<Link className='site-logo' to='/'>
				#AdventureLife
			</Link>
			<nav>
				<NavLink
					to='host'
					className='nav-link'
					style={({ isActive }) => (isActive ? activeStyles : null)}
				>
					Host
				</NavLink>
				<NavLink
					to='about'
					className='nav-link'
					style={({ isActive }) => (isActive ? activeStyles : null)}
				>
					About
				</NavLink>
				<NavLink
					to='cars'
					className='nav-link'
					style={({ isActive }) => (isActive ? activeStyles : null)}
				>
					Cars
				</NavLink>
				<Link to='login' className='login-link'>
					<img src={Avatar} className='login-icon' />
				</Link>
				<button onClick={fakeLogOut}>X</button>
			</nav>
		</header>
	);
}
