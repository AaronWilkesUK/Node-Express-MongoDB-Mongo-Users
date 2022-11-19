import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import userRoutes from './routes/users.js';

const app = express();
const PORT = 5000;
const dbURI = "mongodb://127.0.0.1:27017/Users";
mongoose.connect(dbURI)
.then((result) => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
        console.log("Server running on port ", PORT);
    })
})
.catch((err) => {
    console.log(err);
});

app.use(bodyParser.json());

app.use('/users', userRoutes);

app.get('/', (req, res) => {
    res.send("Try looking under /users");
})