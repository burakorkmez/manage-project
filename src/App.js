import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext';

// styles
import './App.css';

// pages and components
import Dashboard from './pages/dashboard/Dashboard';
import Create from './pages/create/Create';
import Project from './pages/project/Project';
import Login from './pages/login/Login';
import Signup from './pages/signup/Signup';
import Navbar from './components/navbar/Navbar';
import Sidebar from './components/sidebar/Sidebar';
import OnlineUsers from './components/online/OnlineUsers';

function App() {
	const { user, authIsReady } = useAuthContext();
	return (
		<div className="App">
			{authIsReady && (
				<BrowserRouter>
					{user && <Sidebar />}
					<div className="container">
						<Navbar />
						<Switch>
							<Route exact path="/">
								{user && <Dashboard />}
								{!user && <Redirect to="/login" />}
							</Route>
							<Route path="/create">
								{user && <Create />}
								{!user && <Redirect to="/login" />}
							</Route>
							<Route path="/projects/:id">
								{user && <Project />}
								{!user && <Redirect to="/login" />}
							</Route>
							<Route path="/login">
								{user && <Redirect to="/" />}
								{!user && <Login />}
							</Route>
							<Route path="/signup">
								{user && <Redirect to="/" />}
								{!user && <Signup />}
							</Route>
						</Switch>
					</div>
					{user && <OnlineUsers />}
				</BrowserRouter>
			)}
		</div>
	);
}

export default App;
