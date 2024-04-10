const express = require('express');
const app = express();
const fs = require('fs');
const bodyParser = require('body-parser');


app.use(bodyParser.urlencoded({ extended: true,parameterLimit:1000000, limit: '500mb' }));
app.use(bodyParser.json({limit: '500mb'}));
app.use(express.json());

app.post('/upload', (req, res) => {
  const image = req.body.image;
  const base64Data = image.replace(/^data:image\/\w+;base64,/, '');
  const buffer = Buffer.from(base64Data, 'base64');
  fs.writeFile('received_image.jpg', buffer, (err) => {
    if (err) {
      console.error('Lưu ảnh không thành công:  ', err);
      res.status(500).send('Lưu ảnh không thành công');
    } else {
      console.log('Image saved successfully');
      res.status(200).send('Image saved successfully');
    }
  });
});

app.listen(8000, () => {
  console.log('Server is running on port 8000');
});
