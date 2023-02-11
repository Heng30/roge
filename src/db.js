import SQLite from 'react-native-sqlite-storage';

const DB_PATH = 'roge.db';
const DB = (() => {
  // SQLite.DEBUG(true);
  // SQLite.enablePromise(true);

  const db = SQLite.openDatabase({name: DB_PATH, location: 'default'});
  db.transaction(txn => {
    txn.executeSql(
      'CREATE TABLE IF NOT EXISTS price_mark (symbol TEXT UNIQUE NOT NULL)',
      [],
    );
  });
  return db;
})();

const priceMarkTable = {
  load: items => {
    DB.transaction(txn => {
      txn.executeSql('SELECT * FROM price_mark', [], (tx, results) => {
        for (let i = 0; i < results.rows.length; ++i)
          items.push(results.rows.item(i).symbol);
      });
    });
  },

  insert: symbol => {
    DB.transaction(txn => {
      txn.executeSql('INSERT INTO price_mark (symbol) VALUES ($1)', [symbol]);
    });
  },
  delete: symbol => {
    DB.transaction(txn => {
      txn.executeSql('DELETE FROM price_mark where symbol=?', [symbol]);
    });
  },
};

export default {
  priceMarkTable,
};
