import mongoose from 'mongoose';

const connectDB = async()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("mongoDB connected");
    } catch (error) {
        console.error("mongoDB connection failed");
        process.exit(1);
    }
};
export default connectDB;

//What is happening here? (Simple words)
// mongoose → talks to MongoDB
// process.env.MONGO_URI → MongoDB URL from .env
// try/catch → if DB fails, app stops (GOOD practice)
// export default → so server can use it