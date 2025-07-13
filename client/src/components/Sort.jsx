import { useState, useEffect } from 'react';
import { Link, useParams, useSearchParams } from 'react-router';

export default function Sort() {
	const [heroes, setHeroes] = useState([]);

	const { u } = useParams();

	useEffect(() => {
		async function fetchData() {
			const res = await fetch(`http://localhost:8080/heroes?${u}=true`);
			const data = await res.json();

			console.log(data);

			setHeroes(data);
		}

		fetchData();
	}, []);

	const [params, setSearchParams] = useSearchParams();

	if (u == 'DC') {
		heroes.sort();
		console.log(heroes.sort());
	} else if (u == 'Marvel') {
		heroes.sort();
	}

	// function handleSort(e) {
	// 	if (sortDC == 'DC') {
	// 		heroes.sort();
	// 		setSearchParams({ u: e.target.value });
	// 	} else if (sortM == 'Marvel') {
	// 		heroes.sort();
	// 		setSearchParams({ u: e.target.value });
	// 	}
	// }

	return (
		<>
			{/* <select
				onChange={(e) => {
					handleSort(e);
				}}
				name="u"
				value={params.get('DC') || params.get('Marvel') || ''}
			>
				<option value="">All</option>
				<option value="DC">DC Comics</option>
				<option value="Marvel">Marvel Comics</option>
			</select> */}
			<div>
				<Link to="/heroes?DC=true">DC Comics</Link>
				<Link to="/heroes?Marvel=true">Marvel Comics</Link>
				<Link to="/heroes">All</Link>
			</div>

			{/* <div className="grid grid-cols-3 text-center justify-items-center m-[8rem]">
				{heroes.map((h) => (
					<div key={h.id} className="">
						<Link to={`/heroes/hero/${h.id}`}>
							<img src={h.image} className="h-4/5" />
							<h3>{h.name}</h3>
						</Link>
					</div>
				))}
			</div> */}
		</>
	);
}
