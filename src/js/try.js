App = {
  getcustomer: function () {
    var b = "";
    const api_url = "http://localhost:3000/customers";
    // console.log(api_url);
    Customer_BTable.innerHTML = b;
    data = this.getapi(api_url).then((data) => {
      // console.log("y");
      for (var i = 0; i <= data.length; i++) {
        var a =
          "<tr><td scope='row'>" +
          data[i].cus_id +
          "</td><td  scope='row'>" +
          data[i].cus_name +
          "</td><td  scope='row'>" +
          data[i].cus_no +
          "</td><td  scope='row'>" +
          data[i].cus_email +
          "</td><td  scope='row'><span class='material-icons' onclick='display(" +
          data[i].cus_id +
          ")'>edit</span></td>" +
          "<td  scope='row'><span class='material-icons' onclick='remove(" +
          data[i].cus_id +
          ")'>delete</span></td></tr>";
        // console.log(data[i]);
        Customer_BTable.innerHTML += a;
      }
      // console.log("a")
    });
  },

  getpatcustomer: function (i) {
    var x = document.getElementById("changeRecordForm");
    const api_url = "http://localhost:3000/customer/" + i;
    // console.log(api_url);
    data = this.getapi(api_url).then((data) => {
      (x.elements[0].value = data[0].cus_id),
        (x.elements[1].value = data[0].cus_name),
        (x.elements[2].value = data[0].cus_no),
        (x.elements[3].value = data[0].cus_email);
      $("#changedata").modal();
    });
  },

  postcustomer: function () {
    var xhr = new XMLHttpRequest();
    var dta = JSON.stringify({
      customer: {
        cus_name: document.getElementById("cus_name").value,
        cus_no: document.getElementById("cus_no").value,
        cus_email: document.getElementById("cus_email").value,
      },
    });
    xhr.open("POST", "http://localhost:3000/customerinsert", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    console.log(dta);
    xhr.send(dta);
    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4) {
        App.getcustomer();
      }
    };
    $("#changedata").trigger("reset");
  },

  postupcustomer: function () {
    var xhr = new XMLHttpRequest();
    var dta = JSON.stringify({
      customer: {
        cus_id: document.getElementById("rcus_id").value,
        cus_name: document.getElementById("rcus_name").value,
        cus_no: document.getElementById("rcus_no").value,
        cus_email: document.getElementById("rcus_email").value,
      },
    });
    xhr.open("POST", "http://localhost:3000/customerupdate", true);
    xhr.responseType = "text";
    xhr.setRequestHeader("Content-Type", "application/json");
    console.log(dta);
    xhr.send(dta);
    // var a = xhr.response();
    // console.log(a);
    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4) {
        App.getcustomer();
      }
    };
    $("#changedata").trigger("reset");
    // if(a=="success")
    // {
    //     this.getcustomer();
    // }
  },

  rem_customer: function (i) {
    var xhr = new XMLHttpRequest();
    var dta = JSON.stringify({
      customer: {
        cus_id: i,
      },
    });
    xhr.open("POST", "http://localhost:3000/customerdelete", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    // console.log(dta);
    xhr.send(dta);
    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4) {
        App.getcustomer();
      }
    };
    // xhr.open("Get", "http://localhost:3000/customerdelete/"+i, true);
  },

  getemployee: function () {
    const api_url = "http://localhost:3000/employees";
    // console.log(api_url);
    data = this.getapi(api_url).then((data) => {
      for (var i = 0; i <= data.length; i++) {
        var a =
          "<tr><td>" +
          data[i].emp_id +
          "</td><td>" +
          data[i].emp_name +
          "</td><td>" +
          data[i].emp_add +
          "</td><td>" +
          data[i].role_id +
          "</td><td>" +
          data[i].emp_no +
          "</td><td>" +
          data[i].emp_email +
          "</td><td>" +
          data[i].status +
          "</td><td><span class='material-icons' onclick='display(" +
          data[i].emp_id +
          ")'>edit</span></td>" +
          "<td><span class='material-icons' onclick='remove(" +
          data[i].emp_id +
          ")'>delete</span></td></tr>";

        Customer_BTable.innerHTML += a;
        console.log(data[0]);
      }
    });
  },

  getpatemp: function (i) {
    var x = document.getElementById("changeRecordForm");
    const api_url = "http://localhost:3000/employee/" + i;
    // console.log(api_url);
    data = this.getapi(api_url).then((data) => {
      (x.elements[0].value = data[0].emp_id),
        (x.elements[1].value = data[0].emp_name),
        (x.elements[2].value = data[0].emp_add),
        (x.elements[3].value = data[0].role_id),
        (x.elements[4].value = data[0].emp_no),
        (x.elements[5].value = data[0].emp_email),
        (x.elements[6].value = data[0].status),
        $("#changedata").modal();
    });
  },

  //emp_id emp_name emp_add role_id emp_no emp_email status
  postemp: function () {
    var xhr = new XMLHttpRequest();
    var dta = JSON.stringify({
      employee: {
        emp_name: document.getElementById("emp_name").value,
        emp_add: document.getElementById("emp_add").value,
        role_id: document.getElementById("role_id").value,
        emp_no: document.getElementById("emp_no").value,
        emp_email: document.getElementById("emp_email").value,
        status: document.getElementById("status").value,
      },
    });
    xhr.open("POST", "http://localhost:3000/employeeinsert", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    console.log(dta);
    xhr.send(dta);
    console.log(data);
  },

  postupemp: function () {
    var xhr = new XMLHttpRequest();
    var dta = JSON.stringify({
      employee: {
        emp_id: document.getElementById("remp_id").value,
        emp_name: document.getElementById("remp_name").value,
        emp_add: document.getElementById("remp_add").value,
        role_id: document.getElementById("rrole_id").value,
        emp_no: document.getElementById("remp_no").value,
        emp_email: document.getElementById("remp_email").value,
        status: document.getElementById("rstatus").value,
      },
    });
    xhr.open("POST", "http://localhost:3000/employeeupdate", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    console.log(dta);
    xhr.send(dta);
  },

  rem_emp: function (i) {
    var xhr = new XMLHttpRequest();
    var dta = JSON.stringify({
      employee: {
        emp_id: i,
      },
    });
    xhr.open("POST", "http://localhost:3000/employeedelete", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(dta);
  },

  /***************************************** */

  gettable: function () {
    const api_url = "http://localhost:3000/table";
    // console.log(api_url);
    data = this.getapi(api_url).then((data) => {
      for (var i = 0; i <= data.length; i++) {
        var a =
          "<tr><td>" +
          data[i].table_id +
          "</td><td>" +
          data[i].no_person +
          "</td><td>" +
          data[i].status +
          
          "</td><td>" +
          data[i].waiter_id +
          "</td><td>" +
          data[i].OTP +
          "</td><td><span class='material-icons' onclick='display(" +
          data[i].table_id +
          ")'>edit</span></td>" +
          "<td><span class='material-icons' onclick='remove(" +
          data[i].table_id +
          ")'>delete</span></td></tr>";

        Customer_BTable.innerHTML += a;
        console.log(data[0]);
      }
    });
  },

  getwaittable: function () {
    const api_url = "http://localhost:3000/table";
    // console.log(api_url);
    data = this.getapi(api_url).then((data) => {
      for (var i = 0; i <= data.length; i++) {
        if (i % 4 == 0) {
          if (i != 0) {
            table.innerHTML += "</div>";
          }
          table.innerHTML += "<div class='row'>";
        }
        if (data[i].status == "vacant") {
          var a =
            "<div class='column' ><div class='card' id='vacant'><h3>" +
            data[i].table_id +
            "</h3><p><span  style='display:flex; '><img src='../../assets/img/group.png' style='height:49px; width:49px;' />" +
            data[i].no_person +
            "</span></div></div>";
        } else {
          var a =
            "<div class='column' ><div class='card' id='reserved'><h3>" +
            data[i].table_id +
            "</h3><p style='display:flex;'><img src='../../assets/img/group.png' style='height:49px; width:49px;'/>" +
            data[i].no_person +
            "</p></div></div>";
        }
        table.innerHTML += a;
        // console.log(data[0]);
      }
      table.innerHTML += "</div>";
    });
  },

  getpattable: function (i) {
    var x = document.getElementById("changeRecordForm");
    const api_url = "http://localhost:3000/table/" + i;
    // console.log(api_url);
    data = this.getapi(api_url).then((data) => {
      (x.elements[0].value = data[0].table_id),
        (x.elements[1].value = data[0].no_person),
        (x.elements[2].value = data[0].status),
        (x.elements[3].value = data[0].waiter_id),
        (x.elements[4].value = data[0].OTP),
        $("#changedata").modal();
    });
  },

  posttable: function () {
    var xhr = new XMLHttpRequest();
    var dta = JSON.stringify({
      table: {
        table_id: document.getElementById("table_id").value,
        no_person: document.getElementById("no_person").value,
        status: document.getElementById("status").value,
        waiter_id : document.getElementById("waiter_id").value,
        otp : document.getElementById("otp").value,
      },
    });
    xhr.open("POST", "http://localhost:3000/tableinsert", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    console.log(dta);
    xhr.send(dta);
    console.log(data);
  },

  postuptable: function () {
    var xhr = new XMLHttpRequest();
    var dta = JSON.stringify({
      table: {
        table_id: parseInt(document.getElementById("rtable_id").value),
        no_person: parseInt(document.getElementById("rno_person").value),
        status: document.getElementById("rstatus").value,
        waiter_id : document.getElementById("rwaiter_id").value,
        otp : document.getElementById("rotp").value,
      },
    });
    xhr.open("POST", "http://localhost:3000/tableupdate", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    console.log(dta);
    xhr.send(dta);
  },

  rem_table: function (i) {
    var xhr = new XMLHttpRequest();
    var dta = JSON.stringify({
      table: {
        table_id: i,
      },
    });
    xhr.open("POST", "http://localhost:3000/tabledelete", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(dta);
  },

  /***************************************** */

  getcuisine: function () {
    const api_url = "http://localhost:3000/cuisines";
    // console.log(api_url);
    data = this.getapi(api_url).then((data) => {
      for (var i = 0; i <= data.length; i++) {
        var a =
          "<tr><td>" +
          data[i].cuisine_id +
          "</td><td>" +
          data[i].cuisine_name +
          "</td><td><span class='material-icons' onclick='display(" +
          data[i].cuisine_id +
          ")'>edit</span></td>" +
          "<td><span class='material-icons' onclick='remove(" +
          data[i].cuisine_id +
          ")'>delete</span></td></tr>";

        Customer_BTable.innerHTML += a;
        console.log(data[0]);
      }
    });
  },

  getpatcuisine: function (i) {
    var x = document.getElementById("changeRecordForm");
    const api_url = "http://localhost:3000/cuisine/" + i;
    // console.log(api_url);
    data = this.getapi(api_url).then((data) => {
      (x.elements[0].value = data[0].cuisine_id),
        (x.elements[1].value = data[0].cuisine_name),
        $("#changedata").modal();
    });
  },

  postcuisine: function () {
    var xhr = new XMLHttpRequest();
    var dta = JSON.stringify({
      cuisine: {
        cuisine_name: document.getElementById("cuisine_name").value,
      },
    });
    xhr.open("POST", "http://localhost:3000/cuisineinsert", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    console.log(dta);
    xhr.send(dta);
    console.log(data);
  },

  //cuisine_id   cuisine_name
  postupcuisine: function () {
    var xhr = new XMLHttpRequest();
    var dta = JSON.stringify({
      cuisine: {
        cuisine_id: parseInt(document.getElementById("rcuisine_id").value),
        cuisine_name: document.getElementById("rcuisine_name").value,
      },
    });
    xhr.open("POST", "http://localhost:3000/cuisineupdate", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    console.log(dta);
    xhr.send(dta);
  },

  rem_cuisine: function (i) {
    var xhr = new XMLHttpRequest();
    var dta = JSON.stringify({
      cuisine: {
        cuisine_id: i,
      },
    });
    xhr.open("POST", "http://localhost:3000/cuisinedelete", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(dta);
  },

  /***************************************** */

  getsupplier: function () {
    const api_url = "http://localhost:3000/suppliers";
    // console.log(api_url); sup_id	sup_name	sup_email	sup_no	sup_add
    data = this.getapi(api_url).then((data) => {
      for (var i = 0; i <= data.length; i++) {
        var a =
          "<tr><td>" +
          data[i].sup_id +
          "</td><td>" +
          data[i].sup_name +
          "</td><td>" +
          data[i].sup_email +
          "</td><td>" +
          data[i].sup_no +
          "</td><td>" +
          data[i].sup_add +
          "</td><td><span class='material-icons' onclick='display(" +
          data[i].sup_id +
          ")'>edit</span></td>" +
          "<td><span class='material-icons' onclick='remove(" +
          data[i].sup_id +
          ")'>delete</span></td></tr>";

        Customer_BTable.innerHTML += a;
        console.log(data[0]);
      }
    });
  },

  getpatsupplier: function (i) {
    var x = document.getElementById("changeRecordForm");
    const api_url = "http://localhost:3000/supplier/" + i;
    // console.log(api_url);
    data = this.getapi(api_url).then((data) => {
      (x.elements[0].value = data[0].sup_id),
        (x.elements[1].value = data[0].sup_name),
        (x.elements[2].value = data[0].sup_email),
        (x.elements[3].value = data[0].sup_no),
        (x.elements[4].value = data[0].sup_add),
        $("#changedata").modal();
    });
  },

  //sup_id	sup_name	sup_email	sup_no	sup_add
  postsupplier: function () {
    var xhr = new XMLHttpRequest();
    var dta = JSON.stringify({
      supplier: {
        sup_name: document.getElementById("sup_name").value,
        sup_email: document.getElementById("sup_email").value,
        sup_no: document.getElementById("sup_no").value,
        sup_add: document.getElementById("sup_add").value,
      },
    });
    xhr.open("POST", "http://localhost:3000/supplierinsert", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    console.log(dta);
    xhr.send(dta);
    console.log(data);
  },

  //cuisine_id   cuisine_name
  postupsupplier: function () {
    var xhr = new XMLHttpRequest();
    var dta = JSON.stringify({
      supplier: {
        sup_id: document.getElementById("rsup_id").value,
        sup_name: document.getElementById("rsup_name").value,
        sup_email: document.getElementById("rsup_email").value,
        sup_no: document.getElementById("rsup_no").value,
        sup_add: document.getElementById("rsup_add").value,
      },
    });
    xhr.open("POST", "http://localhost:3000/supplierupdate", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    console.log(dta);
    xhr.send(dta);
  },

  rem_supplier: function (i) {
    var xhr = new XMLHttpRequest();
    var dta = JSON.stringify({
      supplier: {
        sup_id: i,
      },
    });
    xhr.open("POST", "http://localhost:3000/supplierdelete", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(dta);
  },

  /***************************************** */

  getrole: function () {
    const api_url = "http://localhost:3000/roles";
    // console.log(api_url); sup_id	sup_name	sup_email	sup_no	sup_add
    data = this.getapi(api_url).then((data) => {
      for (var i = 0; i <= data.length; i++) {
        var a =
          "<tr><td>" +
          data[i].role_id +
          "</td><td>" +
          data[i].role_name +
          "</td><td><span class='material-icons' onclick='display(" +
          data[i].role_id +
          ")'>edit</span></td>" +
          "<td><span class='material-icons' onclick='remove(" +
          data[i].role_id +
          ")'>delete</span></td></tr>";

        Customer_BTable.innerHTML += a;
        console.log(data[0]);
      }
    });
  },

  getpatrole: function (i) {
    var x = document.getElementById("changeRecordForm");
    const api_url = "http://localhost:3000/role/" + i;
    // console.log(api_url);
    data = this.getapi(api_url).then((data) => {
      (x.elements[0].value = data[0].role_id),
        (x.elements[1].value = data[0].role_name),
        $("#changedata").modal();
    });
  },

  //role_id role_name
  postrole: function () {
    var xhr = new XMLHttpRequest();
    var dta = JSON.stringify({
      role: {
        role_name: document.getElementById("role_name").value,
      },
    });
    xhr.open("POST", "http://localhost:3000/roleinsert", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    console.log(dta);
    xhr.send(dta);
    console.log(data);
  },

  //cuisine_id   cuisine_name
  postuprole: function () {
    var xhr = new XMLHttpRequest();
    var dta = JSON.stringify({
      role: {
        role_id: document.getElementById("rrole_id").value,
        role_name: document.getElementById("rrole_name").value,
      },
    });
    xhr.open("POST", "http://localhost:3000/roleupdate", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    console.log(dta);
    xhr.send(dta);
  },

  rem_role: function (i) {
    var xhr = new XMLHttpRequest();
    var dta = JSON.stringify({
      role: {
        role_id: i,
      },
    });
    xhr.open("POST", "http://localhost:3000/roledelete", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(dta);
  },

  /***************************************** */

  getlogin: function () {
    const api_url = "http://localhost:3000/logins";
    // 	usr_name	pswd	role_id	status

    data = this.getapi(api_url).then((data) => {
      for (var i = 0; i <= data.length; i++) {
        var a =
          "<tr><td>" +
          data[i].usr_name +
          "</td><td>" +
          data[i].pswd +
          "</td><td>" +
          data[i].role_id +
          "</td><td>" +
          data[i].status +
          "</td><td><span class='material-icons' onclick='display(" +
          data[i].usr_name +
          ")'>edit</span></td>" +
          "<td><span class='material-icons' onclick='remove(" +
          data[i].usr_name +
          ")'>delete</span></td></tr>";

        Customer_BTable.innerHTML += a;
        console.log(data[0]);
      }
    });
  },

  getpatlogin: function (i) {
    var x = document.getElementById("changeRecordForm");
    const api_url = "http://localhost:3000/login/" + i;
    // console.log(api_url);
    data = this.getapi(api_url).then((data) => {
      (x.elements[0].value = data[0].usr_name),
        (x.elements[1].value = data[0].pswd),
        (x.elements[2].value = data[0].role_id),
        (x.elements[3].value = data[0].status),
        $("#changedata").modal();
    });
  },

  postlogin: function () {
    var xhr = new XMLHttpRequest();
    var dta = JSON.stringify({
      login: {
        usr_name: document.getElementById("usr_name").value,
        pswd: document.getElementById("pswd").value,
        role_id: document.getElementById("role_id").value,
        status: document.getElementById("status").value,
      },
    });
    xhr.open("POST", "http://localhost:3000/logininsert", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    console.log(dta);
    xhr.send(dta);
    console.log(data);
  },

  // 	usr_name	pswd	role_id	status
  postuplogin: function () {
    var xhr = new XMLHttpRequest();
    var dta = JSON.stringify({
      login: {
        usr_name: document.getElementById("rusr_name").value,
        pswd: document.getElementById("rpswd").value,
        role_id: document.getElementById("rrole_id").value,
        status: document.getElementById("rstatus").value,
      },
    });
    xhr.open("POST", "http://localhost:3000/loginupdate", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    console.log(dta);
    xhr.send(dta);
  },

  /***************************************** */

  getbill: function () {
    const api_url = "http://localhost:3000/bills";

    data = this.getapi(api_url).then((data) => {
      for (var i = 0; i <= data.length; i++) {
        var a =
          "<tr><td>" +
          data[i].bill_id +
          "</td><td>" +
          data[i].cus_id +
          "</td><td>" +
          data[i].waiter_id +
          "</td><td>" +
          data[i].bill_date +
          "<td>" +
          data[i].order_id +
          "</td><td>" +
          data[i].table_id +
          "</td><td>" +
          data[i].amount +
          "</td><td><span class='material-icons' onclick='display(" +
          data[i].bill_id +
          ")'>edit</span></td>" +
          "<td><span class='material-icons' onclick='remove(" +
          data[i].bill_id +
          ")'>delete</span></td></tr>";

        Customer_BTable.innerHTML += a;
        console.log(data[0]);
      }
    });
  },

  getpatbill: function (i) {
    var x = document.getElementById("changeRecordForm");
    const api_url = "http://localhost:3000/bill/" + i;
    // console.log(api_url);
    data = this.getapi(api_url).then((data) => {
    //   var list = {}
    //  for (let j = 0; j < data.length; j++) {
    //    var suc=1;
    //   for (let z = 0; z < list.length; z++) {
    //     {
    //       if(list[z].food_id == data[j].food_item)
    //       {
    //         suc =0;
    //         list[z].qnty = list[z].qnty + 1;
    //         break;
    //       }
    //     }
    //     if(suc==1)
    //     {
    //       var myObj = {
    //         "food_item" : data[j].food_item,    
    //         "qnty" : 1
    //       };
    //       list.push(myObj);
    //     }
    //  }
    // }
    // console.log(list);
    console.log(data);
    const qty = 1;
    var total = 0;
        for( var i =0; i<data.length; i++)
        {
          total = total + data[i].price;
          var a = "<tr><td>" +data[i].name+
          "<td><td>" +
          qty +
          "</td><td>" +
          data[i].price +
          "</td></tr>";
          billdisplay.innerHTML +=a;
        }
        $("#changedata").modal();
    });
  },

  postbill: function () {
    var xhr = new XMLHttpRequest();
    var dta = JSON.stringify({
      bill: {
        cus_id: parseInt(document.getElementById("cus_id").value),
        waiter_id: parseInt(document.getElementById("waiter_id").value),
        bill_date: document.getElementById("bill_date").value,
        order_id: parseInt(document.getElementById("order_id").value),
        table_id: parseInt(document.getElementById("table_id").value),
        amount: parseInt(document.getElementById("amount").value),
      },
    });
    xhr.open("POST", "http://localhost:3000/billinsert", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    console.log(dta);
    xhr.send(dta);
    console.log(dta);
  },

  // 		bill_id	cus_id	waiter_id	bill_date	order_id	table_id	amount
  postupbill: function () {
    var xhr = new XMLHttpRequest();
    var dta = JSON.stringify({
      bill: {
        bill_id: document.getElementById("rbill_id").value,
        cus_id: parseInt(document.getElementById("rcus_id").value),
        waiter_id: document.getElementById("rwaiter_id").value,
        bill_date: document.getElementById("rbill_date").value,
        order_id: document.getElementById("rorder_id").value,
        table_id: document.getElementById("rtable_id").value,
        amount: document.getElementById("ramount").value,
      },
    });
    xhr.open("POST", "http://localhost:3000/billupdate", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    console.log(dta);
    xhr.send(dta);
  },

  rem_bill: function (i) {
    var xhr = new XMLHttpRequest();
    var dta = JSON.stringify({
      bill: {
        bill_id: i,
      },
    });
    xhr.open("POST", "http://localhost:3000/billdelete", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(dta);
  },

  /***************************************** */

  getfood_order: function () {
    const api_url = "http://localhost:3000/food_order";

    data = this.getapi(api_url).then((data) => {
      for (var i = 0; i <= data.length; i++) {
        var a =
          "<tr><td>" +
          data[i].order_id +
          "</td><td>" +
          data[i].price +
          "</td><td>" +
          data[i].waiter_id +
          "</td><td>" +
          data[i].status +
          "<td>" +
          data[i].order_time +
          "</td><td>" +
          data[i].cus_id +
          "</td><td>" +
          data[i].table_id +
          "</td><td><span class='material-icons' onclick='display(" +
          data[i].order_id +
          ")'>edit</span></td>" +
          "<td><span class='material-icons' onclick='remove(" +
          data[i].order_id +
          ")'>delete</span></td></tr>";

        Customer_BTable.innerHTML += a;
        console.log(data[0]);
      }
    });
  },

  getatfood_order: function (i) {
    var x = document.getElementById("changeRecordForm");
    const api_url = "http://localhost:3000/food_order/" + i;
    // console.log(api_url);
    data = this.getapi(api_url).then((data) => {
      (x.elements[0].value = data[0].order_id),
        (x.elements[1].value = data[0].price),
        (x.elements[2].value = data[0].waiter_id),
        (x.elements[3].value = data[0].status),
        (x.elements[4].value = data[0].order_time),
        (x.elements[5].value = data[0].cus_id),
        (x.elements[6].value = data[0].table_id),
        $("#changedata").modal();
    });
  },

  postfood_order: function () {
    var xhr = new XMLHttpRequest();
    var dta = JSON.stringify({
      food_order: {
        waiter_id: document.getElementById("waiter_id").value,
        price: document.getElementById("price").value,
        status: document.getElementById("status").value,
        order_time: document.getElementById("order_time").value,
        cus_id: document.getElementById("cus_id").value,
        table_id: document.getElementById("table_id").value,
      },
    });
    xhr.open("POST", "http://localhost:3000/food_orderinsert", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    console.log(dta);
    xhr.send(dta);
    console.log(data);
  },

  //order_id	price	waiter_id	status	order_time	cus_id	table_id
  postupfood_order: function () {
    var xhr = new XMLHttpRequest();
    var dta = JSON.stringify({
      food_order: {
        order_id: document.getElementById("rorder_id").value,
        price: document.getElementById("rprice").value,
        waiter_id: document.getElementById("rwaiter_id").value,
        status: document.getElementById("rstatus").value,
        order_time: document.getElementById("rorder_time").value,
        cus_id: document.getElementById("rcus_id").value,
        table_id: document.getElementById("rtable_id").value,
      },
    });
    xhr.open("POST", "http://localhost:3000/food_orderupdate", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    console.log(dta);
    xhr.send(dta);
  },

  rem_food_order: function (i) {
    var xhr = new XMLHttpRequest();
    var dta = JSON.stringify({
      food_order: {
        order_id: i,
      },
    });
    xhr.open("POST", "http://localhost:3000/food_orderdelete", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(dta);
  },

  /***************************************** */

  getinv: function () {
    const api_url = "http://localhost:3000/inv";

    data = this.getapi(api_url).then((data) => {
      for (var i = 0; i <= data.length; i++) {
        var a =
          "<tr><td>" +
          data[i].item_id +
          "</td><td>" +
          data[i].sup_id +
          "</td><td>" +
          data[i].item_name +
          "</td><td>" +
          data[i].item_des +
          "<td>" +
          data[i].monthly_consuption +
          "</td><td>" +
          data[i].current_stk +
          "</td><td>" +
          data[i].ordering_cost +
          "</td><td>" +
          data[i].stock_mang_cost +
          "</td><td>" +
          data[i].product_per_unit +
          "</td><td>" +
          data[i].lot_size +
          "</td><td>" +
          data[i].no_of_unt +
          "</td><td>" +
          data[i].product_price +
          "</td><td>" +
          data[i].load_time +
          "</td><td><span class='material-icons' onclick='display(" +
          data[i].item_id +
          ")'>edit</span></td>" +
          "<td><span class='material-icons' onclick='remove(" +
          data[i].item_id +
          ")'>delete</span></td></tr>";

        Customer_BTable.innerHTML += a;
        console.log(data[0]);
      }
    });
  },

  getpatinv: function (i) {
    var x = document.getElementById("changeRecordForm");
    const api_url = "http://localhost:3000/invs/" + i;
    // console.log(api_url);
    data = this.getapi(api_url).then((data) => {
      (x.elements[0].value = data[0].item_id),
        (x.elements[1].value = data[0].sup_id),
        (x.elements[2].value = data[0].item_name),
        (x.elements[3].value = data[0].item_des),
        (x.elements[4].value = data[0].current_stk),
        (x.elements[5].value = data[0].monthly_consuption),
        (x.elements[6].value = data[0].ordering_cost),
        (x.elements[7].value = data[0].stock_mang_cost),
        (x.elements[8].value = data[0].product_per_unit),
        (x.elements[9].value = data[0].reorder_level),
        (x.elements[10].value = data[0].saftey_stk),
        (x.elements[11].value = data[0].lot_size),
        (x.elements[12].value = data[0].no_of_unt),
        (x.elements[13].value = data[0].product_price),
        (x.elements[14].value = data[0].load_time),
        (x.elements[15].value = data[0].monthly_consuption),
        $("#changedata").modal();
    });
  },
  //item_id	sup_id	item_name	item_des monthly_consuption	current_stk ordering_cost	stock_mang_cost	product_per_unit	lot_size	no_of_unt	product_price	load_time
  // 				safty_stk = (ld_tme / 2) * (anual_cons / 300);
  // 				crt_stk = crt_stk - safty_stk;
  // 				re_order = (lt_size * (anual_cons / 365) + safty_stk);
  postinv: function () {
    var xhr = new XMLHttpRequest();
    var safty_stk =
      (parseInt(document.getElementById("load_time").value) / 2) *
      (parseInt(document.getElementById("monthly_cons").value) / 300);
    var crt_stk =
      parseInt(document.getElementById("current_stk").value) - safty_stk;
    var re_order =
      parseInt(document.getElementById("lot_size").value) *
        (parseInt(document.getElementById("monthly_cons").value) / 12) +
      safty_stk;
    var dta = JSON.stringify({
      inventory: {
        // "item_id": document.getElementById("item_id").value,
        sup_id: document.getElementById("sup_id").value,
        item_name: document.getElementById("item_name").value,
        current_stk: document.getElementById("current_stk").value,
        item_des: document.getElementById("item_des").value,
        monthly_consuption: document.getElementById("monthly_consuption").value,
        ordering_cost: document.getElementById("ordering_cost").value,
        stock_mang_cost: document.getElementById("stock_mang_cost").value,
        product_per_unit: document.getElementById("product_per_unit").value,
        lot_size: document.getElementById("lot_size").value,
        no_of_unt: document.getElementById("no_of_unt").value,
        product_price: document.getElementById("product_price").value,
        load_time: document.getElementById("load_time").value,
        safty_stk: safty_stk,
        crt_stk: crt_stk,
        re_order: re_order,
      },
    });
    xhr.open("POST", "http://localhost:3000/invinsert", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    console.log(dta);
    xhr.send(dta);
    console.log(data);
  },

  postupinv: function () {
    var xhr = new XMLHttpRequest();
    var safty_stk =
      (parseInt(document.getElementById("rload_time").value) / 2) *
      (parseInt(document.getElementById("rmonthly_cons").value) / 300);
    var crt_stk = parseInt(document.getElementById("rcurrent_stk").value) - safty_stk;
    var re_order =  (document.getElementById("rlot_size").value)*((document.getElementById("rmonthly_cons").value) / 12) + safty_stk;
    var dta = JSON.stringify({
      inventory: {
        item_id: document.getElementById("ritem_id").value,
        sup_id: document.getElementById("rsup_id").value,
        item_name: document.getElementById("ritem_name").value,
        current_stk: document.getElementById("rcurrent_stk").value,
        item_des: document.getElementById("ritem_des").value,
        monthly_consuption: document.getElementById("rmonthly_consuption")
          .value,
        ordering_cost: document.getElementById("rordering_cost").value,
        stock_mang_cost: document.getElementById("rstock_mang_cost").value,
        product_per_unit: document.getElementById("rproduct_per_unit").value,
        lot_size: document.getElementById("rlot_size").value,
        no_of_unt: document.getElementById("rno_of_unt").value,
        product_price: document.getElementById("rproduct_price").value,
        load_time: document.getElementById("rload_time").value,
        safty_stk: safty_stk,
        crt_stk: crt_stk,
        re_order: re_order,
      },
    });
    xhr.open("POST", "http://localhost:3000/invupdate", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    console.log(dta);
    xhr.send(dta);
  },

  rem_inv: function (i) {
    var xhr = new XMLHttpRequest();
    var dta = JSON.stringify({
      inventory: {
        item_id: i,
      },
    });
    xhr.open("POST", "http://localhost:3000/invdelete", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(dta);
  },

  /**************************** */

  getfood_des: function () {
    const api_url = "http://localhost:3000/food_des";

    data = this.getapi(api_url).then((data) => {
      for (var i = 0; i <= data.length; i++) {
        var a =
          "<tr><td>" +
          data[i].food_id +
          "</td><td>" +
          data[i].item_id +
          "</td><td>" +
          data[i].item_name +
          "</td><td><span class='material-icons' onclick='display(" +
          data[i].s_no +
          ")'>edit</span></td>" +
          "<td><span class='material-icons' onclick='remove(" +
          data[i].s_no +
          ")'>delete</span></td></tr>";

        Customer_BTable.innerHTML += a;
        console.log(data[0]);
      }
    });
  },

  getpatfood_des: function (i) {
    var x = document.getElementById("changeRecordForm");
    const api_url = "http://localhost:3000/food_des/" + i;
    // console.log(api_url);
    data = this.getapi(api_url).then((data) => {
      (x.elements[0].value = data[0].food_id),
        (x.elements[1].value = data[0].item_id),
        (x.elements[2].value = data[0].item_name),
        $("#changedata").modal();
    });
  },

  //s_no	food_id	item_id	item_name

  postfood_order: function () {
    var xhr = new XMLHttpRequest();
    var dta = JSON.stringify({
      food_des: {
        food_id: document.getElementById("food_id").value,
        item_id: document.getElementById("item_id").value,
        item_name: document.getElementById("item_name").value,
      },
    });
    xhr.open("POST", "http://localhost:3000/food_desinsert", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    console.log(dta);
    xhr.send(dta);
    console.log(data);
  },

  //order_id	price	waiter_id	status	order_time	cus_id	table_id
  postupfood_order: function () {
    var xhr = new XMLHttpRequest();
    var dta = JSON.stringify({
      food_des: {
        s_no: document.getElementById("s_no").value,
        food_id: document.getElementById("food_id").value,
        item_id: document.getElementById("item_id").value,
        item_name: document.getElementById("item_name").value,
      },
    });
    xhr.open("POST", "http://localhost:3000/food_desupdate", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    console.log(dta);
    xhr.send(dta);
  },

  rem_food_des: function (i) {
    var xhr = new XMLHttpRequest();
    var dta = JSON.stringify({
      food_des: {
        s_no: i,
      },
    });
    xhr.open("POST", "http://localhost:3000/food_desdelete", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(dta);
  },

  /**************************** */

  getfood_sub_order: function () {
    const api_url = "http://localhost:3000/food_sub_order";

    data = this.getapi(api_url).then((data) => {
      for (var i = 0; i <= data.length; i++) {
        var a =
          "<tr><td>" +
          data[i].order_id +
          "</td><td>" +
          data[i].food_id +
          "</td><td>" +
          data[i].price +
          "</td><td><span class='material-icons' onclick='display(" +
          data[i].sub_order_id +
          ")'>edit</span></td>" +
          "<td><span class='material-icons' onclick='remove(" +
          data[i].sub_order_id +
          ")'>delete</span></td></tr>";

        Customer_BTable.innerHTML += a;
        console.log(data[0]);
      }
    });
  },

  getpatfood_sub_orders: function (i) {
    var x = document.getElementById("changeRecordForm");
    const api_url = "http://localhost:3000/food_sub_orders/" + i;
    // console.log(api_url);
    data = this.getapi(api_url).then((data) => {
      (x.elements[0].value = data[0].sub_order_id),
        (x.elements[1].value = data[0].order_id),
        (x.elements[2].value = data[0].food_id),
        (x.elements[3].value = data[0].price),
        $("#changedata").modal();
    });
  },

  //sub_order_id	order_id	food_id	price

  postfood_sub_orders: function () {
    var xhr = new XMLHttpRequest();
    var dta = JSON.stringify({
      food_sub_orders: {
        order_id: document.getElementById("order_id").value,
        food_id: document.getElementById("food_id").value,
        price: document.getElementById("price").value,
      },
    });
    xhr.open("POST", "http://localhost:3000/food_sub_ordersinsert", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    console.log(dta);
    xhr.send(dta);
    console.log(data);
  },

  //order_id	price	waiter_id	status	order_time	cus_id	table_id
  postupfood_order: function () {
    var xhr = new XMLHttpRequest();
    var dta = JSON.stringify({
      food_sub_orders: {
        sub_order_id: document.getElementById("sub_order_id").value,
        order_id: document.getElementById("order_id").value,
        food_id: document.getElementById("food_id").value,
        price: document.getElementById("price").value,
      },
    });
    xhr.open("POST", "http://localhost:3000/food_sub_ordersupdate", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    console.log(dta);
    xhr.send(dta);
  },

  rem_food_sub_orders: function (i) {
    var xhr = new XMLHttpRequest();
    var dta = JSON.stringify({
      sub_order_id: {
        sub_order_id: i,
      },
    });
    xhr.open("POST", "http://localhost:3000/food_sub_ordersdelete", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(dta);
  },

  
  getmenu: function () {
    var b = "";
    const api_url = "http://localhost:3000/menus";
    // console.log(api_url);
    Customer_BTable.innerHTML = b;
    data = this.getapi(api_url).then((data) => {
      // console.log("y");
      for (var i = 0; i <= data.length; i++) {
        var a =
          "<tr><td scope='row'>" +
          data[i].menu_id +
          "</td><td  scope='row'>" +
          data[i].name +
          "</td><td  scope='row'>" +
          data[i].food_des +
          "</td><td  scope='row'>" +
          data[i].image +
          "</td><td  scope='row'>" +
          data[i].price +
          "</td><td  scope='row'>" +
          data[i].food_type +
          "</td><td  scope='row'>" +
          data[i].cuisine_id +
          "</td><td  scope='row'>" +
          data[i].status +
          "</td><td  scope='row'><span class='material-icons' onclick='display(" +
          data[i].menu_id +

          ")'>edit</span></td>" +
          "<td  scope='row'><span class='material-icons' onclick='remove(" +
          data[i].menu_id +
          ")'>delete</span></td></tr>";
        // console.log(data[i]);
        Customer_BTable.innerHTML += a;
      }
      // console.log("a")
    });
  },


  getsale: function () {
    var b = "";
    const api_url = "http://localhost:3000/sales";
    // console.log(api_url);
    Customer_BTable.innerHTML = b;
    data = this.getapi(api_url).then((data) => {
      // console.log("y");
      for (var i = 0; i <= data.length; i++) {
        var a =
          "<tr><td scope='row'>" +
          data[i].SalesYear +
          "</td><td  scope='row'>" +
          data[i].SalesMonth +
          "</td><td  scope='row'>" +
          data[i].SalesDay +
          "</td><td  scope='row'>" +
          data[i].TotalSales  +"</td></tr>";
        // console.log(data[i]);
        Customer_BTable.innerHTML += a;
      }
      // console.log("a")
    });
  },
  

  getpatmenu: function (i) {
    var x = document.getElementById("changeRecordForm");
    const api_url = "http://localhost:3000/menu/" + i;
    // console.log(api_url);
    data = this.getapi(api_url).then((data) => {
      (x.elements[0].value = data[0].menu_id),
        (x.elements[1].value = data[0].name),
        (x.elements[2].value = data[0].price),
        // (x.elements[3].value = data[0].image),
        (x.elements[4].value = data[0].food_des),
        (x.elements[5].value = data[0].food_type),
        (x.elements[6].value = data[0].cuisine_id),
        (x.elements[7].value = data[0].status),
        $("#changedata").modal();
    });
  },


  // menu_id
  // image
  // price
  // name
  // food_des
  // food_type
  // cuisine_id
  // status

  postmenu: function () {
    var xhr = new XMLHttpRequest();
    var dta = JSON.stringify({
      menu: {
        image: document.getElementById("rimage").value,
        price: document.getElementById("price").value,
        name: document.getElementById("name").value,
        food_des: document.getElementById("food_Des").value,
        food_type: document.getElementById("food_type").value,
        cuisine_id: document.getElementById("cuisine_id").value,
        status: document.getElementById("status").value,
      },
    });
    xhr.open("POST", "http://localhost:3000/menuinsert", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    console.log(dta);
    xhr.send(dta);
    console.log(data);
  },

  //order_id	price	waiter_id	status	order_time	cus_id	table_id
  postupmenu: function () {
    var xhr = new XMLHttpRequest();
    var dta = JSON.stringify({
      menu: {
        image: document.getElementById("rimage"),
        price: document.getElementById("rprice").value,
        name: document.getElementById("rname").value,
        food_des: document.getElementById("rfood_Des").value,
        food_type: document.getElementById("rfood_type").value,
        cuisine_id: document.getElementById("rcuisine_id").value,
        status: document.getElementById("rstatus").value,
      },
    });
    xhr.open("POST", "http://localhost:3000/menuupdate", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    console.log(dta);
    xhr.send(dta);
  },

  rem_menu: function (i) {
    var xhr = new XMLHttpRequest();
    var dta = JSON.stringify({
      menu: {
        menu_id: i,
      },
    });
    xhr.open("POST", "http://localhost:3000/menudelete", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(dta);
  },

  getapi: async function (url) {
    // Storing response
    const response = await fetch(url);
    // Storing data in form of JSON
    var data = await response.json();
    // console.log(data);
    return data;
  },
};
