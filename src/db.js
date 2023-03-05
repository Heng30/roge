import SQLite from 'react-native-sqlite-storage';
import axios from 'axios';

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
  load: cb => {
    DB.transaction(txn => {
      txn.executeSql('SELECT * FROM price_mark', [], (tx, results) => {
        const items = [];
        for (let i = 0; i < results.rows.length; i++)
          items.push(results.rows.item(i).symbol);
        cb(items);
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
        let fontSizeFound = false,
          themeModeFound = false;
        let syncsvrAPIFound = false;
        for (let i = 0; i < results.rows.length; i++) {
          if (results.rows.item(i).name === 'fontSize') {
            fontSizeFound = true;
          }

          if (results.rows.item(i).name === 'themeMode') {
            themeModeFound = true;
          }

          if (results.rows.item(i).name === 'syncsvrAPI') {
            syncsvrAPIFound = true;
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

        if (!syncsvrAPIFound)
          txn.executeSql('INSERT INTO setting (name, value) VALUES ($1, $2)', [
            'syncsvrAPI',
            '',
          ]);
      });
    });
  },

  load: cb => {
    DB.transaction(txn => {
      txn.executeSql('SELECT * FROM setting', [], (tx, results) => {
        const items = [];
        for (let i = 0; i < results.rows.length; i++) {
          items.push({
            name: results.rows.item(i).name,
            value: results.rows.item(i).value,
          });
        }
        cb(items);
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

const uploadAllData = async cb => {
  const priceMarkTablePromise = new Promise((resolve, reject) => {
    let isResolve = false;
    setTimeout(() => {
      if (isResolve) return;
      reject(null);
    }, 3000);
    priceMarkTable.load(items => {
      isResolve = true;
      resolve([{name: 'priceMarkTable', value: items}]);
    });
  });

  const settingTablePromise = new Promise((resolve, reject) => {
    let isResolve = false;
    setTimeout(() => {
      if (isResolve) return;
      reject(null);
    }, 3000);
    settingTable.load(items => {
      isResolve = true;
      resolve(items);
    });
  });

  const dataList = [];
  let url = '';
  try {
    const res = await Promise.allSettled([
      priceMarkTablePromise,
      settingTablePromise,
    ]);

    let markCoins = [];
    res.forEach(item => {
      if (Array.isArray(item.value)) {
        item.value.forEach(it => {
          if (it.name === 'syncsvrAPI') url = it.value;

          if (it.name === 'priceMarkTable') markCoins = it.value;
          else dataList.push(it);
        });
      }
    });

    const errors = [];
    const respList = [];
    const names = ['markCoins', 'roge'];
    const values = [markCoins, dataList];
    for (let i = 0; i < names.length; i++) {
      const rurl = url + '/' + names[i];
      try {
        const resp = await axios.post(rurl, JSON.stringify(values[i]), {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        respList.push(resp);
      } catch (e) {
        errors.push(e.toString());
      }
    }

    respList.forEach(item => {
      if (item.status !== 200 && !!item.data && item.data.code !== 0)
        errors.push(item.data.error);
    });

    cb(errors);
  } catch (e) {
    cb([e.toString()]);
  }
};

const downloadAllData = async cb => {
  try {
    const url = await new Promise((resolve, reject) => {
      let isResolve = false;
      setTimeout(() => {
        if (isResolve) return;
        reject('');
      }, 3000);
      settingTable.get('syncsvrAPI', item => {
        isResolve = true;
        resolve(item);
      });
    });

    const errors = [];
    const names = ['markCoins', 'roge'];
    for (let i = 0; i < names.length; i++) {
      const rurl = url + '/' + names[i];
      try {
        const resp = await axios.get(rurl);
        if (resp.status !== 200) {
          if (!!resp.data && resp.data.code !== 0) {
            errors.push(item.data.error);
          }
        } else {
          if (i === 0) {
            const data = JSON.parse(resp.data.data);
            if (Array.isArray(data)) {
              priceMarkTable.load(items => {
                items.forEach(item => {
                  priceMarkTable.delete(item);
                });
                data.forEach(item => {
                  priceMarkTable.insert(item);
                });
              });
            }
          } else if (i === 1) {
            const data = JSON.parse(resp.data.data);
            if (Array.isArray(data)) {
              data.forEach(item => {
                settingTable.get(item.name, () => {
                  settingTable.update(item.name, item.value);
                });
              });
            }
          }
        }
      } catch (e) {
        errors.push(e.toString());
      }
    }
    cb(errors);
  } catch (e) {
    cb([e.toString()]);
  }
};

export default {
  priceMarkTable,
  settingTable,
  uploadAllData,
  downloadAllData,
};
