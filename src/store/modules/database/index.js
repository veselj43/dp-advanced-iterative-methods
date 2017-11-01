if (!window.indexedDB) {
    window.alert("Your browser doesn't support a stable version of IndexedDB. Such and such feature will not be available.");
}

var db;
var request = indexedDB.open("MyTestDatabase", 3);

request.onerror = function(event) {
    alert("Why didn't you allow my web app to use IndexedDB?!");
};

request.onupgradeneeded = function() {
    // The database did not previously exist, so create object stores and indexes.
    console.log("[DB] creating database");

    var db = request.result;

    var store = db.createObjectStore("computingHistory", {keyPath: "id", autoIncrement: true});

    var methodIndex = store.createIndex("by_method", "method", {unique: false});
    var problemIndex = store.createIndex("by_problem", "problem", {unique: false});

    // Populate with initial data.
    store.put({id: 0, method: 'tabu', problem: 0, params: {} });
};

request.onsuccess = function(event) {
    db = request.result;
    console.log("[DB] request succeeded");

    var store = db.transaction("computingHistory").objectStore("computingHistory");
    var activities = null;
    var query = store.getAll(0, 10);
    query.onsuccess = (event) => {
        activities = event.target.result;
        console.log(activities);
    };
};

// initial state
const state = {}

// getters
const getters = {}

// mutations
const mutations = {}

// actions
const actions = {}

// modules
const modules = {}

export default {
    state,
    getters,
    mutations,
    actions,
    modules
}
