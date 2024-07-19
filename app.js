require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const authRouter = require("./routes/authRoutes");
const reviewBoardRouter = require("./routes/reviewRoutes");
const mainRouter = require("./routes/mainRoutes");
const myPageRouter = require("./routes/myPageRoutes");

const port = process.env.PORT;
const app = express();

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '/build')));
app.use('/auth', authRouter);
app.use('/reviews', reviewBoardRouter);
app.use('/main', mainRouter);
app.use('/myPage', myPageRouter);

app.get('/', (req, res) => {
    res.sendFile(path.join((__dirname, '/build/index.html')));
});

app.get('*', (req, res) => {
    res.sendFile(path.join((__dirname, '/build/index.html')));
});

app.listen(port, () => {
    console.log(`Server is listening on ${port}`);
});