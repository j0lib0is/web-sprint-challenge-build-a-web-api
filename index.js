// Play this: https://www.youtube.com/watch?v=d-diB65scQU

// Import
const server = require('./api/server');
// Port
require('dotenv').config();
const PORT = process.env.PORT || 9000;
// Listen
server.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}.`);
});