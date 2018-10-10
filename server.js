var express = require('express');
var app = express();
var http = require('http').Server(app);
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/email', (req, res) => {
  console.log("received email " + req.body.email);
  
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'mattbstanciu@gmail.com',
      pass: process.env.GMAIL_PASS
    }
  });
  
  var mailOptions = {
    from: 'mattbstanciu@gmail.com',
    to: 'mattbstanciu@gmail.com',
    subject: 'New info signup',
    text: req.body.email
  };
  transporter.sendMail(mailOptions, function(err, data) {
    if (err) return console.log(err);
    console.log("Email sent: " + data.response);
    return res.redirect('/added');
  }); 
});

app.get('/', function(request, response) {
  response.sendFile(__dirname + '/views/index.html');
});
app.get('/added', (request, response) => {
  response.sendFile(__dirname + '/views/added.html');
})

http.listen(3000);
