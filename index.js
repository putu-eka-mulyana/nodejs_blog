const path = require('path')
const expressEdge = require('express-edge')
const express = require('express')
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const expressSession = require('express-session');
const connectMongo = require('connect-mongo')
const app = express()

const Post = require('./database/models/Post')
const createPostController = require('./controllers/createPost')
const homePageController = require('./controllers/homePage')
const storePostController = require('./controllers/storePost')
const singlePageController = require('./controllers/singlePost')
const aboutPageController = require('./controllers/aboutPage')
const contactPageController = require('./controllers/contactPage')
const createUserController = require('./controllers/createUser')
const storeUserController = require('./controllers/storeUser')
const loginController = require('./controllers/login')
const loginUserController = require('./controllers/loginUser')

const mongoStore = connectMongo(expressSession);
mongoose.connect('mongodb://localhost/node-js-blog',{ useNewUrlParser: true })

app.use(expressSession({
    secret:'secret',
    store : new mongoStore({
        mongooseConnection:mongoose.connection
    })
}))


app.use(express.static('public'))
app.use(expressEdge)
app.set('views', `${__dirname}/views`)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(fileUpload());

const storePost = require('./middleware/storePost')
app.use('/posts/store',storePost)

app.get('/',homePageController)
app.get('/about',aboutPageController)
app.get('/auth/login', loginController)
app.get('/auth/register',createUserController)
app.post('/users/register',storeUserController)
app.post('/users/login',loginUserController)
app.get('/contact',contactPageController)
app.get('/blogs/new',createPostController);
app.post('/blogs/store',storePostController)
app.get('/blog/:id',singlePageController)

app.listen(5000,()=>{
    console.log("berjalan di port 5000")
})
