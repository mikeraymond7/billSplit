﻿function toEven() {
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
    constructor(name, price) {
        this.name = name;

        // implement type checking here
        this.price = parseFloat(price);
    }
}

class person {
    constructor(name) {
        var body = document.getElementById("mainDiv");
        var tbl = document.createElement("table");
        var tr = document.createElement("tr");
        var th = document.createElement("th");

        th.innerHTML = name;
        th.setAttribute('colspan', '2');
        tbl.setAttribute('id', name);

        tr.appendChild(th);
        tbl.appendChild(tr);
        //body.appendChild(tbl);
    }

    static createPerson(name) {
        /*const aperson = new person(name);
        var body = document.getElementById("mainDiv");
        alert(aperson);
        body.appendChild(person.tbl);
        */
        
        var body = document.getElementById("mainDiv");
        var tbl = document.createElement("table");
        var tr = document.createElement("tr");
        var th = document.createElement("th");
        var tdDelete = document.createElement("td");

        
        th.innerHTML = name;
        tdDelete.innerHTML = "<button><b>x</b></button>";

        th.setAttribute('colspan', '2');
        tdDelete.setAttribute("class", "deleteTbl");
        tdDelete.setAttribute("name", name);
        tdDelete.setAttribute("onclick", "person.deleteTbl(" + name + ");");
        tbl.setAttribute('id', name);

      
        tr.appendChild(th);
        tr.appendChild(tdDelete);
        tbl.appendChild(tr);
        body.appendChild(tbl);
    }

    static createItem(person, price) {
        var itemName = document.getElementById("item").value;
        var tr = document.createElement("tr");
        var tdItem = document.createElement("td");
        var tdPrice = document.createElement("td");
        var tdDelete = document.createElement("td");

        tdItem.innerHTML = itemName;
        tdPrice.innerHTML = price;
        tdDelete.innerHTML = "<button><b>-</b></button>";
        tdDelete.setAttribute("class", "deleteItem");
        //tdDelete.setAttribute("onclick", "person.deleteItem()");

        tr.appendChild(tdItem);
        tr.appendChild(tdPrice);
        tr.appendChild(tdDelete);
        person.append(tr);
    }

    static addInfo() {
        this.removeTotals();
        var name = document.getElementById("name").value;
        if (name == "") { name = "Person"; }
        var person = document.getElementById(name);
        if (person != null) {
            var price = document.getElementById("price").value;
            if (price == "") { alert("You need to enter a price"); }
            else {
                this.createItem(person, price);
            }
        }

        else {
            this.createPerson(name);
            this.addInfo();
        }
    }

    static deleteTbl(name) {
        name.remove();
        //alert(name.innerHTML);
        //person.remove();
    }

    static removeTotals() {
        var totals = document.getElementsByClassName("total");
        for (var i = totals.length-1; i >= 0; i--) {
            totals[i].remove();
        }
    }

    static calculateTotal(person, tax, tip) {
        var items = person.querySelectorAll("td");
        var prices = [];
        var total = 0;
        for (var i = 1; i < items.length; i += 2) {
            total += parseFloat(items[i].innerHTML);
        }

        total *= (1+tax/100);
        total *= (1+tip/100);

        var row = document.createElement("tr");
        var price = document.createElement("td");

        row.setAttribute('class', 'total');
        price.setAttribute('colspan', '2');


        row.appendChild(price);
        person.appendChild(row);

        price.innerHTML = "<b>Total Cost: </b>$" + total.toFixed(2);
    }

    static calculateTotals() {
        var tax = document.getElementById("tax").value;
        var tip = document.getElementById("tip").value;
        if (tax == "" || tip == "") {
            alert("Don't forget to insert tax and tip");
        }
        else {
            var people = document.getElementsByTagName("table");
            var totals = document.getElementsByClassName("total").length;
            if (totals == people.length) {
                alert("Totals are already up-to-date!");
                return;
            }
            for (var i = 0; i < people.length; i++) {
                this.calculateTotal(people[i], tax, tip);
            }
        }
    }

}