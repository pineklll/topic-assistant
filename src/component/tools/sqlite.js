const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();

const DB = {};

DB.SqliteDB = function (file) {
  DB.db = new sqlite3.Database(file);

  DB.exist = fs.existsSync(file);
  if (!DB.exist) {
    console.log('Creating db file!');
    fs.openSync(file, 'w');
  }
};

DB.printErrorInfo = function (err) {
  console.log(`Error Message:${err.message} ErrorNumber:${err.no}`);
};

DB.SqliteDB.prototype.createTable = function (sql) {
  DB.db.serialize(function () {
    DB.db.run(sql, function (err) {
      if (err != null) {
        DB.printErrorInfo(err);
      }
    });
  });
};

/// tilesData format; [[level, column, row, content], [level, column, row, content]]
DB.SqliteDB.prototype.insertData = function (sql, objects) {
  DB.db.serialize(function () {
    const stmt = DB.db.prepare(sql);
    for (let i = 0; i < objects.length; i += 1) {
      stmt.run(objects[i]);
    }

    stmt.finalize();
  });
};

DB.SqliteDB.prototype.queryData = function (sql, callback) {
  DB.db.all(sql, function (err, rows) {
    if (err != null) {
      DB.printErrorInfo(err);
      return;
    }

    /// deal query data.
    if (callback) {
      callback(rows);
    }
  });
};

DB.SqliteDB.prototype.executeSql = function (sql) {
  DB.db.run(sql, function (err) {
    if (err != null) {
      DB.printErrorInfo(err);
    }
  });
};

DB.SqliteDB.prototype.close = function () {
  DB.db.close();
};

/// export SqliteDB.
exports.SqliteDB = DB.SqliteDB;
