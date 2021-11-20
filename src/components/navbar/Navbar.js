import { Link } from 'react-router-dom';
import { useLogout } from '../../hooks/useLogout';

// styles & images
import './Navbar.css';
import Temple from '../../assets/temple.svg';
import { useAuthContext } from '../../hooks/useAuthContext';

export default function Navbar() {
	const { logout, isPending, error } = useLogout();
	const { user } = useAuthContext();

	return (
		<div className="navbar">
			<ul>
				<li className="logo">
					<img src={Temple} alt="logo" />
					<span>Sunday</span>
				</li>
				{!user && (
					<>
						<li>
							<Link to="/login">Login</Link>
						</li>
						<li>
							<Link to="/signup">Signup</Link>
						</li>
					</>
				)}
				{user && (
					<li>
						{!isPending && (
							<button className="btn" onClick={logout}>
								Log out
							</button>
						)}
						{isPending && (
							<button className="btn" onClick={logout}>
								Logging out...
							</button>
						)}
					</li>
				)}
				{error && <li>{error}</li>}
			</ul>
		</div>
	);
}
