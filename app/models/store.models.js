const sql = require("./db.js");

const Store = function (store) {
   this.storeName = store.storeName;
   this.ownerPhone = store.ownerPhone;
   this.ownerName = store.ownerName;
};

Store.create = (newStore, result) => {
   sql.query("INSERT INTO store SET ?", newStore, (err, res) => {
      if (err) {
         console.log("error: ", err);
         result(err, null);
         return;
      }

      console.log("created store: ", { id: res.insertId, ...newStore });
      result(null, { id: res.insertId, ...newStore });
   });
};

Store.getAll = (result) => {
   sql.query("SELECT * FROM store", (err, res) => {
      if (err) {
         console.log("error: ", err);
         result(null, err);
         return;
      }

      console.log("store: ", res);
      result(null, res);
   });
};

Store.findById = (storeId, result) => {
   sql.query(`SELECT * FROM store WHERE idStore = ${storeId}`, (err, res) => {
      if (err) {
         console.log("error: ", err);
         result(err, null);
         return;
      }

      if (res.length) {
         console.log("found store: ", res[0]);
         result(null, res[0]);
         return;
      }

      result({ kind: "not_found" }, null);
   });
};

Store.updateById = (id, store, result) => {
   sql.query(
      "UPDATE store SET ? WHERE idStore = ?",
      [store, id],
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

         console.log("updated store: ", { id: id, ...store });
         result(null, { id: id, ...store });
      }
   );
};

Store.remove = (id, result) => {
   sql.query("DELETE FROM store WHERE idStore = ?", id, (err, res) => {
      if (err) {
         console.log("error: ", err);
         result(null, err);
         return;
      }

      if (res.affectedRows == 0) {
         result({ kind: "not_found" }, null);
         return;
      }

      console.log("deleted store with id: ", id);
      result(null, res);
   });
};

module.exports = Store;
