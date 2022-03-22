import React, { useState } from 'react';
import AddTodos from './AddTodos';
import EditTodos from './EditTodos';
import api from "../api/todo";

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [date, setDate] = useState([]);
  


  const addTodo = async(todo) => {
    console.log(todo)
    if (!todo.text || /^\s*$/.test(todo.text)) {
      return;
    }
    else if (!todo.date|| /^\s*$/.test(todo.date)){
      return;
    }
    
    const newTodos = [todo,...todos];
    
    const response = await api.post("/todos", newTodos);
    console.log(response);


    setTodos(response.data);
    setDate(date);
  };


  const updateTodo = async(newValue) => {
    if (!newValue.text || /^\s*$/.test(newValue.text)) {
      return;
    }
    const response = await api.put(`/todos/${newValue.id}`, newValue);
    const {id} = response.data;
    setTodos(todos.map((newValue) => {
      return newValue.id === id ? {...response.data} : newValue;}
     ));
  };


  const removeTodo = async(id) => {
   
    const removedArr = todos.filter((todo) => {
      return  todo.id !== id;});
      setTodos(removedArr);
      await api.delete(`/todos/${id}`);
    
  };

  const completeTodo = id => {
    let updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        todo.isComplete = !todo.isComplete;
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  return (
    <div>
    <h1>Todo List App</h1>
      <AddTodos onSubmit={addTodo} />
      <EditTodos
        todos={todos}
        completeTodo={completeTodo}
        removeTodo={removeTodo}
        updateTodo={updateTodo}
      />
    </div>
  );
}

export default TodoList;