const dotenv = require('dotenv'),
  { Client } = require('pg')

  dotenv.config()

const express = require('express'),
  path = require('path')

  const client = new Client({
    connectionString: process.env.PGURI
  })

  client.connect()

const app = express()

app.get('/api', async (_request, response) => {
  const { rows } = await client.query(
    'SELECT * FROM name WHERE name = $1',
    ['Aatrox']
  )

  response.send(rows)
})

app.use(express.static(path.join(path.resolve(), 'dist')))

app.listen(3000, () => {
  console.log('Redo på http://localhost:3000/')
})
