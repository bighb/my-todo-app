import React from "react";
import TodoList from "./components/TodoList";

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 pt-[40px]">
      <TodoList />
    </div>
  );
};

export default App;
