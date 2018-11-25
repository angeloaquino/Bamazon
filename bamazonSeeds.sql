DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
item_id INTEGER NOT NULL AUTO_INCREMENT,
product_name VARCHAR(100) NULL,
department_name VARCHAR(100) NULL,
price DECIMAL(10,2) NULL,
stock_quantity INT NULL,
PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("eggs", "dairy", 3.99, 100), ("milk", "dairy", 4.00, 500), ("apples", "produce", 0.50, 300), ("oranges", "produce", 0.75, 200), ("chicken", "meat", 1.99, 50), ("pork", "meat", 3.00, 50), ("beef", "meat", 4.00, 50),("paper towels", "supply", 1.50, 300), ("paper plates", "supply", 5.00, 100), ("paper cups", "supply", 2.00, 50);
