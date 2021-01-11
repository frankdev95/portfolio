const express = require("express");
const bodyParser = require('body-parser');
const https = require('https');
const app = express();
// DATA PARSING

app.use(express.urlencoded({
    extended: false
}))

app.use(express.json());

app.set('view engine', 'ejs');

let port = process.env.PORT;
if (port === null || port === "" || port === undefined) {
    port = 3000;
}

app.listen(port, () => console.log("Server has started successfully"));
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
})

// CONTACT FORM POST REQUEST FUNCTIONALITY

app.post('/', (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const message = req.body.message;
    let reply, success;

    let data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    NAME: name,
                    MESSAGE: message
                }
            }
        ]
    };

    const jsonData = JSON.stringify(data);
    const url = "https://us20.api.mailchimp.com/3.0/lists/ed472e4a45";
    const options = {
        method: "POST",
        auth: "user:685a534876dbee8ecf7a54ddc45cb1fb-us20"
    }

    const request = https.request(url, options, (response) => {
        res.on("data", (data) => {
            // console.log(JSON.parse(data));
        })
    });

    request.write(jsonData);
    request.end()
})

// API KEY

// 685a534876dbee8ecf7a54ddc45cb1fb-us20

// LIST ID

// ed472e4a45
