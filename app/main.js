import express from "express";
import router from "./config/router";
import config from "./config/config";
import autoload from "./config/autoload";



const app = express();
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(express.static("public"));
app.set("views", "app/views");
app.set("view engine", "hbs");
app.use("/", router);
app.set('config', config);

// app = autoload.setLocal(app)

app.locals.globalVar = autoload;

app.listen(8000, ()=>{
  console.log(`jalan di 127.0.0.1:8000`);
});