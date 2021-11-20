// styles
import { useCollection } from '../../hooks/useCollection';
import Avatar from '../avatar/Avatar';
import './OnlineUsers.css';

export default function OnlineUsers() {
	const { documents, error } = useCollection('users');
	return (
		<div className="users">
			<h2>All Users</h2>
			{error && <div className="error">{error}</div>}
			{documents &&
				documents.map((user) => (
					<div key={user.id} className="users-item">
						{user.online && <span className="online-user"></span>}
						<span>{user.displayName}</span>
						<Avatar src={user.photoURL} />
					</div>
				))}
		</div>
	);
}
