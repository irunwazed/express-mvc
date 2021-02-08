const express = require("express")

const app = express()

const path = require("path")
const router = require("./config/router")
import Database from './config/database'
// console.log(Database.Database)
var DB = new Database()

// DB.setQuery("SELECT * FROM ref_penduduk")
// console.log('tes')
// var config = require('./config');

app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(express.static("public"))
app.set("views", "app/views")
app.set("view engine", "hbs")
app.use("/", router)
app.set('config', {config : 'tes', DB: DB.setConnection()}); 

app.listen(8000);