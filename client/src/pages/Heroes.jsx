import { useState, useEffect } from 'react';
import { Link } from 'react-router';

export default function Heroes() {
	const [heroes, setHeroes] = useState([]);

	useEffect(() => {
		async function fetchData() {
			const res = await fetch(`http://localhost:8080/heroes`);
			const data = await res.json();

			setHeroes(data);
		}

		fetchData();

		const intv = setInterval(fetchData, 2000);

		return () => {
			clearInterval(intv);
		};
	}, []);

	return (
		<>
			<div className="grid grid-cols-3 text-center justify-items-center m-[8rem]">
				{heroes.map((h) => (
					<div key={h.id} className="">
						<Link to={`/heroes/hero/${h.id}`}>
							<img src={h.image} className="h-4/5" />
							<h3>{h.name}</h3>
						</Link>
					</div>
				))}
			</div>
		</>
	);
}
