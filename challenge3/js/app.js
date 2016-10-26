"use strict";

document.addEventListener("DOMContentLoaded", function() {
    // Making sure JS loads
    console.log("Document Readay");
    
    // Checking global variable
    //console.log(MOVIES);
    //console.log(genreSales);
});

var dropdown = document.querySelector("#report-select");
var table = document.querySelector("#report");

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

function compareTitle(a, b) {
    var str1 = a.title;
    var str2 = b.title
    return str1.localeCompare(str2);
}

function compareReleased(a, b) {
    return parseInt(a.released) - parseInt(b.released);
}

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

var avgByGenre = [];
//var genreSales = [];
//var genreSales = new Set();

/*
function genreSumSales() {
    for (var i = 0 ; i < MOVIES.length; i++) {
        if (!genreSales.hasOwnProperty(MOVIES[i].genre)) {
            genreSales.push({genre: MOVIES[i].genre, sales: MOVIES[i].sales, count: 1})   
        } else {
            console.log("else");    
        }
    }
}
*/
/*
function genreSumSales() {
    var genreSales = {};
    
    MOVIES.forEach(function(item) {
        
        //if the genre is not in the object yet, create a new key with
        //the genre and the value of sales at index 0, and a count at index 1
        if (!(item.genre in genreSales)) {;
            genreSales[item.genre] = [item.sales];
            genreSales[item.genre][1] = 1;

        //if the genre is in the object, add the sales to the old sales amount
        //at index 0, and increase count by 1 at index 1
        } else {
            genreSales[item.genre][0] += item.sales;
            genreSales[item.genre][1] += 1;

        }
    });
    //console.log(genreSales);
    var genreAvg = [];
    for (var item in genreSales) {
        console.log(item);
    }
}*/

function genreSumSales() {
    var genreSales = {};
    
    MOVIES.forEach(function(item) {
        
        //if the genre is not in the object yet, create a new key with
        //the genre, and add in the genre name and sales
        if (!(item.genre in genreSales)) {;
            genreSales[item.genre] = {genre : item.genre, sales : item.sales, count: 1};

        //if the genre is in the object, add the sales to the old sales amount
        //and increase count by 1
        } else {
            genreSales[item.genre].sales += item.sales;
            genreSales[item.genre].count += 1;

        }
    });
    console.log(genreSales.keys);
    for (var item in genreSales) {
        //console.log(item);
    }
}


/* set
function genreSumSales() {
    for (var i = 0; i < MOVIES.length; i++) {
        if (!genreSales.has(MOVIES[i].genre)) {
            var test = {genre: MOVIES[i].genre, sales: MOVIES[i].sales, count: 1};
            genreSales.add(test);
        }
    }
}*/

/*
function genreSumSales() {
    for (var i = 0 ; i < MOVIES.length; i++) {
            genreSales[MOVIES[i].genre] = MOVIES[i].sales;
        if (!MOVIES[i].genre in genreSales) {
            genreSales[MOVIES[i].genre] = MOVIES[i].sales;
            genreSales["count"] = 1;
        } else {
            
        }
    }
}*/


genreSumSales();

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

