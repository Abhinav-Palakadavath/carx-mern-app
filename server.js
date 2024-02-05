import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js"
import categoryRoute from "./routes/categoryRoute.js"
import productRoutes from "./routes/productRoute.js"
import cors from 'cors'

//configure
dotenv.config();

//database config
connectDB();

//rest object
const app = express();

//middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

//routes
app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/category', categoryRoute)
app.use('/api/v1/cars', productRoutes)

//rest api
app.get("/", (req, res) => {
    res.send(
        "<h1>Hello World</h1>"
    )
})

//PORT

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT} `);
});