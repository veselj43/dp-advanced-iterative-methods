import idb from 'idb';

export default class DBManager {
    constructor(dbName, version, onUpgradeNeeded) {
        this._dbName = dbName;
        this._version = version;
        this._onUpgradeNeeded = onUpgradeNeeded;
        this.initDB();

        this.setDefaultRejectFn(function(e) {
            console.log("[DB] error", e);
            return null;
        });
    }

    initDB() {
        this._dbPromise = idb.open(this._dbName, this._version, this._onUpgradeNeeded);
    }

    setDefaultRejectFn(rejectFn) {
        this._defaultRejectFn = rejectFn;
    }

    query(resolveFn, rejectFn) {
        if (!rejectFn) rejectFn = this._defaultRejectFn;
        return this._dbPromise.then(resolveFn, rejectFn);
    }

    getStore(dbTable, mode) {
        return this.query(function(db) {
            return db.transaction(dbTable, mode).objectStore(dbTable);
        });
    }

    get(dbTable, byIndex, value) {
        return this.getStore(dbTable).then(function(store) {
            var index = byIndex ? store.index(byIndex) : store;
            return index.get(value);
        });
    }

    getAll(dbTable, byIndex, value) {
        return this.getStore(dbTable).then(function(store) {
            var index = byIndex ? store.index(byIndex) : store;
            return index.getAll(value);
        });
    }

    remove(dbTable, value) {
        return this.getStore(dbTable, 'readwrite').then(function(store) {
            store.openCursor(value).then(function(cursor) {
                if (!cursor) return false;
                return cursor.delete().then(function() {
                    return true;
                }, function(err) {
                    console.log("[DB] record remove error", err);
                    return false;
                });
            });
        });
    }

    deleteDB() {
        idb.delete(this._dbName).then(function() {
            console.log("[DB] deleted");
            this.initDB();
        }, function() {
            console.log("[DB] delete error");
        });
    }
}
