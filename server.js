const app = require("./src/app")

app.listen(global.PORT, () => {
  console.log(`Server ready on http://localhost:${global.PORT}`);
});