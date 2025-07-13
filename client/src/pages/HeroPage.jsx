import { useState, useEffect } from 'react';
import { useParams } from 'react-router';

export default function Hero() {
	const [hero, setHero] = useState([]);

	const { id } = useParams();

	useEffect(() => {
		async function fetchData() {
			const res = await fetch(
				`https://full-stack-app-91p0.onrender.com/heroes/hero/${id}`
			);
			const data = await res.json();

			console.log(data);

			setHero(data[0]);
		}

		fetchData();
	}, []);

	return (
		<div
			key={id}
			className="flex flex-col text-center items-center gap-[2rem]"
		>
			<h3 className="text-4xl">{hero.name}</h3>
			<img src={hero.image} className="max-h-[70vh] w-fit" />
			<p>Created by: {hero.creators}</p>
			<p>Aliases: {hero.aliases}</p>
			<p>Partnerships: {hero.partnerships}</p>
		</div>
	);
}
