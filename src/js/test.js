const mysql = require("mysql2");
const express = require("express");
var app = express();
var multer = require("multer");
const bodyparser = require("body-parser");

let cors = require("cors");
app.use(cors());
app.use(bodyparser.json());

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    console.log(file);
    cb(null, file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/png"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

var upload = multer({ storage: storage });

app.post("/uploadForm", upload.single("myImg"), (req, res, next) => {
  if (req.file) {
    const pathName = req.file.path;
    res.send(req.file.pathName);
  }
});

var mysqlConnection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "rms",
  multipleStatements: true,
});

mysqlConnection.connect((err) => {
  if (!err) console.log("DB connection succeded.");
  else
    console.log(
      "DB connection failed \n Error : " + JSON.stringify(err, undefined, 2)
    );
});

app.listen(3000, () =>
  console.log("Express server is running at port no : 3000")
);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/customers", (req, res) => {
  mysqlConnection.query("SELECT * FROM customer", (err, rows, fields) => {
    if (!err) res.send(rows);
    else console.log(err);
  });
});

app.get("/sales", (req, res) => {
  mysqlConnection.query("SELECT YEAR(bill_date) as SalesYear, MONTH(bill_date) as SalesMonth, Day(bill_date) as SalesDay, SUM(amount) AS TotalSales FROM bills GROUP BY YEAR(bill_date), MONTH(bill_date), Day(bill_date) ORDER BY YEAR(bill_date), MONTH(bill_date), Day(bill_date)", (err, rows, fields) => {
    if (!err) res.send(rows);
    else console.log(err);
  });
});

//Get an employees
app.get("/customer/:id", (req, res) => {
  mysqlConnection.query(
    "SELECT * FROM customer WHERE cus_id = ?",
    [req.params.id],
    (err, rows, fields) => {
      if (!err) res.send(rows);
      else console.log(err);
    }
  );
});

//Delete an employees
app.post("/customerdelete", (req, res) => {
  let cus = req.body.customer;
  mysqlConnection.query(
    "DELETE FROM customer WHERE cus_id = " + cus.cus_id,
    (err, rows, fields) => {
      if (!err) res.send("Deleted successfully.");
      else console.log(err);
    }
  );
});

app.post("/customerupdate", (req, res) => {
  let cus = req.body.customer;
  mysqlConnection.query(
    "update customer set cus_name= '" +
      cus.cus_name +
      "' , cus_no = " +
      cus.cus_no +
      ", cus_email='" +
      cus.cus_email +
      "' where cus_id = " +
      cus.cus_id +
      ";",
    (err, rows, fields) => {
      if (!err) res.send("success");
      else res.send(err);
    }
  );
});

app.post("/customerinsert", (req, res) => {
  console.log(req);
  let cus = req.body.customer;
  console.log(cus);
  mysqlConnection.query(
    "insert into customer(cus_name,cus_no,cus_email) values('" +
      cus.cus_name +
      "','" +
      cus.cus_no +
      "','" +
      cus.cus_email +
      "');",
    (err, rows, fields) => {
      if (!err) res.send("Inserted successfully");
      else console.log(err);
    }
  );
});

app.get("/employees", (req, res) => {
  mysqlConnection.query("SELECT * FROM employee", (err, rows, fields) => {
    if (!err) res.send(rows);
    else console.log(err);
  });
});

//Get an employees
app.get("/employee/:id", (req, res) => {
  mysqlConnection.query(
    "SELECT * FROM employee WHERE emp_id = ?",
    [req.params.id],
    (err, rows, fields) => {
      if (!err) res.send(rows);
      else console.log(err);
    }
  );
});

//Delete an employees
app.post("/employeedelete", (req, res) => {
  let emp = req.body.employee;
  mysqlConnection.query(
    "DELETE FROM employee WHERE emp_id = " + emp.emp_id,
    (err, rows, fields) => {
      if (!err) res.send("Deleted successfully.");
      else console.log(err);
    }
  );
});

app.post("/employeeupdate", (req, res) => {
  let emp = req.body.employee;
  mysqlConnection.query(
    "update employee set emp_name= '" +
      emp.emp_name +
      "' , emp_add = '" +
      emp.emp_add +
      "', role_id='" +
      emp.role_id +
      "', emp_no=" +
      emp.emp_no +
      ", emp_email='" +
      emp.emp_email +
      "',status='" +
      emp.status +
      "' where emp_id = " +
      emp.emp_id +
      ";",
    (err, rows, fields) => {
      if (!err) res.send("Updated successfully");
      else console.log(err);
    }
  );
});

app.post("/employeeinsert", (req, res) => {
  console.log(req);
  let emp = req.body.employee;
  mysqlConnection.query(
    "insert into employee(emp_name,emp_add,role_id,emp_no,emp_email,status) values('" +
      emp.emp_name +
      "','" +
      emp.emp_add +
      "'," +
      emp.role_id +
      "," +
      emp.emp_no +
      ",'" +
      emp.emp_email +
      "','" +
      emp.status +
      "');",
    (err, rows, fields) => {
      if (!err) res.send("Inserted successfully");
      else console.log(err);
    }
  );
});

app.get("/bills", (req, res) => {
  mysqlConnection.query("SELECT * FROM bills", (err, rows, fields) => {
    if (!err) res.send(rows);
    else console.log(err);
  });
});

//Get a bill
app.get("/bill/:id", (req, res) => {
  mysqlConnection.query(
    "SELECT * FROM bills b, employee e, customer c, menu m, food_sub_order f WHERE bill_id = ? and m.menu_id = f.food_id and b.waiter_id = e.emp_id and c.cus_id=b.cus_id and b.order_id = f.order_id",
    [req.params.id],
    (err, rows, fields) => {
      if (!err) res.send(rows);
      else console.log(err);
    }
  );
});

//Delete a bill

app.post("/billdelete", (req, res) => {
  let bill = req.body.bill;
  console.log(bill);
  mysqlConnection.query(
    "DELETE FROM bills WHERE bill_id = " + bill.bill_id,
    (err, rows, fields) => {
      if (!err) res.send("Deleted successfully.");
      else console.log(err);
    }
  );
});

app.post("/billupdate", (req, res) => {
  let bill = req.body.bill;
  console.log(bill);
  mysqlConnection.query(
    "update bills set cus_id= '" +
      bill.cus_id +
      "' , waiter_id = " +
      bill.waiter_id +
      ", bill_date='" +
      bill.bill_date +
      "', order_id=" +
      bill.order_id +
      ", table_id = " +
      bill.table_id +
      " , amount = " +
      bill.amount +
      " where bill_id = " +
      bill.bill_id +
      ";",
    (err, rows, fields) => {
      if (!err) res.send("Updated successfully");
      else console.log(err);
    }
  );
});

app.post("/billinsert", (req, res) => {
  console.log(req);
  let bill = req.body.bill;
  console.log(bill);
  mysqlConnection.query(
    "insert into bills(cus_id,waiter_id,bill_date, order_id, table_id, amount) values(" +
      bill.cus_id +
      "," +
      bill.waiter_id +
      ",'" +
      bill.bill_date +
      "'," +
      bill.order_id +
      "," +
      bill.table_id +
      "," +
      bill.amount +
      ");",
    (err, rows, fields) => {
      if (!err) res.send("Inserted successfully");
      else console.log(err);
    }
  );
});

app.get("/cuisines", (req, res) => {
  mysqlConnection.query("SELECT * FROM cuisine", (err, rows, fields) => {
    if (!err) res.send(rows);
    else console.log(err);
  });
});

//Get an employees
app.get("/cuisine/:id", (req, res) => {
  mysqlConnection.query(
    "SELECT * FROM cuisine WHERE cuisine_id = ?",
    [req.params.id],
    (err, rows, fields) => {
      if (!err) res.send(rows);
      else console.log(err);
    }
  );
});

//Delete an employees
app.post("/cuisinedelete", (req, res) => {
  let cus = req.body.cuisine;
  mysqlConnection.query(
    "DELETE FROM cuisine WHERE cuisine_id = " + cus.cuisine_id,
    (err, rows, fields) => {
      if (!err) res.send("Deleted successfully.");
      else console.log(err);
    }
  );
});

app.post("/cuisineupdate", (req, res) => {
  let cus = req.body.cuisine;
  mysqlConnection.query(
    "update cuisine set cuisine_name= '" +
      cus.cuisine_name +
      "' where cuisine_id = " +
      cus.cuisine_id +
      ";",
    (err, rows, fields) => {
      if (!err) res.send("Updated successfully");
      else console.log(err);
    }
  );
});

////cuisine_id	cuisine_name
app.post("/cuisineinsert", (req, res) => {
  console.log(req);
  let cus = req.body.cuisine;
  console.log(cus);
  mysqlConnection.query(
    "insert into cuisine(cuisine_name) values('" + cus.cuisine_name + "');",
    (err, rows, fields) => {
      if (!err) res.send("Inserted successfully");
      else console.log(err);
    }
  );
});

app.get("/food_des", (req, res) => {
  mysqlConnection.query("SELECT * FROM food_des", (err, rows, fields) => {
    if (!err) res.send(rows);
    else console.log(err);
  });
});

//Get an employees s_no	food_id	item_id	item_name
app.get("/food_des/:id", (req, res) => {
  mysqlConnection.query(
    "SELECT * FROM food_des WHERE food_id = ?",
    [req.params.id],
    (err, rows, fields) => {
      if (!err) res.send(rows);
      else console.log(err);
    }
  );
});

//Delete an employees
app.post("/food_desdelete", (req, res) => {
  let food = req.body.food_des;
  mysqlConnection.query(
    "DELETE FROM food_des WHERE food_id = " + food.food_des,
    (err, rows, fields) => {
      if (!err) res.send("Deleted successfully.");
      else console.log(err);
    }
  );
});

//s_no	food_id	item_id	item_name
app.post("/food_desupdate", (req, res) => {
  let food = req.body.food_des;
  mysqlConnection.query(
    "update food_des set item_id = " +
      food.item_id +
      "item_name= '" +
      food.item_name +
      "' where s_no = " +
      food.s_no +
      ";",
    (err, rows, fields) => {
      if (!err) res.send("Updated successfully");
      else console.log(err);
    }
  );
});

app.post("/food_desinsert", (req, res) => {
  console.log(req);
  let cus = req.body.customer;
  console.log(cus);
  mysqlConnection.query(
    "insert into customer(cus_name,cus_no,cus_email) values('" +
      cus.cus_name +
      "','" +
      cus.cus_no +
      "','" +
      cus.cus_no +
      "');",
    (err, rows, fields) => {
      if (!err) res.send("Inserted successfully");
      else console.log(err);
    }
  );
});

app.get("/food_order", (req, res) => {
  mysqlConnection.query("SELECT * FROM food_order", (err, rows, fields) => {
    if (!err) res.send(rows);
    else console.log(err);
  });
});

//Get an employees
app.get("/food_order/:id", (req, res) => {
  mysqlConnection.query(
    "SELECT * FROM food_order WHERE order_id = ?",
    [req.params.id],
    (err, rows, fields) => {
      if (!err) res.send(rows);
      else console.log(err);
    }
  );
});

//Delete an employees
app.post("/food_orderdelete", (req, res) => {
  let order = req.body.food_order;
  mysqlConnection.query(
    "DELETE FROM food_order WHERE order_id = " + order.order_id,
    (err, rows, fields) => {
      if (!err) res.send("Deleted successfully.");
      else console.log(err);
    }
  );
});

//order_id	food_id	price	waiter_id	status	order_time	cus_id	table_id
app.post("/food_orderupdate", (req, res) => {
  let order = req.body.food_order;
  mysqlConnection.query(
    "update food_order set food_id= " +
      order.food_id +
      " , price = " +
      order.price +
      ", waiter_id=" +
      order.waiter_id +
      ", status '=" +
      order.status +
      "',order_time='" +
      order.order_time +
      "',cus_id=" +
      order.cus_id +
      ",table_id=" +
      order.table_id +
      " where cus_id = " +
      cus.cus_id +
      ";",
    (err, rows, fields) => {
      if (!err) res.send("Updated successfully");
      else console.log(err);
    }
  );
});

app.post("/food_orderinsert", (req, res) => {
  let order = req.body.food_order;
  console.log(cus);
  mysqlConnection.query(
    "insert into food_order(food_id, price, waiter_id, status, order_time, cus_id ,table_id) values(" +
      order.food_id +
      "," +
      order.price +
      "," +
      order.waiter_id +
      ",'" +
      order.status +
      "','" +
      order.order_time +
      "'," +
      order.cus_id +
      "," +
      order.table_id +
      ");",
    (err, rows, fields) => {
      if (!err) res.send("Inserted successfully");
      else console.log(err);
    }
  );
});

app.get("/logins", (req, res) => {
  mysqlConnection.query("SELECT * FROM login", (err, rows, fields) => {
    if (!err) res.send(rows);
    else console.log(err);
  });
});

//Get an employees
app.get("/login/:id", (req, res) => {
  mysqlConnection.query(
    "SELECT * FROM login WHERE usr_name = ?",
    [req.params.id],
    (err, rows, fields) => {
      if (!err) res.send(rows);
      else console.log(err);
    }
  );
});

//Delete an employees
app.post("/logindelete", (req, res) => {
  let login = req.body.login;
  mysqlConnection.query(
    "DELETE FROM login WHERE usr_name = " + login.usr_name,
    (err, rows, fields) => {
      if (!err) res.send("Deleted successfully.");
      else console.log(err);
    }
  );
});

app.post("/loginupdate", (req, res) => {
  let login = req.body.login;
  mysqlConnection.query(
    "update login set pswd= '" +
      login.pswd +
      "' , role_id = " +
      login.role_id +
      ", status='" +
      login.status +
      "' where usr_name = " +
      login.usr_name +
      ";",
    (err, rows, fields) => {
      if (!err) res.send("Updated successfully");
      else console.log(err);
    }
  );
});

//usr_name	pswd	role_id	status
app.post("/logininsert", (req, res) => {
  let login = req.body.login;
  mysqlConnection.query(
    "insert into login(usr_name,pswd,role_id,status) values('" +
      login.usr_name +
      "','" +
      login.pswd +
      "'," +
      login.role_id +
      ",'" +
      login.status +
      "');",
    (err, rows, fields) => {
      if (!err) res.send("Inserted successfully");
      else console.log(err);
    }
  );
});

///************************** */

app.get("/table", (req, res) => {
  mysqlConnection.query("SELECT * FROM table_mng", (err, rows, fields) => {
    if (!err) res.send(rows);
    else console.log(err);
  });
});

app.get("/table/:id", (req, res) => {
  mysqlConnection.query(
    "SELECT * FROM table_mng WHERE table_id = ?",
    [req.params.id],
    (err, rows, fields) => {
      if (!err) res.send(rows);
      else console.log(err);
    }
  );
});

//Delete an employees
app.post("/tabledelete", (req, res) => {
  let table = req.body.id;
  mysqlConnection.query(
    "DELETE FROM table_mng WHERE table_id = " + table.id,
    (err, rows, fields) => {
      if (!err) res.send("Deleted successfully.");
      else console.log(err);
    }
  );
});

app.post("/tableupdate", (req, res) => {
  let table = req.body.table;
  console.log(table);
  mysqlConnection.query(
    "update table_mng set no_person= " +
      table.no_person +
      ", status = '" +
      table.status +
      "', waiter_id = " +
      table.waiter_id +
      ", OTP = " +
      table.otp +
      " where table_id = " +
      table.table_id +
      ";",
    (err, rows, fields) => {
      if (!err) res.send("Updated successfully");
      else console.log(err);
    }
  );
});

//usr_name	pswd	role_id	status
app.post("/tableinsert", (req, res) => {
  let table = req.body.table;
  mysqlConnection.query(
    "insert into table_mng(table_id,no_person,status,waiter_id,OTP) values(" +
      table.table_id +
      "," +
      table.no_person +
      ",'" +
      table.status +
      "'," +
      table.waiter_id +
      "," +
      table.otp +
      ");",
    (err, rows, fields) => {
      if (!err) res.send("Inserted successfully");
      else console.log(err);
    }
  );
});

//**************************************/

app.get("/suppliers", (req, res) => {
  mysqlConnection.query("SELECT * FROM supplier", (err, rows, fields) => {
    if (!err) res.send(rows);
    else console.log(err);
  });
});

//Get an employees
app.get("/supplier/:id", (req, res) => {
  mysqlConnection.query(
    "SELECT * FROM supplier WHERE sup_id = ?",
    [req.params.id],
    (err, rows, fields) => {
      if (!err) res.send(rows);
      else console.log(err);
    }
  );
});

//Delete an employees
app.post("/supplierdelete", (req, res) => {
  let sup = req.body.supplier;
  mysqlConnection.query(
    "DELETE FROM supplier WHERE sup_id = " + sup.sup_id,
    (err, rows, fields) => {
      if (!err) res.send("Deleted successfully.");
      else console.log(err);
    }
  );
});

app.post("/supplierupdate", (req, res) => {
  let sup = req.body.supplier;
  mysqlConnection.query(
    "update supplier set sup_name= '" +
      sup.sup_name +
      "' , sup_email = '" +
      sup.sup_email +
      "', sup_no=" +
      sup.sup_no +
      ",sup_add = '" +
      sup.sup_add +
      "' where sup_id = " +
      sup.sup_id +
      ";",
    (err, rows, fields) => {
      if (!err) res.send("success");
      else res.send(err);
    }
  );
});

//sup_id	sup_name	sup_email	sup_no	sup_add

app.post("/supplierinsert", (req, res) => {
  console.log(req);
  let sup = req.body.supplier;
  console.log(sup);
  mysqlConnection.query(
    "insert into supplier(sup_name,sup_email,sup_no,sup_add) values('" +
      sup.sup_name +
      "','" +
      sup.sup_email +
      "'," +
      sup.sup_no +
      ",'" +
      sup.sup_add +
      "');",
    (err, rows, fields) => {
      if (!err) res.send("Inserted successfully");
      else console.log(err);
    }
  );
});

/************************ */

app.get("/roles", (req, res) => {
  mysqlConnection.query("SELECT * FROM roles", (err, rows, fields) => {
    if (!err) res.send(rows);
    else console.log(err);
  });
});

//Get an employees
app.get("/role/:id", (req, res) => {
  mysqlConnection.query(
    "SELECT * FROM roles WHERE role_id = ?",
    [req.params.id],
    (err, rows, fields) => {
      if (!err) res.send(rows);
      else console.log(err);
    }
  );
});

//Delete an employees
app.post("/roledelete", (req, res) => {
  let role = req.body.role;
  mysqlConnection.query(
    "DELETE FROM roles WHERE role_id = " + role.role_id,
    (err, rows, fields) => {
      if (!err) res.send("Deleted successfully.");
      else console.log(err);
    }
  );
});

app.post("/roleupdate", (req, res) => {
  let role = req.body.role;
  mysqlConnection.query(
    "update roles set role_name= '" +
      role.role_name +
      "' where role_id = " +
      role.role_id +
      ";",
    (err, rows, fields) => {
      if (!err) res.send("success");
      else res.send(err);
    }
  );
});

//role_id role_name
app.post("/roleinsert", (req, res) => {
  console.log(req);
  let role = req.body.role;
  console.log(role);
  mysqlConnection.query(
    "insert into roles(role_name) values('" + role.role_name + "');",
    (err, rows, fields) => {
      if (!err) res.send("Inserted successfully");
      else console.log(err);
    }
  );
});

/************************ */
app.get("/menus", (req, res) => {
  mysqlConnection.query("SELECT * FROM menu", (err, rows, fields) => {
    if (!err) res.send(rows);
    else console.log(err);
  });
});

//Get an employees
app.get("/menu/:id", (req, res) => {
  mysqlConnection.query(
    "SELECT * FROM menu WHERE menu_id = ?",
    [req.params.id],
    (err, rows, fields) => {
      if (!err) res.send(rows);
      else console.log(err);
    }
  );
});

//Delete an employees
app.post("/menudelete", (req, res) => {
  let menu = req.body.menu;
  mysqlConnection.query(
    "DELETE FROM menu WHERE menu_id = " + menu.menu_id,
    (err, rows, fields) => {
      if (!err) res.send("Deleted successfully.");
      else console.log(err);
    }
  );
});

//menu_id image price name food_des food_type cuisine_id status
app.post("/menuupdate", (req, res) => {
  let menu = req.body.menu;
  mysqlConnection.query(
    "update menu set image= '" +
      menu.image +
      "', price=" +
      menu.price +
      "name='" +
      menu.name +
      "', food_des='" +
      menu.food_des +
      "',food_type='" +
      menu.food_type +
      "',cuisine_id=" +
      menu.cuisine_id +
      ",status ='" +
      menu.status +
      " where role_id = " +
      menu.menu_id +
      ";",
    (err, rows, fields) => {
      if (!err) res.send("success");
      else res.send(err);
    }
  );
});







//role_id role_name
app.post("/menuinsert", (req, res) => {
  console.log(req);
  let menu = req.body.menu;
  console.log(role);
  mysqlConnection.query(
    "insert into menu(menu_id, image, price, name, food_des, food_type, cuisine_id, status) values('" +
      menu.menu_id +
      ",'" +
      menu.image +
      "'," +
      menu.price +
      ",'" +
      menu.name +
      "','" +
      menu.food_des +
      "','" +
      menu.food_type +
      "'," +
      menu.cuisine_id +
      ",'" +
      menu.status +
      "');",
    (err, rows, fields) => {
      if (!err) res.send("Inserted successfully");
      else console.log(err);
    }
  );
});

/************************ */
app.get("/inv", (req, res) => {
  mysqlConnection.query("SELECT * FROM inventory", (err, rows, fields) => {
    if (!err) res.send(rows);
    else console.log(err);
  });
});

app.get("/invs/:id", (req, res) => {
  mysqlConnection.query(
    "SELECT * FROM inventory WHERE item_id = ?",
    [req.params.id],
    (err, rows, fields) => {
      if (!err) res.send(rows);
      else console.log(err);
    }
  );
});

//Delete an employees
app.post("/invdelete", (req, res) => {
  let inv = req.body.inventory;
  mysqlConnection.query(
    "DELETE FROM inventory WHERE item_id = " + inv.item_id,
    (err, rows, fields) => {
      if (!err) res.send("Deleted successfully.");
      else console.log(err);
    }
  );
});

//item_id	sup_id	item_name	item_des	current_stk	monthly_consuption	ordering_cost	stock_mang_cost	product_per_unit	eco_odr_qnty	reorder_level	saftey_stk	lot_size	no_of_unt	product_price	load_time
app.post("/invupdate", (req, res) => {
  let inv = req.body.inventory;
  mysqlConnection.query(
    "update inventory set sup_id=" +
      inv.sup_id +
      ",item_name='" +
      inv.item_name +
      "',item_des='" +
      inv.item_des +
      "',current_stk=" +
      inv.current_stk +
      ",monthly_consuption=" +
      inv.monthly_consuption +
      ",ordering_cost=" +
      inv.ordering_cost +
      ",stock_mang_cost=" +
      inv.stock_mang_cost +
      ",product_per_unit=" +
      inv.product_per_unit +
      ",reorder_level=" +
      inv.re_order +
      ",saftey_stk=" +
      inv.safty_stk +
      ",lot_size=" +
      inv.lot_size +
      ",no_of_unt=" +
      inv.no_of_unt +
      ",product_price=" +
      inv.product_price +
      ",load_time= " +
      inv.load_time +
      " where item_id = " +
      inv.item_id +
      ";",
    (err, rows, fields) => {
      if (!err) res.send("success");
      else res.send(err);
    }
  );
});

//sup_id	item_name	item_des	current_stk	monthly_consuption	ordering_cost	stock_mang_cost	product_per_unit	reorder_level	saftey_stk	lot_size	no_of_unt	product_price	load_time
app.post("/invinsert", (req, res) => {
  // console.log(req);
  let inv = req.body.inventory;
  console.log(inv);
  mysqlConnection.query(
    "insert into inventory(sup_id,item_name,item_des,current_stk,monthly_consuption,ordering_cost,stock_mang_cost ,product_per_unit,reorder_level,saftey_stk,lot_size,no_of_unt,product_price,load_time) values(" +
      inv.sup_id +
      ",'" +
      inv.item_name +
      "','" +
      inv.item_des +
      "'," +
      inv.current_stk +
      "," +
      inv.monthly_consuption +
      "," +
      inv.ordering_cost +
      "," +
      inv.stock_mang_cost +
      "," +
      inv.product_per_unit +
      "," +
      inv.re_order +
      "," +
      inv.safty_stk +
      "," +
      inv.lot_size +
      "," +
      inv.no_of_unt +
      "," +
      inv.product_price +
      "," +
      inv.load_time +
      ");",
    (err, rows, fields) => {
      if (!err) {
        console.log(inv);
        res.send("Inserted successfully");
      } else {
        console.log(inv);
        console.log(err);
      }
    }
  );
});

/************************ */
app.get("/food_sub_order", (req, res) => {
  mysqlConnection.query("SELECT * FROM food_sub_order", (err, rows, fields) => {
    if (!err) res.send(rows);
    else console.log(err);
  });
});

app.get("/food_sub_orders/:id", (req, res) => {
  mysqlConnection.query(
    "SELECT * FROM food_sub_order WHERE sub_order_id = ?",
    [req.params.id],
    (err, rows, fields) => {
      if (!err) res.send(rows);
      else console.log(err);
    }
  );
});

app.post("/food_sub_ordersdelete", (req, res) => {
  let sub = req.body.sub_order;
  mysqlConnection.query(
    "DELETE FROM food_sub_order WHERE sub_order_id = " + sub.sub_order_id,
    (err, rows, fields) => {
      if (!err) res.send("Deleted successfully.");
      else console.log(err);
    }  );
});

app.post("/food_sub_ordersupdate", (req, res) => {
  let sub = req.body.sub_order_id;
  mysqlConnection.query(
    "update sub_order_id set order_id= '" +
      sub.order_id +
      "', food_id=" +
      sub.food_id +
      "', price=" +
      sub.price +
      " where role_id = " +
      sub.sub_order_id +
      ";",
    (err, rows, fields) => {
      if (!err) res.send("success");
      else res.send(err);
    }
  );
});

//sub_order_id	order_id	food_id	price

app.post("/food_sub_ordersinsert", (req, res) => {
  console.log(req);
  let sub = req.body.sub_order_id;
  console.log(role);
  mysqlConnection.query(
    "insert into sub_order_id(order_id,food_id,price) values(" +
      sub.order_id +
      "," +
      sub.food_id +
      "," +
      sub.price +
      ";",
    (err, rows, fields) => {
      if (!err) res.send("Inserted successfully");
      else console.log(err);
    }
  );
});
