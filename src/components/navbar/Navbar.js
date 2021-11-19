import { Link } from 'react-router-dom';
import { useLogout } from '../../hooks/useLogout';

// styles & images
import './Navbar.css';
import Temple from '../../assets/temple.svg';

export default function Navbar() {
	const { logout, isPending, error } = useLogout();

	return (
		<div className="navbar">
			<ul>
				<li className="logo">
					<img src={Temple} alt="logo" />
					<span>Sunday</span>
				</li>

				<li>
					<Link to="/login">Login</Link>
				</li>
				<li>
					<Link to="/signup">Signup</Link>
				</li>
				<li>
					{!isPending && (
						<button className="btn" onClick={logout}>
							Logout
						</button>
					)}
					{isPending && (
						<button className="btn" onClick={logout}>
							Logging out...
						</button>
					)}
				</li>
				{error && <li>{error}</li>}
			</ul>
		</div>
	);
}
