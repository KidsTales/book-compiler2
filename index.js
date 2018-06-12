const server = require('./server');

const port = process.env.PORT || 3000;
server.listen(port, () => console.log(`KidsTales book compiler server started on ${port}`));