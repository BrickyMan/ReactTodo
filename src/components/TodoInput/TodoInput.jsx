import { useState, memo } from "react"
import cl from './TodoInput.module.css'


const TodoInput = memo(({addTask}) => {
    const randInt = (min = 0, max) => {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    const placeholders = ['Напр.: анжуманя', 'Напр.: пресс качат', 'Напр.: бегит', 'Напр.: турник'];
    const [placeholder, setPlaceholder] = useState(placeholders[randInt(0, 2)]);
    const [newTask, setNewTask] = useState('');

    const handleEnter = (event) => {
        if (event.key === 'Enter') {
            onAddTask();
        }
    }

    const onAddTask = () => {
        addTask(newTask);
        setNewTask('');
        setPlaceholder(placeholders[randInt(0, 3)]);
    }

    return (
        <div className={cl.inputWrapper}>
            <input
            type="text"
            placeholder={placeholder}
            value={newTask}
            onChange={event => setNewTask(event.target.value)}
            onKeyUp={handleEnter}
        />
            <button onClick={onAddTask}>Добавить</button>
        </div>
    )
});

export default TodoInput;