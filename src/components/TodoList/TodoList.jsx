import React, { memo } from 'react';
import Card from '../Card/Card';
import cl from './TodoList.module.css';

const TodoList = memo(({tasks, removeTask, editTask, toggleTask, changeEditMode}) => {

  return (
    <ul className={cl.todoList}>
      {tasks.map(task => {
        return (
          <Card
            key={task.id}
            taskIndex={task.id}
            removeTask={removeTask}
            editTask={editTask}
            toggleTask={toggleTask}
            isDone={task.done}
            changeEditMode={changeEditMode}
          >{task.text}</Card>
        )
      })}
    </ul>
  )
});

export default TodoList;