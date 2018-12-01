const express = require('express');
const app = express();

const lolerRoutes = require('./routes/lolers');

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));


app.set('view engine','ejs');

app.use('/api/lolers',lolerRoutes);

app.get('/',(req,res)=>{
    res.render('index');
});

app.listen(3000,()=>console.log('listening on port 3000'));