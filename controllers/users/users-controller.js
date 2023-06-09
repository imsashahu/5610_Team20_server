// import users from "./users.js";
import * as usersDao from "./users-dao.js";
import corsOptionDelegate from "../../cors.js";
import cors from "cors";

// let currentUser = null;

function UsersController(app) {
  const findAllUsers = async (req, res) => {
    const users = await usersDao.findAllUsers();
    res.send(users);
  };
  const findUserById = async (req, res) => {
    const id = req.params.id;
    console.log(id);
    // const user = users.find((user) => user.id === id);
    const user = await usersDao.findUserById(id);
    res.send(user);
  };
  const deleteUserById = async (req, res) => {
    const id = req.params.id;
    // const user = users.find((user) => user.id === id);
    // const index = users.indexOf(user);
    // users.splice(index, 1);
    const status = await usersDao.deleteUser(id);
    res.json(status);
  };
  const createUser = async (req, res) => {
    // const user = req.body;
    // users.push({ ...user, id: new Date().getTime() });
    const user = await usersDao.createUser(req.body);
    res.json(user);
  };
  const updateUser = async (req, res) => {
    const id = req.params.id;
    // const user = users.find((user) => user.id === id);
    // const index = users.indexOf(user);
    // users[index] = { ...user, ...req.body };
    const status = await usersDao.updateUser(id, req.body);
    res.json(status);
  };
  const login = async (req, res) => {
    const user = req.body;
    // const foundUser = users.find(
    //   (user) =>
    //     user.username === req.body.username &&
    //     user.password === req.body.password
    // );
    const foundUser = await usersDao.findUserByCredentials(
      req.body.username,
      req.body.password
    );
    if (foundUser) {
      // currentUser = foundUser;
      req.session["currentUser"] = foundUser;
      res.send(foundUser);
    } else {
      res.sendStatus(404);
    }
  };
  const logout = async (req, res) => {
    // currentUser = null;
    req.session.destroy();
    res.sendStatus(204);
  };
  const profile = async (req, res) => {
    const currentUser = req.session["currentUser"];
    if (currentUser) {
      res.send(currentUser);
    } else {
      res.sendStatus(404);
    }
  };
  const register = async (req, res) => {
    const user = req.body;
    // const foundUser = users.find((user) => user.username === req.body.username);
    const foundUser = await usersDao.findUserByUsername(req.body.username);
    if (foundUser) {
      res.sendStatus(409);
    } else {
      // const newUser = { ...user, id: new Date().getTime() };
      const newUser = await usersDao.createUser(user);
      // currentUser = newUser;
      // users.push(newUser);
      req.session["currentUser"] = newUser;
      res.json(newUser);
    }
  };

  app.post("/api/users/login", login);
  app.get("/api/users/id/:id", findUserById);
  app.post("/api/users/logout", logout);
  app.get("/api/users/profile", profile);
  app.get("/api/users/current", profile);
  app.post("/api/users/register", register);

  app.get("/api/users", findAllUsers);
  app.delete("/api/users/:id", deleteUserById);
  app.post("/api/users", createUser);
  app.put("/api/users/:id", updateUser);
}

export default UsersController;
