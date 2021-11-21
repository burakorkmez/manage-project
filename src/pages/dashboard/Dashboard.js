import { useState } from 'react';
import { ProjectList } from '../../components/projectlist/ProjectList';
import { useCollection } from '../../hooks/useCollection';
import ProjectFilter from './ProjectFilter';
import { useAuthContext } from '../../hooks/useAuthContext';

import './Dashboard.css';

export default function Dashboard() {
	const { user } = useAuthContext();
	const { documents, error } = useCollection('projects');
	const [currentFilter, setCurrentFilter] = useState('all');

	const changeFilter = (newFilter) => {
		setCurrentFilter(newFilter);
	};

	const projects = documents
		? documents.filter((document) => {
				switch (currentFilter) {
					case 'all':
						return true;

					case 'mine':
						let assignedToMe = false;
						document.assignedUsersList.forEach((u) => {
							if (user.uid === u.id) {
								assignedToMe = true;
							}
						});
						return assignedToMe;

					case 'development':
					case 'design':
					case 'sales':
					case 'marketing':
						return document.category === currentFilter;

					default:
						return true;
				}
		  })
		: null;

	return (
		<div>
			<h2 className="page-title">Dashboard</h2>
			{error && <p className="error">{error}</p>}
			{documents && (
				<ProjectFilter
					changeFilter={changeFilter}
					currentFilter={currentFilter}
				/>
			)}
			{projects && <ProjectList projects={projects} />}
		</div>
	);
}
