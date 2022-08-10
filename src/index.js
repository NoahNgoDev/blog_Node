const path = require('path');
const express = require('express');
const morgan = require('morgan');
const exhbs = require('express-handlebars');
const IndexRouter = require('./routers/IndexRouter.js');

const app = express();


const PORT = 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());



//Templates engine
app.engine('hbs', exhbs.engine({
    extname: '.hbs'
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources/views'));

//HTTP logger
//app.use(morgan('combined'));


IndexRouter(app);


app.listen(PORT, () => {
    console.log("gate port-->: " + PORT);
})