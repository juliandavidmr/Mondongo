var mondongo = require('../lib/lib');

// Connection URL
var url = 'mongodb://localhost:27017/blog_db';

mondongo.describe(url).then((described) => {
  console.log(JSON.stringify(described, null, 4));
});
