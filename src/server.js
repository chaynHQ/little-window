const app = require('./app');

app.listen(app.get('port'), () => {
  // TODO: Proper Logging
  // console.log(`Find the server at: http://localhost:${app.get('port')}/`);
});
