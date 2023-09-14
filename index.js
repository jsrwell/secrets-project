import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __root = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;
var userIsAuthorised = false;

// Check the basic password
const passwordCheck = (req, res, next) => {
    const password = req.body["password"];
    if (password === "ILoveProgramming") {
        userIsAuthorised = true;
    }
    next();
}

app.use(bodyParser.urlencoded({ extended: true }));
app.use(passwordCheck);

app.get("/", (req, res) => {
    res.sendFile(__root + "/public/index.html");
});

app.post("/check", (req, res) => {
    if (userIsAuthorised) {
        res.sendFile(__root + "/public/secret.html");
    } else {
        res.redirect("/");
    }
});

app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`);
});
