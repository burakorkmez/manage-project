import { useEffect, useState } from 'react';
import Select from 'react-select';
import { timestamp } from '../../firebase/config';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useCollection } from '../../hooks/useCollection';

// styles
import './Create.css';

const categories = [
	{ value: 'development', label: 'Development' },
	{ value: 'design', label: 'Design' },
	{ value: 'sales', label: 'Sales' },
	{ value: 'marketing', label: 'Marketing' },
];

export default function Create() {
	const { documents } = useCollection('users');
	const { user } = useAuthContext();

	const [users, setUsers] = useState([]);
	const [error, setError] = useState(null);

	// form field values
	const [name, setName] = useState('');
	const [details, setDetails] = useState('');
	const [dueDate, setDueDate] = useState('');
	const [category, setCategory] = useState('');
	const [assignedUsers, setAssignedUsers] = useState([]);

	useEffect(() => {
		if (documents) {
			const options = documents.map((user) => {
				return { value: user, label: user.displayName };
			});
			setUsers(options);
		}
	}, [documents]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError(null);

		if (!category) {
			setError('Please select a category');
			return;
		}

		if (assignedUsers.length < 1) {
			setError('Please assign project to at least one user');
			return;
		}

		const createdBy = {
			displayName: user.displayName,
			photoURL: user.photoURL,
			id: user.uid,
		};

		const assignedUsersList = assignedUsers.map((user) => {
			return {
				displayName: user.value.displayName,
				photoURL: user.value.photoURL,
				id: user.value.id,
			};
		});

		const project = {
			name,
			details,
			category: category.value,
			dueDate: timestamp.fromDate(new Date(dueDate)),
			comments: [],
			createdBy,
			assignedUsersList,
		};
	};

	return (
		<div className="create-form">
			<h2 className="page-title">Create a new Project</h2>
			<form onSubmit={handleSubmit}>
				<label>
					<span>Project name:</span>
					<input
						required
						type="text"
						onChange={(e) => setName(e.target.value)}
						value={name}
					/>
				</label>
				<label>
					<span>Project Details:</span>
					<textarea
						required
						onChange={(e) => setDetails(e.target.value)}
						value={details}
					></textarea>
				</label>
				<label>
					<span>Set due date:</span>
					<input
						required
						type="date"
						onChange={(e) => setDueDate(e.target.value)}
						value={dueDate}
					/>
				</label>
				<label>
					<span>Project category:</span>
					<Select
						options={categories}
						onChange={(option) => setCategory(option)}
					/>
				</label>
				<label>
					<span>Assign to:</span>
					<Select
						options={users}
						onChange={(option) => setAssignedUsers(option)}
						isMulti
					/>
				</label>

				<button className="btn">Add Project</button>

				{error && <div className="error">{error}</div>}
			</form>
		</div>
	);
}
