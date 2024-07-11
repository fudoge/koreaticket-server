require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');

const authRouter = require("./routes/authRoutes");

const port = process.env.PORT;
const app = express();

//const authenticateJWT = require('./middlewares/authmiddleware');

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use('/auth', authRouter);

app.get('/', (req, res) => {
    res.send("hello");
});

// app.get('/protected', authenticateJWT, (req, res) => {
//     res.json({ message: "Login Success!" });
// });

app.listen(port, () => {
    console.log(`Server is listening on ${port}`);
});

