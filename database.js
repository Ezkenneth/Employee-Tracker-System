const mysql=require("mysql");

class Database {
    constructor(config) {
        this.connection = mysql.createConnection(config);
    }
    query(sql, args){
        return new Promise ((resolve, reject) => {
            this.connection.query(sql, args, (error, rows) => {
                if (error) {
                    console.log(error.sql)
                    reject(error)
                } else {
                    resolve(rows)
                }
            })
        })
    }
    close () {
        return new Promise ((resolve, reject) => {
            this.connection.end(error => {
                if (error) {
                    reject(error)
                } else {
                    resolve();
                }
            })
        })
    }
};

module.exports = Database


