
const express = require('express');
const path = require('path');
const userModel = require('./models/user');

const app = express();

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.get('/', (req, res) => {
    res.render('index');
});

app.get('/createcourse', async (req, res) => {
    res.render('createCourse')
 });

app.get('/courses', async (req, res) => {
   let users = await userModel.find()
    res.render('courses',{users});
});

app.post('/createdcourse', async (req, res) => {
    let { name, price, image} = req.body

    
   let createduser = await userModel.createdcourse({
        name,
        price,
        image
    })
    res.send(createduser)
});




app.listen(3000)