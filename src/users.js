const findUser = (email) => {
  let users = window.localStorage.getItem("@todo_app_users")
    ? JSON.parse(window.localStorage.getItem("@todo_app_users"))
    : [];
  let u =
    users.length !== 0 && users.length !== null
      ? users.find((u) => u.email === email)
      : null;
  if (u) return true;
  else return false;
};

const updateUsers = (user) => {
  let users = window.localStorage.getItem("@todo_app_users")
    ? JSON.parse(window.localStorage.getItem("@todo_app_users"))
    : [];
  users.push(user);
  window.localStorage.setItem("@todo_app_users", JSON.stringify(users));
};

const loginUser = (email, pass) => {
  if (findUser(email)) {
    const users = JSON.parse(window.localStorage.getItem("@todo_app_users"));
    let u = users.find((u) => u.email === email && u.pass === pass);
    console.log(u);
    if (u) return true;
    else return false;
  }
};
const setToken = (email) => {
  let e = JSON.stringify({ email });
  window.localStorage.setItem("@todo_app_user", e);
};
const getToken = () => window.localStorage.getItem("@todo_app_user");

const getTodos = () => {
  const t = window.localStorage.getItem("@todo_app_todos");
  return JSON.parse(t);
};

const updateTodos = (n) => {
  let todos = getTodos() ? getTodos() : [];
  todos.push(n);
  window.localStorage.setItem("@todo_app_todos", JSON.stringify(todos));
};

export {
  findUser,
  updateUsers,
  loginUser,
  setToken,
  getToken,
  getTodos,
  updateTodos,
};
