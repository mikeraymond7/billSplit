function toEven() {
    window.location.href="/SplitEven";
}

function toItem() {
    window.location.href="/SplitByItem";
}

function splitEven() {
    var price = document.getElementById("price").value;
    var people = document.getElementById("people").value;
    var tip = document.getElementById("tip").value;
    var split = (price * (1 + tip / 100)) / people;
    document.getElementById("result").innerHTML = "Each person owes: $" + split.toFixed(2);
}

class Item {
    constructor(tblName, id, price) {
        this.id = id;
        var existing = document.getElementById(tblName + id);
        if (existing == null) {

            this.price = price;
            var itemName = document.getElementById("item").value;
            if (itemName == "") { itemName = "N/A"; }

            this.tr = document.createElement("tr");
            this.tdItem = document.createElement("td");
            this.tdPrice = document.createElement("td");
            this.tdDelete = document.createElement("td");

            this.tr.setAttribute("id", tblName + id);

            this.tdItem.innerHTML = itemName;
            this.tdPrice.innerHTML = price;
            this.tdDelete.innerHTML = "<button><b>-</b></button>";
            this.tdDelete.setAttribute("class", "deleteItem");
            this.tdDelete.setAttribute("onclick", "Person.deleteItem(" + tblName + ", " + tblName + id + ");");

            this.tr.appendChild(this.tdItem);
            this.tr.appendChild(this.tdPrice);
            this.tr.appendChild(this.tdDelete);
        }

        else {
            this.tr = existing;
            this.tdItem = this.tr.childNodes[0];
            this.tdPrice = this.tr.childNodes[1];
            this.tdDelete = this.tr.childNodes[2];
            this.price = this.tdPrice.innerHTML;
        }

    }
}

class Person {
    constructor(name) {
        this.name = name;
        var existing = document.getElementById(name);
        this.doesExist = existing != null;
        if (existing == null) {
            // create elements
            this.tbl = document.createElement("table");
            this.tr = document.createElement("tr");
            this.tblName = document.createElement("th");
            this.tdDelete = document.createElement("td");

            // set header row
            this.tblName.innerHTML = name;
            this.tblName.setAttribute('colspan', '2');

            // constant title data
            var itemTitle = document.createElement("th");
            var priceTitle = document.createElement("th");
            var rowTitle = document.createElement("tr");

            // constant text
            itemTitle.innerHTML = "Item";
            priceTitle.innerHTML = "Price";

            // append to row
            rowTitle.appendChild(itemTitle);
            rowTitle.appendChild(priceTitle);

            // set delete button
            this.tdDelete.innerHTML = "<button><b>x</b></button>";
            this.tdDelete.setAttribute("class", "deleteTbl");
            this.tdDelete.setAttribute("id", "delete" + name);
            this.tdDelete.setAttribute("onclick", "Person.deleteTbl(" + name + ");");

            // set unique id
            this.tbl.setAttribute('id', name);

            // attach elements to each other
            this.tr.appendChild(this.tblName);
            this.tr.appendChild(this.tdDelete);
            this.tbl.appendChild(this.tr);
            this.tbl.appendChild(rowTitle);
        }
        else {
            this.tbl = existing;
            this.tr = this.tbl.querySelectorAll("tr")[0];
            this.tblName = this.tbl.querySelectorAll("th")[0];
            this.tdDelete = document.getElementById("delete" + name);
        }
    }

    createPerson() {
        var body = document.getElementById("mainDiv");
        body.appendChild(this.tbl);
    }

    createItem(price) {
        var item = new Item(this.name, this.tbl.childElementCount, price);        

        this.tbl.appendChild(item.tr);
    }

    static addInfo() {
        this.removeTotals();
        var name1 = document.getElementById("name").value;
        const names = name1.split(" ");
        var name = "";
        for (var i = 0; i < names.length; i++) {
            name += names[i];
        }
        if (name == "") { name = "person"; }
        var person = new Person(name);
        var price = document.getElementById("price").value;
        if (price == "") { alert("You need to enter a price"); }
        else {
            if (!person.doesExist) {
                person.createPerson();
            }
            person.createItem(price);
        }
    }

    static deleteTbl(tbl) {
        tbl.remove();
    }

    static deleteItem(tbl, item) {
        this.removeTotals();
        item.remove();
        if (tbl.childElementCount <= 2) {
            this.deleteTbl(tbl);
            return;
        }
        var person = new Person(tbl.getAttribute("id"));
        var skipId = parseInt((item.id).split(tbl.id)[1]);

        for (var i = (skipId + 1); i < tbl.childElementCount+1; i++) {
            var item = new Item(person.name, i, "");
            item.id--;
            item.tr.setAttribute("id", person.name + (i-1));
            item.tdDelete.setAttribute("onclick", "Person.deleteItem(" + person.name + "," + person.name + (i-1) + ");")
        }
    }


    static removeTotals() {
        var totals = document.getElementsByClassName("total");
        for (var i = totals.length-1; i >= 0; i--) {
            totals[i].remove();
        }
    }

    calculateTotal(tax, tip) {
        var items = this.tbl.querySelectorAll("td");
        var total = 0;
        for (var i = 2; i < items.length; i += 3) {
            total += parseFloat(items[i].innerHTML);
        }

        total *= (1+tax/100);
        total *= (1+tip/100);

        var row = document.createElement("tr");
        var price = document.createElement("th");

        row.setAttribute('class', 'total');
        price.setAttribute('colspan', '2');


        row.appendChild(price);
        this.tbl.appendChild(row);

        price.innerHTML = "<b>Total Cost: </b>$" + total.toFixed(2);
    }

    static calculateTotals() {
        var tax = document.getElementById("tax").value;
        var tip = document.getElementById("tip").value;
        if (tax == "" || tip == "") {
            alert("Don't forget to insert tax and tip");
        }
        else {
            this.removeTotals();
            var people = document.getElementsByTagName("table");
            var totals = document.getElementsByClassName("total").length;
            /*if (totals == people.length) {
                alert("Something needs to be modified before you can calculate totals!");
                return;
            }*/
            for (var i = 0; i < people.length; i++) {
                var person = new Person(people[i].getAttribute("id"));
                person.calculateTotal(tax, tip);
            }
        }
    }
}