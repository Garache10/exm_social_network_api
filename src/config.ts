import 'dotenv/config';
import Mongoose from 'mongoose';

Mongoose.set('useFindAndModify', false);
Mongoose.connect(`${process.env.STRING_DB}`, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log('Connected to db');
});