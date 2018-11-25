var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",

  port: 3306,

  user: "root",

  password: "",
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) throw err;
});


//when application is run, it will display all the items for sale (id, name, and price)
function listProducts() {
	query = 'SELECT * FROM products';

	connection.query(query, function(err, results) {
		if (err) throw err;
		var product = '';
		for (var i = 0; i < results.length; i++) {
			product = '';
			product += 'ID: ' + results[i].item_id + ' | ';
			product += 'Item: ' + results[i].product_name.toUpperCase() + ' | ';
			product += 'Department: ' + results[i].department_name.toUpperCase() + ' | ';
			product += 'Price: $' + results[i].price + '\n';

			console.log(product);
		}
	  	storeFront();
	})
}
//use inquirer to promt users to select the ID of the product they want to buy
//do a second prompt of how many quantities



//use input to compare the quantity with DB quantity 
//make an if else statement if not enough, "Insufficient quality" and stop the order
//if enough product then update database with new total
//then output the total cost to CUSTOMER

function runBamazon() {

	listProducts();
}


function storeFront() {

	inquirer.prompt([
		{
			type: 'input',
			name: 'item_id',
			message: 'What would you like to buy, use the Item ID please. ',
			filter: Number
		},
		{
			type: 'input',
			name: 'quantity',
			message: 'How many?',
			filter: Number
		}
	]).then(function(input) {

		var item = input.item_id;
		var quantity = input.quantity;

		var query = 'SELECT * FROM products WHERE ?';

		connection.query(query, {item_id: item}, function(err, data) {
			if (err) throw err;

			if (data.length === 0) {
				console.log('We dont have that item, select an Item using the ID');
				listProducts();

			} else {
				var productData = data[0];

				if (quantity <= productData.stock_quantity) {

					var updateQuery = 'UPDATE products SET stock_quantity = ' + (productData.stock_quantity - quantity) + ' WHERE item_id = ' + item;

					connection.query(updateQuery, function(err, data) {
						if (err) throw err;

						console.log('Your total is $' + productData.price * quantity);


						connection.end();
					})
				} else {
					console.log('Sorry, we ran out of that item.');

					listProducts();
				}
			}
		})
	})
}

runBamazon();