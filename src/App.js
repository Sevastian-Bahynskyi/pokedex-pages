import './styles/index.css';
import './styles/styles.css';
import { Link, Outlet } from 'react-router-dom';

export default function App() {
	return (
		<>
			<nav>
				<Link className="link" to="/">
					Home
				</Link>
				<Link className="link" to="/about">
					About
				</Link>
			</nav>
			<Outlet></Outlet>
		</>
	);
}
