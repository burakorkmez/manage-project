import { BrowserRouter, Switch, Route } from 'react-router-dom';

// styles
import './App.css';
import Dashboard from './pages/dashboard/Dashboard';
import Create from './pages/create/Create';
import Project from './pages/project/Project';
import Login from './pages/login/Login';
import Signup from './pages/signup/Signup';

// pages and components

function App() {
	return (
		<div className="App">
			<BrowserRouter>
				<div className="container">
					<Switch>
						<Route exact path="/">
							<Dashboard />
						</Route>
						<Route path="/create">
							<Create />
						</Route>
						<Route path="/projects/:id">
							<Project />
						</Route>
						<Route exact path="/">
							<Dashboard />
						</Route>
						<Route path="/login">
							<Login />
						</Route>
						<Route path="/signup">
							<Signup />
						</Route>
					</Switch>
				</div>
			</BrowserRouter>
		</div>
	);
}

export default App;
