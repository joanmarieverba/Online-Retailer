let mysql = require("mysql");
let inquirer = require("inquirer");

let connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "loremipsum",
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;
    display();
});

function display() {
    connection.query("SELECT * FROM mytable", function (err, result) {
        if (err) throw err;
        console.log(result);
        connection.end();
    });
};

function userPurchase() {
    inquirer
        .prompt([
            {
            name: "productID",
            type: "input",
            message: "What is the ID of the product you want to buy?",
            }, 
            {
            name: "quantity",
            type: "input",
            message: "How many do you want?"
            }
        ])
        .then(function (answer) {
                console.log("reached answer ");
        });
};


            // var query = "SELECT position, song, year FROM top5000 WHERE ?";
            // connection.query(query, { artist: answer.artist }, function (err, res) {
            //     for (var i = 0; i < res.length; i++) {
            //         console.log("Position: " + res[i].position + " || Song: " + res[i].song + " || Year: " + res[i].year);
            //     }


