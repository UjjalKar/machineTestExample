import React, { useState, useEffect } from "react";
import { v4 } from "uuid";
import "./App.css";
import {
  updateTodos,
  updateUsers,
  loginUser,
  setToken,
  getToken,
  findUser,
} from "./users";

function App() {
  const [todoTxt, setTodoTxt] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [loggedInUser, setLoggedInUser] = useState({});
  const [messages, setMessages] = useState("");

  const [isLogin, setIsLogin] = useState(false);
  const [todos, setTodos] = useState([]);

  // const [state, dispatch] = useReducer(reducer, initialState)
  const _handleOnchange = (e) => {
    let val = e.target.value;
    setTodoTxt(val);
  };
  const _deleteTodo = (id) => {
    console.log(id);

    let newTodos = todos.filter((v) => v.id !== id);
    // console.log(todos);
    setTodos(newTodos);
    window.localStorage.setItem("@todo_app_todos", JSON.stringify(newTodos));
  };

  const _handleLogin = () => {
    if (loginUser(email, pass)) {
      setToken(email);
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  };
  useEffect(() => {
    const existTodo = window.localStorage.getItem("@todo_app_todos");
    console.log(getToken());
    const user = JSON.parse(getToken());
    if (existTodo) {
      setTodos(JSON.parse(existTodo));
    }
    if (user) {
      setIsLogin(true);

      console.log(user);
      setLoggedInUser(user);
    }
  }, [isLogin]);

  const _handleSignUp = () => {
    let user = {
      email,
      pass,
    };
    if (findUser(email)) {
      setMessages("login now! Account already there ");
    } else {
      setMessages("login now! Account created! ");
      updateUsers(user);
    }
  };
  const _handleLogout = () => {
    window.localStorage.removeItem("@todo_app_user");
    setIsLogin(false);
  };
  const _addNewTodo = () => {
    console.log(loggedInUser);
    if (todoTxt !== "") {
      let newTodo = {
        id: v4(),
        text: todoTxt,
        isDone: false,
        user: loggedInUser.email,
      };

      setTodos([...todos, newTodo]);
      console.log(todos);
      setTodoTxt("");
      updateTodos(newTodo);
    }
  };
  if (!isLogin) {
    return (
      <div className="login">
        <h1>Login</h1>
        <p>{messages}</p>
        <p>
          <input
            type="email"
            value={email}
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </p>
        <p>
          <input
            placeholder="password"
            type="password"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
          />
        </p>

        <button onClick={_handleLogin}>Login</button>
        <button onClick={_handleSignUp}>SignUp</button>
      </div>
    );
  }
  return (
    <div className="App">
      <button onClick={_handleLogout}> Logout</button>
      <p>{loggedInUser.email}</p>
      <div className="main">
        <h1>Add Todo</h1>
        <input
          placeholder="add new todo"
          type="text"
          value={todoTxt}
          onChange={_handleOnchange}
        />
        <button onClick={_addNewTodo}>+</button>
        <hr />
        <h2>My todos</h2>
        <ul>
          {todos.map((todo, i) => (
            <li key={i}>
              {i} &bull;
              {todo.text} by &bull; {todo.user}
              {todo.user === loggedInUser.email ? (
                <button onClick={() => _deleteTodo(todo.id)}>X</button>
              ) : null}
            </li>
          ))}
        </ul>
        <hr />
      </div>
    </div>
  );
}

export default App;
