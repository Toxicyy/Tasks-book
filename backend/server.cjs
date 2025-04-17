const express = require("express");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = 5000;
const DB_PATH = "./db.json";
const SECRET_KEY = "secret_key";

app.use(cors());
app.use(bodyParser.json());

const readDatabase = () => {
  const data = fs.readFileSync(DB_PATH, "utf-8");
  return JSON.parse(data);
};

const writeDatabase = (data) => {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), "utf-8");
};

app.post("/register", (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: "Все поля обязательны" });
  }

  const db = readDatabase();

  const usernameTaken = db.users.some((user) => user.username === username);
  const emailTaken = db.users.some((user) => user.email === email);

  if (usernameTaken) {
    return res.status(400).json({ message: "Имя пользователя уже занято" });
  }

  if (emailTaken) {
    return res.status(400).json({ message: "Email уже используется" });
  }

  const hashedPassword = bcrypt.hashSync(password, 10);

  const newUser = {
    id: Date.now(),
    username,
    email,
    password: hashedPassword,
    avatarSrc: "",
    status: "USER",
    data: {
      statistics: {
        tasks: 0,
        completed: 0,
        deleted: 0,
        edited: 0,
      },
      todos: [],
      categories: [],
      media: {
        facebook: "",
        twitter: "",
        instagram: "",
        linkedIn: "",
      },
    },
  };

  db.users.push(newUser);
  writeDatabase(db);

  return res.status(201).json({ message: "Регистрация успешна" });
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Все поля обязательны" });
  }

  const db = readDatabase();

  const user = db.users.find((user) => user.email === email);

  if (!user) {
    return res.status(404).json({ message: "Пользователь не найден" });
  }

  const isPasswordValid = bcrypt.compareSync(password, user.password);

  if (!isPasswordValid) {
    return res.status(401).json({ message: "Неверный пароль" });
  }

  const token = jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, {
    expiresIn: "1h",
  });

  return res.status(200).json({ message: "Успешный вход", token });
});

app.delete("/api/delete/user", (req, res) => {
  const { authorization } = req.headers;
  const token = authorization?.split("Bearer ")[1];

  if (!token) {
    return res.status(401).json({ message: "Токен не предоставлен" });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    const db = readDatabase();

    const user = db.users.find((user) => user.id === decoded.id);

    if (!user) {
      return res.status(404).json({ message: "Пользователь не найден" });
    }

    db.users = db.users.filter((user) => user.id !== decoded.id);
    writeDatabase(db);

    return res.status(200).json({ message: "Пользователь успешно удален" });
  } catch (error) {
    return res.status(401).json({ message: "Неверный или истекший токен" });
  }
});

app.put("/api/update/user", (req, res) => {
  const { authorization } = req.headers;
  const token = authorization?.split("Bearer ")[1];

  if (!token) {
    return res.status(401).json({ message: "Токен не предоставлен" });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    const { username, email, avatarSrc } = req.body;
    const db = readDatabase();

    const user = db.users.find((user) => user.id === decoded.id);

    if (!user) {
      return res.status(404).json({ message: "Пользователь не найден" });
    }

    user.username = username;
    user.email = email;
    user.avatarSrc = avatarSrc;

    writeDatabase(db);

    return res.status(200).json({ message: "Пользователь успешно обновлен" });
  } catch (error) {
    return res.status(401).json({ message: "Неверный или истекший токен" });
  }
});

app.get("/api/get/user", (req, res) => {
  const { authorization } = req.headers;
  const token = authorization?.split("Bearer ")[1];

  if (!token) {
    return res.status(401).json({ message: "Токен не предоставлен" });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    const db = readDatabase();

    const user = db.users.find((user) => user.id === decoded.id);

    if (!user) {
      return res.status(404).json({ message: "Пользователь не найден" });
    }

    return res.status(200).json({ user });
  } catch (error) {
    return res.status(401).json({ message: "Неверный или истекший токен" });
  }
});

app.get("/api/checkToken", (req, res) => {
  const { authorization } = req.headers;
  const token = authorization?.split("Bearer ")[1];

  if (!token) {
    return res.status(401).json({ message: "Токен не предоставлен" });
  }

  try {
    jwt.verify(token, SECRET_KEY);
    return res
      .status(200)
      .json({ message: "Токен валиден", isTokenValid: true });
  } catch (error) {
    return res
      .status(401)
      .json({ message: "Неверный или истекший токен", isTokenValid: false });
  }
});

app.put("/api/changePassword", (req, res) => {
  const { authorization } = req.headers;
  const token = authorization?.split("Bearer ")[1];

  if (!token) {
    return res.status(401).json({ message: "Токен не предоставлен" });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    const { password } = req.body;
    const db = readDatabase();

    const user = db.users.find((user) => user.id === decoded.id);

    if (!user) {
      return res.status(404).json({ message: "Пользователь не найден" });
    }
    const hashedPassword = bcrypt.hashSync(password, 10);
    user.password = hashedPassword;

    writeDatabase(db);

    return res.status(200).json({ message: "Пароль успешно изменен" });
  } catch (error) {
    return res.status(401).json({ message: "Неверный или истекший токен" });
  }
});

app.post("/api/user/checkPassword", (req, res) => {
  const { authorization } = req.headers;
  const token = authorization?.split("Bearer ")[1];

  if (!token) {
    return res.status(401).json({ message: "Токен не предоставлен" });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    const { password } = req.body;
    const db = readDatabase();

    const user = db.users.find((user) => user.id === decoded.id);

    if (!user) {
      return res.status(404).json({ message: "Пользователь не найден" });
    }
    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (isPasswordValid) {
      return res.status(200).json({ message: "Пароль верен" });
    } else {  
      return res.status(401).json({ message: "Неверный пароль" });
    }
  } catch (error) {
    return res.status(401).json({ message: "Неверный или истекший токен" });
  }
  }
);

app.get("/user/username/:username", (req, res) => {
  const { username } = req.params;
  const db = readDatabase();

  const user = db.users.find((user) => user.username === username);

  if (!user) {
    return res.status(404).json({ message: "Пользователь не найден" });
  }

  return res.status(200).json({ user });
});

app.get("/user/email/:email", (req, res) => {
  const { email } = req.params;
  const db = readDatabase();

  const user = db.users.find((user) => user.email === email);

  if (!user) {
    return res.status(404).json({ message: "Пользователь не найден" });
  }

  return res.status(200).json({ user });
});

app.get("/todos", (req, res) => {
  const { authorization } = req.headers;
  const token = authorization?.split("Bearer ")[1];

  if (!token) {
    return res.status(401).json({ message: "Токен не предоставлен" });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    const db = readDatabase();

    const user = db.users.find((user) => user.id === decoded.id);

    if (!user) {
      return res.status(404).json({ message: "Пользователь не найден" });
    }

    return res.status(200).json({ todos: user.data.todos });
  } catch (error) {
    return res.status(401).json({ message: "Неверный или истекший токен" });
  }
});

app.post("/todos", (req, res) => {
  const { authorization } = req.headers;
  const token = authorization?.split("Bearer ")[1];
  const { title, completed, category } = req.body;

  if (!token) {
    return res.status(401).json({ message: "Токен не предоставлен" });
  }

  if (!title || !category) {
    return res
      .status(400)
      .json({ message: "Название и категория задачи обязательны" });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    const db = readDatabase();

    const user = db.users.find((user) => user.id === decoded.id);

    if (!user) {
      return res.status(404).json({ message: "Пользователь не найден" });
    }

    const newTodo = {
      id: Date.now(),
      title,
      completed: Boolean(completed),
      category,
    };

    user.data.todos.push(newTodo);

    writeDatabase(db);

    return res.status(201).json({
      message: "Задача успешно создана",
      todo: newTodo,
    });
  } catch (error) {
    console.error("Ошибка при создании задачи:", error);
    return res.status(401).json({ message: "Неверный или истекший токен" });
  }
});

app.put("/todos/:todoId", (req, res) => {
  const { authorization } = req.headers;
  const token = authorization?.split("Bearer ")[1];
  const { todoId } = req.params;
  const { title, completed, category } = req.body;

  if (!token) {
    return res.status(401).json({ message: "Токен не предоставлен" });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    const db = readDatabase();

    const user = db.users.find((user) => user.id === decoded.id);

    if (!user) {
      return res.status(404).json({ message: "Пользователь не найден" });
    }

    const todo = user.data.todos.find((todo) => todo.id === Number(todoId));

    if (!todo) {
      return res.status(404).json({ message: "Задача не найдена" });
    }

    todo.title = title;
    todo.completed = Boolean(completed);
    todo.category = category;

    writeDatabase(db);

    return res.status(200).json({
      message: "Задача успешно обновлена",
      todo,
    });
  } catch (error) {
    return res.status(401).json({ message: "Неверный или истекший токен" });
  }
});

app.delete("/todos/:todoId", (req, res) => {
  const { authorization } = req.headers;
  const token = authorization?.split("Bearer ")[1];
  const { todoId } = req.params;

  if (!token) {
    return res.status(401).json({ message: "Токен не предоставлен" });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    const db = readDatabase();

    const user = db.users.find((user) => user.id === decoded.id);

    if (!user) {
      return res.status(404).json({ message: "Пользователь не найден" });
    }

    const todoIndex = user.data.todos.findIndex(
      (todo) => todo.id === Number(todoId)
    );

    if (todoIndex === -1) {
      return res.status(404).json({ message: "Задача не найдена" });
    }

    user.data.todos.splice(todoIndex, 1);

    writeDatabase(db);

    return res.status(200).json({ message: "Задача успешно удалена" });
  } catch (error) {
    return res.status(401).json({ message: "Неверный или истекший токен" });
  }
});

app.get("/statistic", (req, res) => {
  const { authorization } = req.headers;
  const token = authorization?.split("Bearer ")[1];

  if (!token) {
    return res.status(401).json({ message: "Токен не предоставлен" });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    const db = readDatabase();

    const user = db.users.find((user) => user.id === decoded.id);

    if (!user) {
      return res.status(404).json({ message: "Пользователь не найден" });
    }

    return res.status(200).json({ statistic: user.data.statistics });
  } catch (error) {
    return res.status(401).json({ message: "Неверный или истекший токен" });
  }
});

app.put("/statistic", (req, res) => {
  const { authorization } = req.headers;
  const token = authorization?.split("Bearer ")[1];
  const { statistic } = req.body;

  if (!token) {
    return res.status(401).json({ message: "Токен не предоставлен" });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    const db = readDatabase();

    const user = db.users.find((user) => user.id === decoded.id);

    if (!user) {
      return res.status(404).json({ message: "Пользователь не найден" });
    }

    user.data.statistics = statistic;

    writeDatabase(db);

    return res.status(200).json({ message: "Статистика успешно обновлена" });
  } catch (error) {
    return res.status(401).json({ message: "Неверный или истекший токен" });
  }
});

app.get("/category", (req, res) => {
  const { authorization } = req.headers;
  const token = authorization?.split("Bearer ")[1];

  if (!token) {
    return res.status(401).json({ message: "Токен не предоставлен" });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    const db = readDatabase();

    const user = db.users.find((user) => user.id === decoded.id);

    if (!user) {
      return res.status(404).json({ message: "Пользователь не найден" });
    }

    return res.status(200).json({ categories: user.data.categories });
  } catch (error) {
    return res.status(401).json({ message: "Неверный или истекший токен" });
  }
});

app.post("/category", (req, res) => {
  const { authorization } = req.headers;
  const token = authorization?.split("Bearer ")[1];
  const { category } = req.body;

  if (!token) {
    return res.status(401).json({ message: "Токен не предоставлен" });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    const db = readDatabase();

    const user = db.users.find((user) => user.id === decoded.id);

    if (!user) {
      return res.status(404).json({ message: "Пользователь не найден" });
    }

    const newCategory = {
      id: Date.now(),
      src: category.src,
      nightSrc: category.nightSrc,
      title: category.title,
      isActive: category.isActive,
      isInitial: category.isInitial,
    };

    user.data.categories.push(newCategory);

    writeDatabase(db);

    return res.status(200).json({ message: "Категория успешно добавлена" });
  } catch (error) {
    return res.status(401).json({ message: "Неверный или истекший токен" });
  }
});

app.post("/category/initial", (req, res) => {
  const { authorization } = req.headers;
  const token = authorization?.split("Bearer ")[1];
  const categories = req.body;

  if (!token) {
    return res.status(401).json({ message: "Токен не предоставлен" });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    const db = readDatabase();

    const user = db.users.find((user) => user.id === decoded.id);

    if (!user) {
      return res.status(404).json({ message: "Пользователь не найден" });
    }

    user.data = { ...user.data, categories };

    writeDatabase(db);

    return res.status(200).json({ message: "Категория успешно добавлена" });
  } catch (error) {
    return res.status(401).json({ message: "Неверный или истекший токен" });
  }
});

app.put("/category", (req, res) => {
  const { authorization } = req.headers;
  const token = authorization?.split("Bearer ")[1];
  const category = req.body;
  const { id } = req.body;

  if (!token) {
    return res.status(401).json({ message: "Токен не предоставлен" });
  }
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    const db = readDatabase();

    const user = db.users.find((user) => user.id === decoded.id);

    if (!user) {
      return res.status(404).json({ message: "Пользователь не найден" });
    }
    const index = user.data.categories.findIndex((cat) => cat.id === id);
    if (index !== -1) {
      user.data.categories[index] = category;
    } else {
      user.data.categories.push(category);
    }

    writeDatabase(db);

    return res.status(200).json({ message: "Категория успешно обновлена" });
  } catch (error) {
    return res.status(401).json({ message: "Неверный или истекший токен" });
  }
});

app.put("/category/makeActive", (req, res) => {
  const { authorization } = req.headers;
  const token = authorization?.split("Bearer ")[1];
  const { id } = req.body;

  if (!token) {
    return res.status(401).json({ message: "Токен не предоставлен" });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    const db = readDatabase();

    const user = db.users.find((user) => user.id === decoded.id);

    if (!user) {
      return res.status(404).json({ message: "Пользователь не найден" });
    }

    user.data.categories.forEach((category) => {
      category.isActive = false;
    });

    const category = user.data.categories.find(
      (category) => category.id === id
    );
    if (category) {
      category.isActive = true;
    }

    writeDatabase(db);

    return res.status(200).json({ message: "Категория успешно обновлена" });
  } catch (error) {
    return res.status(401).json({ message: "Неверный или истекший токен" });
  }
});

app.delete("/category", (req, res) => {
  const { authorization } = req.headers;
  const token = authorization?.split("Bearer ")[1];
  const { id } = req.body;

  if (!token) {
    return res.status(401).json({ message: "Токен не предоставлен" });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    const db = readDatabase();

    const user = db.users.find((user) => user.id === decoded.id);

    if (!user) {
      return res.status(404).json({ message: "Пользователь не найден" });
    }
    user.data.categories = user.data.categories.filter(
      (category) => category.id !== id
    );
    writeDatabase(db);

    return res.status(200).json({ message: "Категория успешно удалена" });
  } catch (error) {
    return res.status(401).json({ message: "Неверный или истекший токен" });
  }
});

app.get("/check-username/:username", (req, res) => {
  const { username } = req.params;
  const db = readDatabase();

  const usernameTaken = db.users.some((user) => user.username === username);

  return res.status(200).json({ usernameTaken });
});

app.get("/check-email/:email", (req, res) => {
  const { email } = req.params;
  const db = readDatabase();

  const emailTaken = db.users.some((user) => user.email === email);

  return res.status(200).json({ emailTaken });
});

app.get("/factOfTheDay", (req, res) => {
  try{
  const db = readDatabase();
  const factOfTheDay = db.FactOfTheDay;
  return res.status(200).json({ factOfTheDay });
  }
  catch(e){
    return res.status(500).json({ message: "Произошла ошибка на сервере" });
  }
})

app.put("/media", (req, res) => {
  const { authorization } = req.headers;  
  const token = authorization?.split("Bearer ")[1];
  const media = req.body;

  if (!token) {
    return res.status(401).json({ message: "Токен не предоставлен" });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    const db = readDatabase();

    const user = db.users.find((user) => user.id === decoded.id);

    if (!user) {
      return res.status(404).json({ message: "Пользователь не найден" });
    }

    user.data.media = media;

    writeDatabase(db);

    return res.status(200).json({ message: "Медиа успешно обновлено" });
  } catch (error) {
    return res.status(401).json({ message: "Неверный или истекший токен" });
  }
});

app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});
