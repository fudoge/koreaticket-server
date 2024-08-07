// require('dotenv').config();
require('dotenv').config({ path: '.env.local' })
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');

const authRouter = require("./controllers/authController");
const reviewBoardRouter = require("./controllers/reviewController");
const mainRouter = require("./controllers/mainController");
const myPageRouter = require("./controllers/myPageController");
const matchRouter = require("./controllers/matchController");

const port = process.env.PORT;
const app = express();

app.use(cors({
    origin: 'http://localhost:3000',
    methods: 'GET, HEAD, PUT, PATCH, POST, DELETE',
    credentials: true
}));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '/build')));
app.use('/auth', authRouter);
app.use('/reviews', reviewBoardRouter);
app.use('/main', mainRouter);
app.use('/myPage', myPageRouter);
app.use('/matches', matchRouter);

app.get('/', (req, res) => {
    res.sendFile(path.join((__dirname, '/build/index.html')));
});

app.get('*', (req, res) => {
    res.sendFile(path.join((__dirname, '/build/index.html')));
});

app.listen(port, () => {
    console.log(`Server is listening on ${port}`);
});