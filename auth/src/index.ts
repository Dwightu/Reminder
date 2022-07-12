import mongoose from 'mongoose';


import { app } from './app'

const start = async () => {
    console.log('Starting up...')
    if (!process.env.JWT_KEY) {
        throw new Error('JWT is not found')
    }
    if (!process.env.MONGO_URI) {
        throw new Error('Mongo_URI is not found')
    }
    try {
        await mongoose.connect(process.env.MONGO_URI, {})
        console.log('Conncted to MongoDB successfully!!')
    } catch (err) {
        console.log(err)
    }

    app.listen(3000, () => {
        console.log('Listening on port 3000')
    })
}
start();



