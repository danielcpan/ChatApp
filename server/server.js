const app = require('./app');
const { PORT, PUBLIC_URL } = require('./config/config');

app.listen(PORT, () => {
  console.info(`server started on ${PUBLIC_URL}`); // eslint-disable-line no-console
});