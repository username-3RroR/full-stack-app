import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pg from 'pg';

const app = express();

app.use(cors());
app.use(express.json());

dotenv.config();

const db = new pg.Pool({
	connectionString: process.env.DB,
});

app.get('/', (req, res) => {
	res.json('root');
});

app.get('/heroes', async (req, res) => {
	if (req.query.DC) {
		const hDC = await db.query(`SELECT heroes.name AS h, universes.name AS u
			FROM heroes
			INNER JOIN heroes_universes
			ON heroes.id = heroes_universes.hero_id
			INNER JOIN universes
			ON universes.id = heroes_universes.universe_id
			WHERE universes.name = 'DC Comics'`);

		res.status(200).json(hDC.rows);
	} else if (req.query.Marvel) {
		const hM = await db.query(`SELECT heroes.name AS h, universes.name AS u
			FROM heroes
			INNER JOIN heroes_universes
			ON heroes.id = heroes_universes.hero_id
			INNER JOIN universes
			ON universes.id = heroes_universes.universe_id
			WHERE universes.name = 'Marvel Comics'`);

		res.status(200).json(hM.rows);
	}

	const h = await db.query('SELECT * FROM heroes');

	res.json(h.rows);
});

app.get('/heroes/hero/:id', async (req, res) => {
	try {
		const { id } = req.params;
		const hero = await db.query(`SELECT * FROM heroes WHERE id = $1`, [id]);

		res.status(200).json(hero.rows);
	} catch (err) {
		res.status(500).json({ error: err });
	}
});

app.get('/abilities', async (req, res) => {
	const a = await db.query('SELECT * FROM abilities');

	res.json(a.rows);
});

//

app.post('/heroes', async (req, res) => {
	try {
		const { name, image, creators, aliases, partnerships } = req.body;
		const formData = await db.query(
			`INSERT INTO heroes (name, image, creators, aliases, partnerships) VALUES ($1, $2, $3, $4, $5)`,
			[name, image, creators, aliases, partnerships]
			// `INSERT INTO heroes_universes (hero_id, universe_id)
			// SELECT heroes.id, universes.id
			// INNER JOIN universes
			// ON universes.id = heroes_universes.universe_id
			// WHERE universes.name = ($1)`,
			// [u]
		);
		res.status(201).json('New post created');
	} catch (err) {
		res.status(500).json({ error: err });
	}
});

//

app.listen('8080', () => console.log('App running on port 8080'));
