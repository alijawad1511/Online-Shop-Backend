import express from 'express';
import mongoose from 'mongoose'
import users from './routes/api/users.js'


// App Config
const app = express()
const PORT = 5000;
const CONNECTION_URL = `mongodb+srv://admin:8tyUrIqcLYJCUEfK@cluster0.hbkld.mongodb.net/OnlineShop?retryWrites=true&w=majority`

// Middlewares
app.use(express.json())

// DB Config
mongoose.connect(CONNECTION_URL)
    .then(() => console.log('Connected to MongoDB successfully...'))
    .catch((error) => console.log(error))

// Route Files
app.use('/api/users',users)

// API Endpoints
app.get('/',(req,res) => {
    res.send('Welcome to Online Store... :)')
})

// Listener
app.listen(PORT,() => console.log(`OnlineStore server is listening at ${PORT}`));