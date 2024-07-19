import { useState, useEffect, useCallback } from "react";
import TodoInput from "./components/TodoInput/TodoInput";
import TodoList from "./components/TodoList/TodoList";
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [editMode, setEditMode] = useState(false);

  const saveTasks = (currentTasks) => {
    localStorage.setItem('tasks', JSON.stringify({ tasks: currentTasks }));
  };

  useEffect(() => {
    if (localStorage) {
      let localTasks = localStorage.getItem('tasks');
      if (localTasks) {
        localTasks = JSON.parse(localTasks).tasks;
        setTasks(localTasks);
      }
    }
  }, []);

  const addTask = useCallback((newTask) => {
    setTasks((prevTasks) => {
      const updatedTasks = [...prevTasks, { text: newTask, done: false, id: new Date().getTime() }];
      saveTasks(updatedTasks);
      return updatedTasks;
    });
  }, []);

  const removeTask = useCallback((removeId) => {
    setTasks((prevTasks) => {
      const updatedTasks = prevTasks.filter(task => task.id !== removeId);
      saveTasks(updatedTasks);
      return updatedTasks;
    });
  }, []);

  const editTask = useCallback((editId, newText) => {
    setTasks((prevTasks) => {
      const updatedTasks = prevTasks.map(task =>
        task.id === editId ? { ...task, text: newText } : task
      );
      saveTasks(updatedTasks);
      return updatedTasks;
    });
  }, []);

  const toggleTask = useCallback((toggleId) => {
    setTasks((prevTasks) => {
      const updatedTasks = prevTasks.map(task =>
        task.id === toggleId ? { ...task, done: !task.done } : task
      );
      saveTasks(updatedTasks);
      return updatedTasks;
    });
  }, []);

  return (
    <main>
      <div className={"editBG" + (editMode ? " active" : "")}></div>
      <TodoInput addTask={addTask} />
      <TodoList
        tasks={tasks}
        removeTask={removeTask}
        editTask={editTask}
        toggleTask={toggleTask}
        changeEditMode={setEditMode}
      />
    </main>
  );
}

export default App;
