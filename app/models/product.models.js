const sql = require("./db.js");

const Product = function (product) {
   this.productName = product.productName;
   this.productDescription = product.productDescription;
   this.productPrice = product.productPrice;
};

Product.create = (newProduct, result) => {
   sql.query("INSERT INTO product SET ?", newProduct, (err, res) => {
      if (err) {
         console.log("error: ", err);
         result(err, null);
         return;
      }

      console.log("created product: ", { id: res.insertId, ...newProduct });
      result(null, { id: res.insertId, ...newProduct });
   });
};

Product.getAll = (result) => {
   sql.query("SELECT * FROM product", (err, res) => {
      if (err) {
         console.log("error: ", err);
         result(null, err);
         return;
      }

      console.log("product: ", res);
      result(null, res);
   });
};

Product.findById = (productId, result) => {
   sql.query(
      `SELECT * FROM product WHERE idProduct = ${productId}`,
      (err, res) => {
         if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
         }

         if (res.length) {
            console.log("found product: ", res[0]);
            result(null, res[0]);
            return;
         }

         result({ kind: "not_found" }, null);
      }
   );
};

Product.updateById = (id, product, result) => {
   sql.query(
      "UPDATE product SET ? WHERE idProduct = ?",
      [product, id],
      (err, res) => {
         if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
         }

         if (res.affectedRows == 0) {
            result({ kind: "not_found" }, null);
            return;
         }

         console.log("updated product: ", { id: id, ...product });
         result(null, { id: id, ...product });
      }
   );
};

Product.remove = (id, result) => {
   sql.query("DELETE FROM product WHERE idProduct = ?", id, (err, res) => {
      if (err) {
         console.log("error: ", err);
         result(null, err);
         return;
      }

      if (res.affectedRows == 0) {
         result({ kind: "not_found" }, null);
         return;
      }

      console.log("deleted product with id: ", id);
      result(null, res);
   });
};

module.exports = Product;
