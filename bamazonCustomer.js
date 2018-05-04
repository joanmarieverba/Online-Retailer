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
    connection.query("SELECT * FROM products", function (err, result) {
        if (err) throw err;
        for (var i = 0; i < result.length; i++) {
            console.log(
                "ID: " +
                result[i].item_id +
                " || Product Name: " +
                result[i].product_name +
                " || Price: " +
                result[i].price
            );
        }
        userPurchase();
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
            console.log("ID, quantity wanted ", answer.productID, answer.quantity);
            let query = "SELECT item_id, price, stock_quantity FROM products WHERE ?";
            connection.query(query, { item_id: answer.productID }, function (err, result) {
                if (err) throw err;
                console.log(result[0].item_id, result[0].price, result[0].stock_quantity);
                if (answer.quantity > result[0].stock_quantity) {
                    console.log("Insufficient stock in inventory.")
                } else {
                    let costOfPurchase = (result[0].price * answer.quantity).toFixed(2);
                    console.log("The total of your purchase is $", costOfPurchase);
                //update database
                    let newTotal = result[0].stock_quantity - answer.quantity;
                    connection.query("UPDATE products SET ? WHERE ?", [{ stock_quantity: newTotal }, { item_id: answer.productID }], function (error) {
                        if (error) throw err;
                        console.log("Database updated successfully!");
                    });
                //check to see whether database has been updated
                    query = "SELECT item_id, price, stock_quantity FROM products WHERE ?";
                    connection.query(query, { item_id: answer.productID }, function (err, result) {
                        if (err) throw err;
                        console.log(result[0].item_id, result[0].price, result[0].stock_quantity);
                    });

                }
            });
        });
};

//connection.end();
  




