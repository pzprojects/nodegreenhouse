require('dotenv').config();
import express, { json } from 'express';
import { connect } from 'mongoose';
import path from 'path';
import cors from 'cors';


const app = express();
app.use(cors());

// Bodyparser Middleware
app.use(json());

app.get("/json", (req, res) => {
    res.json({ message: "Server is up!" });
 });

 app.get("/", (req, res) => {
    res.sendFile(__dirname + '/index.html');
 });
//app.use(express.static(path.join(__dirname, 'client/build')));

// Connect to Mongo
connect(process.env.DB, { 
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  }) // Adding new mongo url parser
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

// Use Routes
app.use('/api/items', require('./routes/api/items'));
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/vegetables', require('./routes/api/vegetables'));
app.use('/api/farmers', require('./routes/api/farmers'));
app.use('/api/growers', require('./routes/api/growers'));
app.use('/api/updategroweruser', require('./routes/api/updategroweruser'));
app.use('/api/updategrower', require('./routes/api/updategrower'));
app.use('/api/deactivateuser', require('./routes/api/deactivateuser'));
app.use('/api/deactivategrower', require('./routes/api/deactivategrower'));
app.use('/api/updatefarmeractivefarms', require('./routes/api/updatefarmeractivefarms'));
app.use('/api/updateruseractivefarms', require('./routes/api/updateruseractivefarms'));
app.use('/api/updatefarmeruser', require('./routes/api/updatefarmeruser'));
app.use('/api/updatefarmer', require('./routes/api/updatefarmer'));
app.use('/api/updateveg', require('./routes/api/updateveg'));
app.use('/api/systemconfig', require('./routes/api/systemconfig'));
app.use('/api/sendresetpasswordmail', require('./routes/api/sendresetpasswordmail'));
app.use('/api/receiveNewPassword', require('./routes/api/receiveNewPassword'));
app.use('/api/ResetGrowerUserName', require('./routes/api/ResetGrowerUserName'));
app.use('/api/ResetUserName', require('./routes/api/ResetUserName'));
app.use('/api/fieldcrops', require('./routes/api/fieldcrops'));
app.use('/api/updatefieldcrop', require('./routes/api/updatefieldcrop'));
app.use('/api/veglogs', require('./routes/api/veglogs'));
app.use('/api/myshopitems', require('./routes/api/myshopitems'));
app.use('/api/veglanguages', require('./routes/api/veglanguages'));
app.use('/api/updateveglanguage', require('./routes/api/updateveglanguage'));

const port = process.env.PORT || 5000;

// Importing AWSPresigner
import { generateGetUrl, generatePutUrl } from './s3upload/AWSPresigner';

// GET URL
app.get('/generate-get-url', (req, res) => {
  // Both Key and ContentType are defined in the client side.
  // Key refers to the remote name of the file.
  const { Key } = req.query;
  generateGetUrl(Key)
    .then(getURL => {      
      res.send(getURL);
    })
    .catch(err => {
      res.send(err);
    });
});

// PUT URL
app.get('/generate-put-url', (req,res)=>{
  // Both Key and ContentType are defined in the client side.
  // Key refers to the remote name of the file.
  // ContentType refers to the MIME content type, in this case image/jpeg
  const { Key, ContentType } =  req.query;
  generatePutUrl(Key, ContentType).then(putURL => {
    res.send({putURL});
  })
  .catch(err => {
    res.send(err);
  });
});


app.listen(port, () => console.log(`Server started on port ${port}`));