var express = require('express');
var app = express();
var path = require('path');
var settings = {
  port: 8383,
  basePath: path.join(__dirname, '../../', 'dist', 'client')
}

app.use(express.static(settings.basePath));
/**
 * Для обработки 404 ошибки и других, всегда редирект на корень приложения.
 */
app.get('*', (req, res) => {
  res.sendFile(path.resolve(settings.basePath + '/index.html'));
});

app.listen(settings.port, function () {
  console.log("Production server run now at port " + settings.port);
});
