const express = require("express");
const expressGraphQl = require("express-graphql");
const schema = require("./schema.js");
const PORT = process.env.port || 4000;
const app = express();

app.use(
  "/graphql",
  expressGraphQl({
    schema: schema,
    graphiql: true
  })
);

app.listen(PORT, () => {
  console.log(`Sever started on port ${PORT}`);
});
