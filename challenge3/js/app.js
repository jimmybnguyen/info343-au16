"use strict";

document.addEventListener("DOMContentLoaded", function() {
    // Making sure JS loads
    console.log("Document Readay");
    
    // Checking global variable
    console.log(MOVIES);
    console.log(avgByGenre);
});

var dropdown = document.querySelector("#report-select");
var table = document.querySelector(".table");

var starWars = MOVIES.filter(function (item) {
    return item.title.toLowerCase().includes("star wars");
});

starWars.sort(compareTitle);

var remake20th = MOVIES.filter(function (item) {
    var movieDate = new Date(item.released);
    var compareDate = new Date("January 1, 2001");
    return movieDate < compareDate;
});

remake20th.sort(compareReleased);

var avgByGenre = generateAvg();
var topByTickets = generateTop();

console.log(topByTickets);

function compareTitle(a, b) {
    var str1 = a.title;
    var str2 = b.title
    return str1.localeCompare(str2);
}

function compareReleased(a, b) {
    return parseInt(a.released) - parseInt(b.released);
}

function compareTickets(a, b) {
    return  parseInt(b.tickets) - parseInt(a.tickets);
}

function generateAvg() {
    var genreSales = [];
    
    MOVIES.forEach(function(item) {

        //if the genre is not in the object yet, create a new key with
        //the genre, and add in the genre name and sales
        if (!(item.genre in genreSales)) {;
            //genreSales[item.genre] = {genre : item.genre, sales : item.sales, count: 1};
            genreSales[item.genre] = {sales : item.sales, count: 1};             

        //if the genre is in the object, add the sales to the old sales amount
        //and increase count by 1
        } else {
            genreSales[item.genre].sales += item.sales;
            genreSales[item.genre].count += 1;

        }
    });
    
    var avgSales = [];
    //calculates the average sales of each genre
    for (var key in genreSales) {
        var avg = genreSales[key].sales / genreSales[key].count;
        if (key == "") {
            avgSales.push({genre: "N/A", average: avg})
        } else {
            avgSales.push({genre: key, average: avg})
        }
    }
    return avgSales;
}

function generateTop() {
    var ticketSales = [];
    
    MOVIES.forEach(function(item) {
        var releaseYear = item.released.substring(0,4);
        var movie = item.title + " (" + releaseYear + ")";
        if (!(movie in ticketSales)) {;
            ticketSales[movie] = {tickets: item.tickets};             
        } else {
            ticketSales[movie].tickets += item.tickets;

        }
    });
    
    var topSales = [];
    for (var key in ticketSales) {
        topSales.push({title: key, tickets: ticketSales[key].tickets});
    }
    topSales.sort(compareTickets);
    //topSales.length = 100;
    return topSales;
}

function buildTable() {
    // table body and table head
    var tbody = document.createElement("tbody");
    var thead = document.createElement("thead");
    
    // Row for the header
    var threadRow = document.createElement("tr");
    
    // Columns for the header
    var titleTh = document.createElement("th");
    titleTh.textContent = "Title";

    var releasedTh = document.createElement("th");
    releasedTh.textContent = "Released";

    var distributorTh = document.createElement("th");
    distributorTh.textContent = "Distributor";
    
    var genreTh = document.createElement("th");
    genreTh.textContent = "Genre";

    var ratingTh = document.createElement("th");
    ratingTh.textContent = "Rating";

    var yearTh = document.createElement("th");
    yearTh.textContent = "Year";
    
    var salesTh = document.createElement("th");
    salesTh.textContent = "Gross Sales";

    var ticketsTh = document.createElement("th");
    ticketsTh.textContent = "Tickets";
    
    // Append these elements to the table
    threadRow.appendChild(titleTh);
    threadRow.appendChild(releasedTh);
    threadRow.appendChild(distributorTh);
    threadRow.appendChild(genreTh);
    threadRow.appendChild(ratingTh);
    threadRow.appendChild(yearTh);
    threadRow.appendChild(salesTh);
    threadRow.appendChild(ticketsTh);
    
    thead.appendChild(threadRow);
    table.appendChild(tbody);
    table.appendChild(thead);
}

function buildRows(rows) {
    // First, build the table structure.
    buildTable();

    // Find the table body, where the rows will be rendered.
    var tbody = document.querySelector("tbody");
    
    // Iterate over each movie title,
    // create the tr (row element) and td elements (column elements)
    // and append to the table body.
    rows.forEach(function (name) {
        var nameTr = document.createElement("tr");

        // Object.keys returns an array of the keys object
        var nameKeys = Object.keys(name);

        // This makes it easy to iterate over the values
        // in the object by using bracket notation
        // to access each property in the object.
        nameKeys.forEach(function (key) {
            var formatted = "";
            var value = name[key];
            if (key == "tickets") {
                formatted = numeral(value).format('0,0');
            } else  if (key == "sales") {
                formatted = numeral(value).format('$0,0p[.]00');
            } else if (key == "released") {
                formatted = moment(value).format("l");
            } else {
                formatted = value;
            }
            var td = document.createElement("td");
            td.textContent = formatted;

            nameTr.appendChild(td);
        });

        tbody.appendChild(nameTr);
    });
    
    // Calculate the total for the given array of titles.
    // Array.reduce takes an array of items,
    // and returns a single value based on logic you provided.
    // In this case, we want to sum all the name counts
    // for the given list of movies.
    var total = rows.reduce(function (sum, name) {
        var newSum = sum + name.count;
        return newSum;
    }, 0); // 0 is the initial value for the sum
    
    // Build totals rows
    var tableFooter = document.createElement("tfoot");
    var totalsTr = document.createElement("tr");
    var totalsNameTd = document.createElement("td");
    totalsNameTd.textContent = "Total";

    // We don't want anything in the second column
    var blankTd = document.createElement("td");

    var totalsTotalTd = document.createElement("td");
    totalsTotalTd.textContent = total;

    // Append totals row
    totalsTr.appendChild(totalsNameTd);
    totalsTr.appendChild(blankTd);
    totalsTr.appendChild(totalsTotalTd);

    // Append footer (with totals)
    tableFooter.appendChild(totalsTr);
    table.appendChild(tableFooter);
}

// When the selection in the dropdown changes,
// we want to clear and rebuild the table
// based on the selected gender.
dropdown.addEventListener("change", function (e) {
    // Removes all current elements in the table.
    table.innerHTML = "";

    // Get the current value of the dropdown,
    // and build the table with the data for that value.
    var value = e.target.value;

    if (value === "starWars") {
        buildRows(starWars);
    } else if (value === "remake20th") {
        buildRows(remake20th);
    } else if (value === "avgByGenre") {
        buildRows(avgByGenre);
    } else if (value === "topByTickets") {
        buildRows(topByTickets);
    } else {
        buildRows(MOVIES);
    }
});

// On page load, show the data for all movies
buildRows(MOVIES);

