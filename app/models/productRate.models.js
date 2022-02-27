const sql = require("./db.js");

const ProductRate = function (productRate) {
   this.rate = productRate.rate;
   this.productId = productRate.productId;
};

ProductRate.create = (newProductRate, result) => {
   sql.query("INSERT INTO productRate SET ?", newProductRate, (err, res) => {
      if (err) {
         console.log("error: ", err);
         result(err, null);
         return;
      }

      console.log("created productRate: ", {
         id: res.insertId,
         ...newProductRate,
      });
      result(null, { id: res.insertId, ...newProductRate });
   });
};

ProductRate.getAll = (result) => {
   sql.query("SELECT * FROM productRate", (err, res) => {
      if (err) {
         console.log("error: ", err);
         result(null, err);
         return;
      }

      console.log("productRate: ", res);
      result(null, res);
   });
};

ProductRate.findById = (productRateId, result) => {
   sql.query(
      `SELECT * FROM productRate WHERE idProductRate = ${productRateId}`,
      (err, res) => {
         if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
         }

         if (res.length) {
            console.log("found productRate: ", res[0]);
            result(null, res[0]);
            return;
         }

         result({ kind: "not_found" }, null);
      }
   );
};

ProductRate.updateById = (id, productRate, result) => {
   sql.query(
      "UPDATE productRate SET ? WHERE idProductRate = ?",
      [productRate, id],
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

         console.log("updated productRate: ", { id: id, ...productRate });
         result(null, { id: id, ...productRate });
      }
   );
};

ProductRate.remove = (id, result) => {
   sql.query(
      "DELETE FROM productRate WHERE idProductRate = ?",
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

         console.log("deleted productRate with id: ", id);
         result(null, res);
      }
   );
};

module.exports = ProductRate;
