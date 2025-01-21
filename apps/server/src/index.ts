import express from 'express'
import cors from 'cors'
import pool from './db'
import dotenv from 'dotenv'
import { ResultSetHeader } from 'mysql2'
dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

app.get('/api/todos', async (req, res) => {
  const [rows] = await pool.query('SELECT * FROM todos')
  res.json(rows)
})

app.post('/api/todos', async (req, res) => {
  const { task } = req.body

  const [result] = await pool.query<ResultSetHeader>(
    'INSERT INTO todos (task) VALUES (?)',
    [task],
  )

  res.json({ id: result.insertId, task })
})

app.delete('/api/todos/:id', async (req, res) => {
  const { id } = req.params
  await pool.query('DELETE FROM todos WHERE id = ?', [id])
  res.sendStatus(204)
})

app.put('/api/todos/:id', async (req, res) => {
  const { id } = req.params
  const { task } = req.body
  await pool.query('UPDATE todos SET task = ? WHERE id = ?', [task, id])
  res.sendStatus(204)
})

app.post('/api/todos/:id/complete', async (req, res) => {
  const { id } = req.params
  const { completed } = req.body
  await pool.query('UPDATE todos SET completed = ? WHERE id = ?', [
    completed,
    id,
  ])
  res.sendStatus(204)
})

app.listen(4000, () => {
  console.log('Server running on http://localhost:4000')
})
