const path = require('path');
const express = require('express');
const morgan = require('morgan');
const exhbs = require('express-handlebars');

const app = express();

const PORT = 3000;

app.use(express.static(path.join(__dirname, 'public')));

//Templates engine
app.engine('hbs', exhbs.engine({
    extname: '.hbs'
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources/views'));
//console.log("PATHH:  ", path.join(__dirname, 'resources/views'));

//HTTP logger
app.use(morgan('combined'));


//router
app.get('/', (req, res) => {
    res.render('home');
})

app.get('/news', (req, res) => {
    res.render('news');
})

app.listen(PORT, () => {
    console.log("gate port: " + PORT);
})