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
    txn.executeSql(
      'CREATE TABLE IF NOT EXISTS setting (name TEXT UNIQUE NOT NULL, value TEXT NOT NULL)',
      [],
    );
    settingTable.init();
  });

  return db;
})();

const priceMarkTable = {
  load: items => {
    DB.transaction(txn => {
      txn.executeSql('SELECT * FROM price_mark', [], (tx, results) => {
        for (let i = 0; i < results.rows.length; i++)
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

const settingTable = {
  init: () => {
    DB.transaction(txn => {
      txn.executeSql('SELECT * FROM setting', [], (tx, results) => {
        let fontSizeFound = false;
        let themeModeFound = false;
        for (let i = 0; i < results.rows.length; i++) {
          if (results.rows.item(i).name === 'fontSize') {
            fontSizeFound = true;
          }

          if (results.rows.item(i).name === 'themeMode') {
            themeModeFound = true;
          }
        }

        if (!fontSizeFound)
          txn.executeSql('INSERT INTO setting (name, value) VALUES ($1, $2)', [
            'fontSize',
            '15',
          ]);

        if (!themeModeFound)
          txn.executeSql('INSERT INTO setting (name, value) VALUES ($1, $2)', [
            'themeMode',
            'light',
          ]);
      });
    });
  },

  get: (name, cb) => {
    DB.transaction(txn => {
      txn.executeSql('SELECT * FROM setting', [], (tx, results) => {
        for (let i = 0; i < results.rows.length; i++)
          if (results.rows.item(i).name === name) {
            cb(results.rows.item(i).value);
            return;
          }
      });
    });
  },
  update: (name, value) => {
    DB.transaction(txn => {
      txn.executeSql('UPDATE setting set value=? where name=?', [
        String(value),
        name,
      ]);
    });
  },
  delete: name => {
    DB.transaction(txn => {
      txn.executeSql('DELETE FROM setting where name=?', [name]);
    });
  },
};

export default {
  priceMarkTable,
  settingTable,
};
