const path = require('path');
const express = require('express');
const methodOverride = require('method-override')
const morgan = require('morgan');
const exhbs = require('express-handlebars');
const IndexRouter = require('./routers/IndexRouter.js');

const SortMiddlewares = require('./app/middlewares/sortMiddleware.js')

const db = require('./config/db/IndexMongo.js');
const app = express();


//connect to DB
db.connect();

const PORT = 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());

app.use(express.urlencoded({
    extended: true
}));

app.use(methodOverride('_method'))

//custom middlewares
app.use(SortMiddlewares)

//Templates engine
app.engine('hbs', exhbs.engine({
    extname: '.hbs',
    helpers: require('./helper/handlebar'),

}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

//HTTP logger
//app.use(morgan('combined'));


IndexRouter(app);


app.listen(PORT, () => {
    console.log("gate port-->: " + PORT);
})