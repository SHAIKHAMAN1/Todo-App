import { useState } from 'react';
import Navbar from './components/Navbar';
import { v4 as uuidv4 } from 'uuid'; // Import uuidv4 to generate unique ids
import { MdDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { IoIosSave } from "react-icons/io";

function App() {
  const [todo, settodo] = useState(""); // For new todo input field
  const [todos, setTodos] = useState([]); // To store all todos
  const [isEditing, setIsEditing] = useState(null); // To track which todo is being edited
  const [editedTodo, setEditedTodo] = useState(""); // To track the edited value

  const handleEdit = (id) => {
    // Find the todo to be edited by id
    const todoToEdit = todos.find(todo => todo.id === id);
    setEditedTodo(todoToEdit.todo); // Set the edited todo value
    setIsEditing(id); // Mark this todo as being edited
  };

  const handleSaveEdit = () => {
    // Save the edited todo
    setTodos(todos.map(todo => 
      todo.id === isEditing ? { ...todo, todo: editedTodo } : todo
    ));
    setIsEditing(null); // Clear editing state
    setEditedTodo(""); // Clear edited value
  };

  const handleDelete = (id) => {
    // Delete the todo with the given id
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const handleAdd = () => {
    // Add a new todo with a unique id
    if (todo.trim() !== "") {
      setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
      settodo(""); // Reset the input field after adding a todo
    }
  };

  const handleCheckbox = (e) => {
    let id = e.target.id; // Use the checkbox 'id' to find the corresponding todo
    let index = todos.findIndex(item => item.id === id); // Find the todo by its unique id

    if (index !== -1) {
      // Create a new array to update the todo without mutating the original array
      let newTodos = [...todos];
      newTodos[index].isCompleted = e.target.checked; // Update the 'isCompleted' status
      setTodos(newTodos); // Set the new todos array in the state
    }
  };

  const handleChange = (e) => {
    settodo(e.target.value); // Update the 'todo' state with the input value
  };

  const handleEditedChange = (e) => {
    setEditedTodo(e.target.value); // Update the 'editedTodo' state when editing
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto bg-gradient-to-r from-purple-400 via-violet-500 to-indigo-600 rounded-xl my-5 p-10 min-h-[80vh] shadow-lg">
        {/* Container Title */}
        <h1 className="text-3xl font-bold text-center text-white mb-6">Your Todo List</h1>

        {/* Add Todo Section */}
        <div className="addTodo mb-6 flex justify-center items-center space-x-3">
          <input
            type="text"
            value={todo}
            onChange={handleChange}
            className="w-full sm:w-80 p-3 rounded-lg border-2 border-violet-300 focus:outline-none focus:ring-2 focus:ring-violet-500"
            placeholder="Enter your todo"
          />
          <button
            onClick={handleAdd}
            className="bg-violet-400 hover:bg-violet-500 text-white font-bold py-2 px-4 rounded-md transition-all duration-300 ease-in-out transform hover:scale-105">
            Add
          </button>
        </div>

        {/* Todo List Section */}
        <h2 className="text-xl font-semibold text-white mb-4">Tasks:</h2>
        <div className="todos space-y-4">
          {todos.map((todoItem) => (
            <div key={todoItem.id} className="todo w-full sm:w-2/4 py-3 px-4 flex justify-between items-center bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow">
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  onChange={handleCheckbox}
                  className="checkbox"
                  id={todoItem.id}
                  checked={todoItem.isCompleted}
                />
                <span
                  style={{
                    textDecoration: todoItem.isCompleted ? 'line-through' : 'none',
                    opacity: todoItem.isCompleted ? 0.6 : 1,
                  }}
                  className="text-lg font-medium text-gray-700">
                  {isEditing === todoItem.id ? (
                    <input
                      type="text"
                      value={editedTodo}
                      onChange={handleEditedChange}
                      className="w-2/3 p-2 rounded-lg border-2 border-violet-300 focus:outline-none focus:ring-2 focus:ring-violet-500"
                    />
                  ) : (
                    todoItem.todo
                  )}
                </span>
              </div>
              
              <div className="buttons flex space-x-2">
                {isEditing === todoItem.id ? (
                  <button
                    onClick={handleSaveEdit}
                    className="bg-violet-500 text-white p-2 rounded-md hover:bg-violet-600 transition-colors">
                    <IoIosSave className="text-xl" />
                  </button>
                ) : (
                  <button
                    onClick={() => handleEdit(todoItem.id)}
                    className="bg-violet-400 text-white p-2 rounded-md hover:bg-violet-500 transition-colors">
                    <FaRegEdit className="text-xl" />
                  </button>
                )}

                <button
                  onClick={() => handleDelete(todoItem.id)}
                  className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600 transition-colors">
                    <MdDelete className="text-xl" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
