import { Link } from 'react-router';

export default function Nav({ openForm }) {
	return (
		<nav className="flex p-[2rem] justify-evenly">
			<Link to="/heroes">HOME</Link>
			<Link to="/heroes" onClick={openForm}>
				NEW POST
			</Link>
		</nav>
	);
}
