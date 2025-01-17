// src/components/TodoList.tsx
import React, { useEffect, useState } from "react";
import { getTodos, createTodo, deleteTodo } from "../api/todoApi"; // 导入 API 方法

const TodoList = () => {
  const [todos, setTodos] = useState<{ id: number; task: string }[]>([]);
  const [newTask, setNewTask] = useState("");

  // 获取待办事项
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const todosData = await getTodos(); // 调用 API 获取数据
        setTodos(todosData);
      } catch (error) {
        console.error("Failed to fetch todos:", error);
      }
    };

    fetchTodos();
  }, []);

  // 添加新任务
  const handleAddTask = async () => {
    if (!newTask.trim()) return;
    try {
      const newTodo = await createTodo(newTask); // 调用 API 创建任务
      setTodos([...todos, newTodo]); // 更新状态
      setNewTask("");
    } catch (error) {
      console.error("Failed to add todo:", error);
    }
  };

  // 删除任务
  const handleDeleteTask = async (id: number) => {
    try {
      await deleteTodo(id); // 调用 API 删除任务
      setTodos(todos.filter((todo) => todo.id !== id)); // 更新状态
    } catch (error) {
      console.error("Failed to delete todo:", error);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-4">
      <h1 className="text-3xl font-bold mb-6">Todo List</h1>

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
            className="flex justify-between items-center p-2 border-b"
          >
            <span>{todo.task}</span>
            <button
              onClick={() => handleDeleteTask(todo.id)}
              className="text-red-500"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
