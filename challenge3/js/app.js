"use strict";

document.addEventListener("DOMContentLoaded", function() {
    // Making sure JS loads
    console.log("Document Readay");
    
    // Checking global variable
    console.log(MOVIES);
    console.log(starWars);
});

var dropdown = document.querySelector("#report-select");
var table = document.querySelector("#report");
var genres = [];

var starWars = MOVIES.filter(function (item) {
    return item.title.toLowerCase().includes("star wars");
});

var remake20th = MOVIES.filter(function (item) {
    var movieDate = new Date(item.released);
    var compareDate = new Date("January 1, 2001");
    return movieDate < compareDate;
});

/* .push is crashing the thing
var avgByGenre = MOVIES.filter(function (item) {
    var movieItem = {genre: item.genre, sales: item.sales};
    if (genres.length != 0) {
        for (var i = 0; i < genres.length; i++) {
            if (genres[i].genre !== item.genre) {
               //console.log(genres[i].genre);
                //genres.push(movieItem);
            }
        }
    } else {
        genres.push(movieItem);
    }
});
*/

var avgByGenre = MOVIES.filter(function (item) {
    if (item.title.toLowerCase().includes("star wars")) {
        return {Genre: item.genre};
    }
});

var topByTickets = MOVIES.filter(function (item) {

});


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
    salesTh.textContent = "Sales";

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
            var value = name[key];

            var td = document.createElement("td");
            td.textContent = value;

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

