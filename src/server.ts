import express from "express";
import bodyParser from "body-parser";
import SimpleInterpreter from "./interpreter";
import path from "path";

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.render("index", { registers: null, code: null });
});

app.post("/", (req, res) => {
    const code: string = req.body.code;
    const interpreter = new SimpleInterpreter(code.split(/\r?\n/));
    const registers = interpreter.run();
    res.render("index", { registers, code });
});

app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});