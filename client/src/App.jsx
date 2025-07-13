import './App.css';

import { Routes, Route } from 'react-router';
import { useState } from 'react';

import Heroes from './pages/Heroes';
import Hero from './pages/HeroPage';
import Form from './pages/Form';
import Nav from './components/Nav';

export default function App() {
	const [modal, setModal] = useState(false);

	function handleOpen() {
		setModal(!modal);
	}

	return (
		<>
			<Nav openForm={handleOpen} />

			{modal ? <Form /> : null}

			<Routes>
				<Route path="/" element={<h1>HOME</h1>} />

				<Route path="/heroes" element={<Heroes />} />

				<Route path="/heroes/hero/:id" element={<Hero />} />

				{/* <Route path="/heroes/form" element={<Form />} /> */}
			</Routes>
		</>
	);
}
