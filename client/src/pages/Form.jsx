import { useState } from 'react';

export default function Form() {
	const [form, setForm] = useState();

	const [modal, setModal] = useState(true);

	function handleClose() {
		setModal(!modal);
		form.reset();
	}

	function handleChange(e) {
		setForm({ ...form, [e.target.name]: e.target.value });
	}

	async function handleSubmit(e) {
		e.preventDefault();
		try {
			const res = await fetch(
				`https://full-stack-app-91p0.onrender.com/heroes`,
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
		<dialog
			open
			className="p-[4rem] bg-blue-300 rounded-4xl absolute justify-self-center"
		>
			<form
				onSubmit={handleSubmit}
				className="flex flex-col items-center"
			>
				<input
					name="name"
					placeholder="Hero name"
					type="text"
					required
					onChange={handleChange}
				></input>

				<br />

				<input
					name="image"
					placeholder="Image link"
					type="text"
					required
					onChange={handleChange}
				></input>

				<br />

				<input
					name="creators"
					placeholder="Created by"
					type="text"
					required
					onChange={handleChange}
				></input>

				<br />

				<input
					name="aliases"
					placeholder="AKA"
					type="text"
					required
					onChange={handleChange}
				></input>

				<br />

				<input
					name="partnerships"
					placeholder="Notable partnerships"
					type="text"
					required
					onChange={handleChange}
				></input>

				<br />

				{/* <input name="u" type="radio"></input>
			<label>DC Comics</label>

			<input name="u" type="radio"></input>
			<label>Marvel Comics</label> */}

				<button
					type="submit"
					onClick={handleClose}
					className="bg-emerald-400 p-[1rem] rounded-xl m-[1rem]"
				>
					Send form
				</button>
			</form>
		</dialog>
	);
}
