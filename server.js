const express = require("express");
var cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

require("./app/routes/user.routes.js")(app);
require("./app/routes/role.routes.js")(app);
require("./app/routes/category.routes.js")(app);
require("./app/routes/store.routes.js")(app);
require("./app/routes/favorite.routes.js")(app);
require("./app/routes/product.routes.js")(app);
require("./app/routes/productColor.routes.js")(app);
require("./app/routes/productImage.routes.js")(app);
require("./app/routes/productRate.routes.js")(app);
require("./app/routes/productSize.routes.js")(app);

app.listen(6100, () => {
   console.log("Server is running on port 6100.");
});
9;
