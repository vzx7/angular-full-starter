let express = require('express')
let compression = require('compression')
let app = express();
let path = require('path');
let settings = {
  port: 8384,
  basePath: path.join(__dirname, '../../dist/client')
}
app.use(compression({
  level: 8,
  threshold: 0,
  filter: function (req, res) {
    let ct = res.get('content-type');
    console.log(ct);
    return true;
  }
}));
app.use(express.static(settings.basePath));

/**
 * To handle 404 errors and others, always redirect to the application root.
 */
app.get('*', (req, res) => {
  res.sendFile(path.resolve(settings.basePath + '/index.html'));
});

app.listen(settings.port, function () {
  console.log("Production static server run now at port " + settings.port);
});
