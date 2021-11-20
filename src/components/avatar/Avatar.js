// styles
import './Avatar.css';

export const Avatar = ({ src }) => {
	return (
		<div className="avatar">
			<img src={src} alt="user avatar" />
		</div>
	);
};
