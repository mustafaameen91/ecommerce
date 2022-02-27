const sql = require("./db.js");

const ProductSize = function (productSize) {
   this.size = productSize.size;
   this.productId = productSize.productId;
   this.quantity = productSize.quantity;
};

ProductSize.create = (newProductSize, result) => {
   sql.query("INSERT INTO productSize SET ?", newProductSize, (err, res) => {
      if (err) {
         console.log("error: ", err);
         result(err, null);
         return;
      }

      console.log("created productSize: ", {
         id: res.insertId,
         ...newProductSize,
      });
      result(null, { id: res.insertId, ...newProductSize });
   });
};

ProductSize.getAll = (result) => {
   sql.query("SELECT * FROM productSize", (err, res) => {
      if (err) {
         console.log("error: ", err);
         result(null, err);
         return;
      }

      console.log("productSize: ", res);
      result(null, res);
   });
};

ProductSize.findById = (productSizeId, result) => {
   sql.query(
      `SELECT * FROM productSize WHERE idProductSize = ${productSizeId}`,
      (err, res) => {
         if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
         }

         if (res.length) {
            console.log("found productSize: ", res[0]);
            result(null, res[0]);
            return;
         }

         result({ kind: "not_found" }, null);
      }
   );
};

ProductSize.updateById = (id, productSize, result) => {
   sql.query(
      "UPDATE productSize SET ? WHERE idProductSize = ?",
      [productSize, id],
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

         console.log("updated productSize: ", { id: id, ...productSize });
         result(null, { id: id, ...productSize });
      }
   );
};

ProductSize.remove = (id, result) => {
   sql.query(
      "DELETE FROM productSize WHERE idProductSize = ?",
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

         console.log("deleted productSize with id: ", id);
         result(null, res);
      }
   );
};

module.exports = ProductSize;
