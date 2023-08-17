import mysql from "mysql2";

export const db =  mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"Oyebanjo87.com",
    database:"social"
})

db.connect(function (err) {
    if (err) {
        console.log('Error connecting to Database',err);
        return;
    }
    console.log('Connection established')
})