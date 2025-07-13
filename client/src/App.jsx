import './App.css';

// import { useState } from 'react';
import { Routes, Route } from 'react-router';

import Heroes from './pages/Heroes';
import Hero from './pages/HeroPage';
import Sort from './components/Sort';
import Form from './pages/Form';

export default function App() {
	// const [count, setCount] = useState(0);

	return (
		<>
			<Form />
			<Routes>
				<Route path="/" element={<h1>HOME</h1>} />

				<Route path="/heroes" element={<Heroes />} />

				<Route path="/heroes/hero/:id" element={<Hero />} />
			</Routes>
		</>
	);
}
