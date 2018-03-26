import idb from 'idb';
import zango from 'zangodb';

export default class DBManager {
    constructor(dbName, dbSchema, version, onUpgradeNeeded) {
        this._dbName = dbName;
        this._version = version;
        this._onUpgradeNeeded = onUpgradeNeeded;
        this.initDB(dbSchema);
    }

    initDB(dbSchema) {
        this._db = new zango.Db(this._dbName, dbSchema);
    }

    getDb() {
        return this._db;
    }

    getStore(dbTable) {
        return this._db.collection(dbTable);
    }

    get(dbTable, key, value) {
        return this.getStore(dbTable)
            .findOne({ key: value })
            .then(result => {
                return result;
            });
    }

    getAll(dbTable, findObj) {
        return this.getStore(dbTable)
            .find(findObj)
            .toArray((error, docs) => {
                if (error) { throw error; }
            });
    }

    insert(dbTable, data) {
        return this.getStore(dbTable)
            .insert(data, (error) => {
                if (error) { throw error; }
            });
    }

    remove(dbTable, findObj) {
        if (Number.isInteger(findObj)) findObj = {_id: findObj};

        return this.getStore(dbTable)
            .remove(findObj, (error) => {
                if (error) { throw error; }
            });
    }

    deleteDB() {
        this._db.drop((error) => {
            console.log("[DB] delete", error);
        });
        
        // until IndexedDB.deleteDatabase() is fixed
        window.location.reload();
    }
}
