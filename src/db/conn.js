const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/reg-form",{
    useNewUrlParser : true,
    useUnifiedTopology : true,
    /* useCreateIndex : false */
}).then(()=>{
    console.log('connection success - db');
}).catch((err)=>{
    console.log('connection failure ',err);    
});