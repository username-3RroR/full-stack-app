import { useState } from 'react';

export default function Form() {
	const [form, setForm] = useState();

	function handleChange(e) {
		setForm({ ...form, [e.target.name]: e.target.value });
	}

	async function handleSubmit(e) {
		e.preventDefault();
		try {
			const res = await fetch(
				`http://localhost:8080/heroes`,
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(form),
				},

				console.log(form)
			);

			if (res.ok) {
				alert('Your form was sent!');
			}
		} catch {
			throw new Error('Did you complete all the fields?');
		}
	}

	return (
		<form onSubmit={handleSubmit}>
			<input
				name="name"
				placeholder="Hero name"
				type="text"
				required
				onChange={handleChange}
			></input>

			<input
				name="image"
				placeholder="Image link"
				type="text"
				required
				onChange={handleChange}
			></input>

			<input
				name="creators"
				placeholder="Created by"
				type="text"
				required
				onChange={handleChange}
			></input>

			<input
				name="aliases"
				placeholder="AKA"
				type="text"
				required
				onChange={handleChange}
			></input>

			<input
				name="partnerships"
				placeholder="Notable partnerships"
				type="text"
				required
				onChange={handleChange}
			></input>

			{/* <input name="u" type="radio"></input>
			<label>DC Comics</label>

			<input name="u" type="radio"></input>
			<label>Marvel Comics</label> */}

			<button type="submit">Send form</button>
		</form>
	);
}
