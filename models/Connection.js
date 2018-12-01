const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/parcial',{useNewUrlParser:true})
.then(()=>console.log('connected to mongo...'))
.catch((er)=>console.log(`connection error!! ${er}`));

module.exports = mongoose;
