const sql = require("./db.js");

const ProductImage = function (productImage) {
   this.imagePath = productImage.imagePath;
   this.productId = productImage.productId;
};

ProductImage.create = (newProductImage, result) => {
   sql.query("INSERT INTO productImage SET ?", newProductImage, (err, res) => {
      if (err) {
         console.log("error: ", err);
         result(err, null);
         return;
      }

      console.log("created productImage: ", {
         id: res.insertId,
         ...newProductImage,
      });
      result(null, { id: res.insertId, ...newProductImage });
   });
};

ProductImage.getAll = (result) => {
   sql.query("SELECT * FROM productImage", (err, res) => {
      if (err) {
         console.log("error: ", err);
         result(null, err);
         return;
      }

      console.log("productImage: ", res);
      result(null, res);
   });
};

ProductImage.findById = (productImageId, result) => {
   sql.query(
      `SELECT * FROM productImage WHERE idProductImage = ${productImageId}`,
      (err, res) => {
         if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
         }

         if (res.length) {
            console.log("found productImage: ", res[0]);
            result(null, res[0]);
            return;
         }

         result({ kind: "not_found" }, null);
      }
   );
};

ProductImage.updateById = (id, productImage, result) => {
   sql.query(
      "UPDATE productImage SET ? WHERE idProductImage = ?",
      [productImage, id],
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

         console.log("updated productImage: ", { id: id, ...productImage });
         result(null, { id: id, ...productImage });
      }
   );
};

ProductImage.remove = (id, result) => {
   sql.query(
      "DELETE FROM productImage WHERE idProductImage = ?",
      id,
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

         console.log("deleted productImage with id: ", id);
         result(null, res);
      }
   );
};

module.exports = ProductImage;
