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
	} catch (e) {
		res.status(500).json({ error: e });
	}
});

app.get('/abilities', async (req, res) => {
	const a = await db.query('SELECT * FROM abilities');

	res.json(a.rows);
});

//

app.listen('8080', () => console.log('App running on port 8080'));
