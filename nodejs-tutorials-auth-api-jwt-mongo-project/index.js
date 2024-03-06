const express = require('express');
const mongoose = require('mongoose')
const routes = require('./routes');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors')
const PORT = 5000;
app.use(cors())
app.use(bodyParser.json());
app.use('/api', routes);
mongoose.connect('mongodb+srv://suryanarayan:gcnRb9hfQq*G7pb@cluster0.tgzu9tt.mongodb.net/').then(()=>{
    console.log('DB Connected');
}).catch((e)=>{
    console.log(e.message)
})

app.listen(PORT, ()=>{
    console.log(`Server is up and running on PORT: ${PORT}`);
})
