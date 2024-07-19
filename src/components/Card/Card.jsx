import { useState, useRef, useEffect, memo } from 'react';
import cl from './Card.module.css';

const Card = memo( ({children, taskIndex, removeTask, editTask, toggleTask, isDone, changeEditMode}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [taskText, setTaskText] = useState(children);
  const inputRef = useRef(null);

  const saveEditingTask = () => {
    editTask(taskIndex, taskText);
    setIsEditing(false);
    changeEditMode(false);
  }

  const cancelEditingTask = () => {
    setTaskText(children);
    setIsEditing(false);
    changeEditMode(false);
  }

  const handleTaskEdit = () => {
    setIsEditing(true);
    changeEditMode(true);
    editTask(taskIndex, taskText);
  }

  useEffect(() => {
    if (isEditing) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleTaskEditInput = (event) => {
    if (event.key === 'Enter') {
      saveEditingTask();
    }
    else if (event.key === 'Escape') {
      cancelEditingTask();
    }
  }

  return (
    <li className={cl.card + (isDone ? ` ${cl.done}` : "") + (isEditing ? ` ${cl.inEdit}` : "")}>
      {isEditing &&
        <div className={cl.editControls}>
          <button
            className={cl.cardEditSave}
            onClick={saveEditingTask}
          >
            <i className="fa-solid fa-check"></i>
          </button>
          <button
            className={cl.cardEditCancel}
            onClick={cancelEditingTask}
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>
      }
      <div className={cl.cardMain}>
        <button onClick={() => toggleTask(taskIndex)} disabled={isEditing}>
          <i className={(isDone ? "fa-solid" : "fa-regular") + " fa-square-check"}></i>
        </button>
        
        {isEditing
        ?
          <input
            type="text"
            value={taskText}
            onChange={e => setTaskText(e.target.value)}
            onKeyUp={handleTaskEditInput}
            ref={inputRef}
          />
        :
          <p>{children}</p>
        }
      </div>
      <div className={cl.cardActions}>
        <button
          className={cl.cardEdit}
          onClick={handleTaskEdit}
          disabled={isEditing}
        >
          <i className="fa-regular fa-pen-to-square"></i>
        </button>
        <button
          className={cl.cardRemove}
          onClick={() => removeTask(taskIndex)}
          disabled={isEditing}
        >
          <i className="fa-regular fa-trash-can"></i>
        </button>
      </div>
    </li>
  )
});

export default Card;