const app = require('./app');
require('dotenv').config();

const portSecond = 3333;
const PORT = process.env.PORT || portSecond;

app.listen(PORT, () => {
  console.log(`Server is running on port ${'PORT'}`);
});
