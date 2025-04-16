
// import express from 'express';
// import jwt from 'jsonwebtoken';
// import bodyParser from 'body-parser';

// const app = express();
// app.use(bodyParser.json());

// const PORT = 3000;
// const SECRET_KEY = 'mysecret123';

// // 🔐 Dummy user
// const fakeUser = {
//   username: 'john',
//   password: '1234'
// };

// // 🟢 Step 1: Login and get token
// app.post('/login', (req, res) => {
//   const { username, password } = req.body;

//   if (username === fakeUser.username && password === fakeUser.password) {
//     const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
//     res.json({ token });
//   } else {
//     res.status(401).json({ message: 'Invalid username or password' });
//   }
// });

// // 🔒 Step 2: Protected route
// app.get('/profile', (req, res) => {
//   const token = req.headers['authorization'];

//   if (!token) {
//     return res.status(403).json({ message: 'Token required' });
//   }

//   jwt.verify(token, SECRET_KEY, (err, decoded) => {
//     if (err) {
//       return res.status(403).json({ message: 'Invalid or expired token' });
//     }

//     res.json({ message: `Welcome, ${decoded.username}! This is your profile.` });
//   });
// });

// // ▶️ Start the server
// app.listen(PORT, () => {
//   console.log(`Server running at http://localhost:${PORT}`);
// });



import express from 'express';
import jwt from 'jsonwebtoken';
import bodyParser from 'body-parser';
import path from 'path';
import { fileURLToPath } from 'url';

// 🔧 Fix for __dirname in ES6 modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

const PORT = 3000;
const SECRET_KEY = 'mysecret123';

// 🧑 Dummy user
const fakeUser = {
  username: 'john',
  password: '1234'
};

// 🔐 Login route
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (username === fakeUser.username && password === fakeUser.password) {
    const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ token });
  } else {
    res.status(401).json({ message: 'Invalid username or password' });
  }
});

// 🔒 Protected route
app.get('/profile', (req, res) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(403).json({ message: 'Token required' });
  }

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid or expired token' });
    }

    res.json({ message: `Welcome, ${decoded.username}! This is your profile.` });
  });
});

// ▶️ Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
