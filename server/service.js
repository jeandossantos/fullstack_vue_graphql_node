const database = require('./database');

exports.getItemsByType = function (type) {
        return database.execute({
            text: "select * from item where type = $1",
            values: [type]
        });
    }

exports.getItems = function () {
    return database.execute("select * from item");
}

exports.saveItem = function (item) {
    return database.execute({
        text: "insert into item (type, description) values($1, $2) returning *",
        values: [item.type, item.description]
    });
}

exports.removeItem = function (id) {
    return database.execute({
        text: "delete from item where id = $1",
        values: [id]
    });
}
