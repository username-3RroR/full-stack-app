import { useState, useEffect } from 'react';
import { useParams } from 'react-router';

export default function Hero() {
	const [hero, setHero] = useState([]);

	const { id } = useParams();

	useEffect(() => {
		async function fetchData() {
			const res = await fetch(`http://localhost:8080/heroes/hero/${id}`);
			const data = await res.json();

			console.log(data);

			setHero(data[0]);
		}

		fetchData();
	}, []);

	return (
		<div key={id}>
			<h3>{hero.name}</h3>
			<img src={hero.image} />
			<p>Created by: {hero.creators}</p>
			<p>Aliases: {hero.aliases}</p>
			<p>Partnerships: {hero.partnerships}</p>
		</div>
	);
}
