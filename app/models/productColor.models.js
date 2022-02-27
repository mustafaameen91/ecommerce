const sql = require("./db.js");

const ProductColor = function (productColor) {
   this.productSizeId = productColor.productSizeId;
   this.color = productColor.color;
   this.quantity = productColor.quantity;
};

ProductColor.create = (newProductColor, result) => {
   sql.query("INSERT INTO productColor SET ?", newProductColor, (err, res) => {
      if (err) {
         console.log("error: ", err);
         result(err, null);
         return;
      }

      console.log("created productColor: ", {
         id: res.insertId,
         ...newProductColor,
      });
      result(null, { id: res.insertId, ...newProductColor });
   });
};

ProductColor.getAll = (result) => {
   sql.query("SELECT * FROM productColor", (err, res) => {
      if (err) {
         console.log("error: ", err);
         result(null, err);
         return;
      }

      console.log("productColor: ", res);
      result(null, res);
   });
};

ProductColor.findById = (productColorId, result) => {
   sql.query(
      `SELECT * FROM productColor WHERE idProductColor = ${productColorId}`,
      (err, res) => {
         if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
         }

         if (res.length) {
            console.log("found productColor: ", res[0]);
            result(null, res[0]);
            return;
         }

         result({ kind: "not_found" }, null);
      }
   );
};

ProductColor.updateById = (id, productColor, result) => {
   sql.query(
      "UPDATE productColor SET ? WHERE idProductColor = ?",
      [productColor, id],
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

         console.log("updated productColor: ", { id: id, ...productColor });
         result(null, { id: id, ...productColor });
      }
   );
};

ProductColor.remove = (id, result) => {
   sql.query(
      "DELETE FROM productColor WHERE idProductColor = ?",
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

         console.log("deleted productColor with id: ", id);
         result(null, res);
      }
   );
};

module.exports = ProductColor;
