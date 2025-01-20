// src/components/TodoList.tsx
import { useEffect, useState } from 'react'
import {
  getTodos,
  createTodo,
  deleteTodo,
  updateTodo,
  completeTodo,
} from '../api/todoApi' // 导入 API 方法

const TodoList = () => {
  const [todos, setTodos] = useState<
    { id: number; task: string; completed: number }[]
  >([])
  const [newTask, setNewTask] = useState('')

  // 获取待办事项
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const todosData = await getTodos() // 调用 API 获取数据
        setTodos(todosData)
      } catch (error) {
        console.error('Failed to fetch todos:', error)
      }
    }

    fetchTodos()
  }, [])

  // 添加新任务
  const handleAddTask = async () => {
    if (!newTask.trim()) return
    try {
      const newTodo = await createTodo(newTask) // 调用 API 创建任务
      setTodos([...todos, newTodo]) // 更新状态
      setNewTask('')
    } catch (error) {
      console.error('Failed to add todo:', error)
    }
  }

  // 删除任务
  const handleDeleteTask = async (id: number) => {
    try {
      await deleteTodo(id) // 调用 API 删除任务
      setTodos(todos.filter((todo) => todo.id !== id)) // 更新状态
    } catch (error) {
      console.error('Failed to delete todo:', error)
    }
  }

  // 编辑任务
  const handleEditTask = async (id: number) => {
    const newTask = prompt('Edit task') // 使用 prompt 弹窗输入新任务
    if (!newTask) return
    try {
      await updateTodo(id, newTask) // 调用 API 更新任务
      getTodos().then((todosData) => setTodos(todosData)) // 重新获取待办事项
    } catch (error) {
      console.error('Failed to edit todo:', error)
    }
  }

  // 完成任务
  const handleCompleteTask = async (id: number) => {
    try {
      await completeTodo(id, 1) // 调用 API 更新任务
      getTodos().then((todosData) => setTodos(todosData)) // 重新获取待办事项
    } catch (error) {
      console.error('Failed to complete todo:', error)
    }
  }

  // 取消完成任务
  const handleUnmarkTask = async (id: number) => {
    try {
      await completeTodo(id, 0) // 调用 API 更新任务
      getTodos().then((todosData) => setTodos(todosData)) // 重新获取待办事项
    } catch (error) {
      console.error('Failed to unmark todo:', error)
    }
  }

  return (
    <div className="max-w-xl bg-white mx-auto p-4">
      <h1 className="text-3xl text-blue-500 font-bold mb-6">Todo List</h1>

      {/* 输入框和添加按钮 */}
      <div className="flex mb-4">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          className="border p-2 mr-2 w-full"
          placeholder="Add a new task"
        />
        <button onClick={handleAddTask} className="bg-blue-500 text-white p-2">
          Add
        </button>
      </div>

      {/* 待办事项列表 */}
      <ul className="space-y-2">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className={`flex justify-between items-center p-2 border-b ${todo.completed ? 'bg-gray-200' : ''}`}
          >
            <span className={`text-lg ${todo.completed ? 'line-through' : ''}`}>
              {todo.task}
            </span>
            <div>
              <button
                onClick={() => handleCompleteTask(todo.id)}
                className={`text-green-500 mr-2 ${todo.completed ? 'hidden' : ''}`}
              >
                Complete
              </button>
              <button
                onClick={() => handleUnmarkTask(todo.id)}
                className={`text-gray-500 mr-2 ${!todo.completed ? 'hidden' : ''}`}
              >
                Unmark
              </button>
              <button
                onClick={() => handleEditTask(todo.id)}
                className={`text-yellow-500 mr-2 ${todo.completed ? 'hidden' : ''}`}
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteTask(todo.id)}
                className="text-red-500"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default TodoList
