require('dotenv').config();

const express = require('express');
const path = require('path');
const userModel = require('./models/user');
const loginmodel = require('./models/login');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());



app.get('/', (req, res) => {
    res.render('index');
});

const authenticateJWT = (req, res, next) => {
    const token = req.cookies.token; 
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                return res.sendStatus(403); 
            }
            req.user = user; 
            next(); 
        });
    } else {
        res.redirect('/login');
    }
};


app.get('/createcourse',authenticateJWT, async (req, res) => {
    res.render('createCourse')
 });

 app.post('/createdcourse',authenticateJWT, async (req, res) => {
    const { name, price, image } = req.body;
    await userModel.create({ name, price, image });
    res.redirect('/courses');
});


app.get('/courses', async (req, res) => {
   let users = await userModel.find()
    res.render('courses',{users});
});

app.get('/login', async (req, res) => {
    res.render('login')
 });

 app.post('/login', async function (req, res) {
    let user = await loginmodel.findOne({email: req.body.email})
    if (!user) return res.send("invalid details")

        bcrypt.compare(req.body.password,  user.password, function(err, result){
           if (result) {
            let token = jwt.sign({email: user.email}, process.env.JWT_SECRET);
;
            res.cookie("token", token);
            res.redirect('/createcourse');
        }
            else res.send("invalid details")
        })
   
 });

 app.get('/signup', async (req, res) => {
    res.render('signup')
 });

 app.post('/signup', (req, res) => {
    let { username, email, password} = req.body

    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, async (err,hash) =>{
              
   let logged = await loginmodel.create({
    username,
    email,
    password : hash
})

let token = jwt.sign({ email }, process.env.JWT_SECRET);
res.cookie("token", token);


res.send(logged);
            
        })
    })

  
});

app.get("/logout", function (req, res) {
   res.cookie("token", "")
   res.redirect("/login");
})




// app.post('/createdcourse', async (req, res) => {
//     let { name, price, image} = req.body

    
//    let createduser = await userModel.create({
//         name,
//         price,
//         image
//     })
//     res.send(createduser);
// });

app.get('/edit/:userid', async (req, res) => {
   let user = await userModel.findOne({_id: req.params.userid});
    res.render("/edit", {user});
});


app.get('/delete/:_id', async (req, res) => {
    await userModel.findByIdAndDelete(req.params._id);
    res.redirect("/courses");
});


app.get('/createuser', async (req, res) => {
    const createduser = await userModel.find()
    res.send(createduser)
})


app.listen(process.env.PORT || 3000);
