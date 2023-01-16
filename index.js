const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors')
const apiRoutes = require('./routes/index');
const connectDB = require('./config/db');
dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();

app.use('/api', apiRoutes);

app.use('/', (req, res) => {
    res.send('API Working Fine');
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, 
    console.log(`Server running on port ${PORT}`)    
);