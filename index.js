const express=require("express")
const dotenv=require("dotenv")
const connection = require("./config/db")
const UserRouter = require("./routes/user.routes")
var cookieParser = require('cookie-parser')
const notesRouter = require("./routes/notes.routes")
dotenv.config()
const cors=require("cors")

const app=express()
app.use(cookieParser())
app.use(express.json())
app.use(cors({
    origin: "http://localhost:5174",
    credentials: true
}))

app.use(express.static("./uploads"))
app.use("/user",UserRouter)
app.use("/notes",notesRouter)


app.listen(process.env.PORT || 3000,async()=>{

    try {
        await connection
        console.log("connected to database")

        console.log(`server is running on port ${process.env.PORT || 3000}`)
    } catch (error) {
        console.log(error)
    }
})