//var fs = require('fs');



module.exports.get = function (store, callback, callbackError) {
    store.dispatch({
        type: "TASK_FETCH_REQUESTED",
    })
    var data = require('../data.json')
    callback(data);
}


module.exports.post = function (store, callback, callbackError) {
    store.dispatch({
        type: "TASK_POST_REQUESTED",
    })

    //fs.writeFile("../data.json",store.getState().todo)
}