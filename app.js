const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
// const mongoConnect = require('./util/database').mongoConnect;
const mongoose =  require('mongoose');
// const User = require('./models/user');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// app.use((req, res, next) => {
//   // User.findById(1)
//   //   .then(user => {
//   //     req.user = user;
//   //     next();
//   //   })
//   //   .catch(err => console.log(err));
//   // next();

//   User.findById('64b830403049afc6e710b841')
//     .then(user => {
//        req.user = new User(user.name, user.email, user.cart, user._id);
//       next();
//     })
//     .catch(err => console.log(err));
// });

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoose.connect('mongodb+srv://alka222:wXNq9uiPa3w46VTy@cluster0.dbbju49.mongodb.net/shop?retryWrites=true&w=majority')
.then(result => {
  app.listen(3000)
})
.catch(err => {
  console.log(err)
})
