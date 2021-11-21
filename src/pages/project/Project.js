import { useParams } from 'react-router';
import { useDocument } from '../../hooks/useDocument';
import ProjectDetails from './ProjectDetails';

// styles
import './Project.css';
import ProjectComments from './ProjectComments';

export default function Project() {
	const { id } = useParams();
	const { document, error } = useDocument('projects', id);

	if (error) {
		return <div className="error">{error}</div>;
	}
	if (!document) {
		return <div className="loading">Loading...</div>;
	}

	return (
		<div className="project-details">
			<ProjectDetails project={document} />
			<ProjectComments project={document} />
		</div>
	);
}
