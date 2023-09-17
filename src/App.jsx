import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './styles.css';

export default function App() {
  const [todos, setTodos] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);

  const [editingIndex, setEditingIndex] = useState(null);
  const [editedDate, setEditedDate] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();
    if (!newTodo || !selectedDate) return;
    setTodos([...todos, { text: newTodo, completed: false, date: selectedDate }]);
    setNewTodo("");
    setSelectedDate(null);
  }

  function deleteTodo(index, isCompleted) {
    const updatedTodos = isCompleted ? [...completed] : [...todos];
    updatedTodos.splice(index, 1);
    isCompleted ? setCompleted(updatedTodos) : setTodos(updatedTodos);
  }

  function completeTodo(index) {
    const todoToComplete = todos[index];
    const updatedTodos = [...todos];
    updatedTodos.splice(index, 1);
    setTodos(updatedTodos);

    setCompleted([...completed, todoToComplete]);
  }

  function undoComplete(index) {
    const todoToUndoComplete = completed[index];
    const updatedCompleted = [...completed];
    updatedCompleted.splice(index, 1);
    setCompleted(updatedCompleted);

    setTodos([...todos, todoToUndoComplete]);
  }

  function handleEditDate(index) {
    setEditingIndex(index);
    setEditedDate(todos[index].date);
  }

  function handleSaveDate(index) {
    const updatedTodos = [...todos];
    updatedTodos[index].date = editedDate;
    setTodos(updatedTodos);
    setEditingIndex(null);
    setEditedDate(null);
  }

  return (
    <>
      <form className='new-item-form' onSubmit={handleSubmit}>
        <input
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          type='text'
        />
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          placeholderText="Select a date"
        />
        <button type="submit">Add Todo</button>
      </form>

      <h1>Incomplete Todos</h1>
      <ul className='list'>
        {todos.map((todo, index) => (
          <li key={index} className='list-item'>
            <div>
              {editingIndex === index ? (
                <DatePicker
                  selected={editedDate}
                  onChange={(date) => setEditedDate(date)}
                  placeholderText="Select a date"
                />
              ) : (
                <>{todo.text}</>
              )}
            </div>
            <div>
              {todo.date && (
                <span className="todo-date">
                  {todo.date.toDateString()}
                </span>
              )}
            </div>
            <div className='button-group'>
              {editingIndex === index ? (
                <button onClick={() => handleSaveDate(index)}>Save Date</button>
              ) : (
                <>
                  <button onClick={() => handleEditDate(index)}>Edit Date</button>
                  <button onClick={() => deleteTodo(index, false)}>Delete</button>
                  <button onClick={() => completeTodo(index)} className="complete">
                    Complete
                  </button>
                </>
              )}
            </div>
          </li>
        ))}
      </ul>

      <h1>Completed Todos</h1>
      <ul className='list'>
        {completed.map((todo, index) => (
          <li key={index} className='list-item'>
            <div>
              {todo.text}
            </div>
            <div>
              {todo.date && (
                <span className="todo-date">
                  {todo.date.toDateString()}
                </span>
              )}
            </div>
            <div className='button-group'>
              <button onClick={() => deleteTodo(index, true)}>Delete</button>
              <button onClick={() => undoComplete(index)}>Not done yet</button>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
