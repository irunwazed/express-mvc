const express = require("express")

const app = express()

const path = require("path")
const router = require("./config/router")


app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(express.static("public"))
app.set("views", "app/views")
app.set("view engine", "hbs")
app.use("/", router)

app.listen(8000);