import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'http://localhost:4000/api', // 后端地址
})

export const getTodos = async () => {
  const response = await apiClient.get('/todos')
  return response.data
}

export const createTodo = async (task: string) => {
  const response = await apiClient.post('/todos', { task })
  return response.data
}

export const deleteTodo = async (id: number) => {
  const response = await apiClient.delete(`/todos/${id}`)
  return response.data
}

export const updateTodo = async (id: number, task: string) => {
  const response = await apiClient.put(`/todos/${id}`, { task })
  return response.data
}

export const completeTodo = async (id: number, completed: number) => {
  const response = await apiClient.post(`/todos/${id}/complete`, { completed })
  return response.data
}
