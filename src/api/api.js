//var fs = require('fs');



module.exports.get = function (store, callback, callbackError) {
    var data = require('../../data.json')
    callback(data);
}


module.exports.post = function (store, callback, callbackError) {

    //fs.writeFile("../data.json",store.getState().todo)
}