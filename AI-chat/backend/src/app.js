const express=require('express');
const app=express();
const cookieParser=require('cookie-parser');
const connectDB=require('./db/db');

/* Routes */
const authRouter=require('./routes/auth.routes');
const chatRouter=require('./routes/chat.routes');
const cors=require('cors');

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
    allowedHeaders: ["token","Authorization","content-type"]

}));
connectDB();

/* Middlewares */
app.use(express.json());
app.use(cookieParser());

/*Using Routes */
app.use('/auth',authRouter);
app.use('/chat',chatRouter);

module.exports=app;