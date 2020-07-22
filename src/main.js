const express = require('express');
const pg = require('pg');

const connectionOptions = {
  user: 'postgres',
  host: 'postgres',
  database: 'postgres',
  password: 'mysecretpassword',
  port: 5432,
};

const pgClient = new pg.Client(connectionOptions);

const app = express();

app.use((req, res, next) => {
  req.connection = pgClient;
  next();
});

app.get('/', async (req, res) => {
  const now = new Date();

  await req.connection.query(
    'INSERT INTO count VALUES(DEFAULT, to_timestamp($1))',
    [now.getTime() / 1000]
  );

  res.json({
		success: true,
    timestamp: now,
	});
});

app.listen(3000, async () => {

  await pgClient.connect();

  console.log('Listening');
})
