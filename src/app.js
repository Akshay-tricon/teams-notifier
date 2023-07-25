const express = require('express');
const { getS3File } = require('./services/aws');
const app = express();
const port = 3000;

app.get('/file/local/:filename', async (req, res) => {
  // const fileStream = createReadStream(resolve(__dirname, '../test', req.params.filename));
  const file = await getS3File(req.params.filename);
  res.setHeader('Content-Type', 'application/octet-stream');
  if(file.contentLength) res.setHeader('Content-Length', file.contentLength);
  if(file.contentEncoding) res.setHeader('Content-Encoding', file.contentEncoding);
  if(file.body) {
    file.body.pipe(res);
    file.body.on('error', (err) => {
      if(err['code']==='EISDIR' || err['code']==='ENOENT') {
        res.writeHead(404, 'FIle Not Found', {'Content-Type': 'text/plain'});
        res.end('FIle Not Found');
      } else {
        res.writeHead(500, 'Internal Server Error', {'Content-Type': 'text/plain'});
        res.end(err.message);
      }
    });
  } else {
    res.writeHead(404, 'FIle Not Found', {'Content-Type': 'text/plain'});
    res.end('FIle Not Found');
  }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})