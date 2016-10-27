"use strict";

var dropdown = document.querySelector("#report-select");
var table = document.querySelector(".table");

// Only returns Star Wars movies
var starWars = MOVIES.filter(function (item) {
    return item.title.toLowerCase().includes("star wars");
});

starWars.sort(compareString('title'));

// Only returns movies released before Jan 1st, 2001
var remake20th = MOVIES.filter(function (item) {
    var movieDate = new Date(item.released);
    var compareDate = new Date("January 1, 2001");
    return movieDate < compareDate;
});

remake20th.sort(compareNum("released", "asc"));

var avgByGenre = generateGenreAvg();

var topByTickets = generateTop();

var avgByRating = generateRatingAvg();

// http://stackoverflow.com/questions/8537602/any-way-to-extend-javascripts-array-sort-method-to-accept-another-parameter
// Sorts a numerical property by a descending or ascending order
function compareNum(prop, order) {
    return function(a, b) {
        if (order == "desc") {
            return parseInt(b[prop]) - parseInt(a[prop]);
        } else {
            return parseInt(a[prop]) - parseInt(b[prop]);
        }
    }
}

// Sorts string alphabetically
function compareString(prop) {
    return function(a, b) {
        var str1 = a[prop];
        var str2 = b[prop];
        return str1.localeCompare(str2);
    }
}

// Returns an array that represents the average sales per genre
function generateGenreAvg() {
    var genreSales = [];
    
    MOVIES.forEach(function(item) {

        // if the genre is not in the object yet, create a new key with
        // the genre, and add in the the sales and a starting count
        if (!(item.genre in genreSales)) {;
            //genreSales[item.genre] = {genre : item.genre, sales : item.sales, count: 1};
            genreSales[item.genre] = {sales : item.sales, count: 1};             

        // if the genre is in the object, add the sales 
        // to the old sales amountand increase count by 1
        } else {
            genreSales[item.genre].sales += item.sales;
            genreSales[item.genre].count += 1;
        }
    });
    
    var avgSales = [];
    
    // Calculates the average sales of each genre
    for (var key in genreSales) {
        var avg = genreSales[key].sales / genreSales[key].count;
        if (key == "") {
            avgSales.push({genre: "N/A", averageCurrency: avg})
        } else {
            avgSales.push({genre: key, averageCurrency: avg})
        }
    }

    avgSales.sort(compareNum('average', 'desc'));
    return avgSales;
}

// Returns an array that represents top selling movies
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
    topSales.sort(compareNum('tickets', 'desc'));
    
    // only shows the top 100
    topSales.length = 100;
    
    return topSales;
}

// Returns an array that represents average sales and tickets per rating
function generateRatingAvg() {
    var ratingStats = [];
    
    MOVIES.forEach(function(item) {

        if (!(item.rating in ratingStats)) {;
            ratingStats[item.rating] = {sales : item.sales, tickets: item.tickets, count: 1};        
        } else {
            ratingStats[item.rating].sales += item.sales;
            ratingStats[item.rating].tickets += item.tickets;
            ratingStats[item.rating].count += 1;
        }
    });
    
    var ratingAvg = [];
    
    // Calculates the average sales and tickets per rating
    for (var key in ratingStats) {
        var avgSales = ratingStats[key].sales / ratingStats[key].count;
        var avgTickets = ratingStats[key].tickets / ratingStats[key].count;
        ratingAvg.push({rating: key, averageCurrency: avgSales, averageNum : avgTickets})
    }

    var order = ["Not Rated", "G", "PG", "PG-13", "R", "NC-17"];

    // finds the index of each rating in the ratingAvg array
    for (var i = 0; i < order.length; i++) {
        var search = order[i];
        var index = -1;
        for (var j = 0; j < ratingAvg.length; j++) {
            if (ratingAvg[j].rating === search) {
                index = j;
            }
        }
    }
    
    return ratingAvg;
}

function buildTable(type) {
    
    // table body and table head
    var tbody = document.createElement("tbody");
    var thead = document.createElement("thead");
    
    // Row for the header
    var threadRow = document.createElement("tr");
    
    // builds specific tables for specific reports
    if (type == 'genre') {
        // Columns for the header
        var genreTh = document.createElement("th");
        genreTh.textContent = "Genre";

        var avgTh = document.createElement("th");
        avgTh.textContent = "Average Sales";
        
        // Append these elements to the table
        threadRow.appendChild(genreTh);
        threadRow.appendChild(avgTh);
    } else if (type == 'top') {
        var titleTh = document.createElement("th");
        titleTh.textContent = "Title";

        var ticketsTh = document.createElement("th");
        ticketsTh.textContent = "Tickets Sold";

        threadRow.appendChild(titleTh);
        threadRow.appendChild(ticketsTh);
    } else if (type == 'rating') {
        var ratingTh = document.createElement("th");
        ratingTh.textContent = "Rating";

        var salesTh = document.createElement("th");
        salesTh.textContent = "Average Sales";

        var ticketsTh = document.createElement("th");
        ticketsTh.textContent = "Average Tickets";

        threadRow.appendChild(ratingTh);
        threadRow.appendChild(salesTh);
        threadRow.appendChild(ticketsTh);
    } else {
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

        threadRow.appendChild(titleTh);
        threadRow.appendChild(releasedTh);
        threadRow.appendChild(distributorTh);
        threadRow.appendChild(genreTh);
        threadRow.appendChild(ratingTh);
        threadRow.appendChild(yearTh);
        threadRow.appendChild(salesTh);
        threadRow.appendChild(ticketsTh);
    }
    
    thead.appendChild(threadRow);
    table.appendChild(tbody);
    table.appendChild(thead);
}

function buildRows(rows, type) {
    
    // builds the specific table for the selected report
    if (type == 'genre') {
        buildTable(type);
    } else if (type == 'top') {
        buildTable(type);
    } else if (type == 'rating') {
        buildTable(type);
    } else {
        buildTable(type);
    }

    // Find the table body, where the rows will be rendered.
    var tbody = document.querySelector("tbody");
    
    // Iterate over each movie title,
    // create the tr (row element) and td elements (column elements)
    // and append to the table body.
    rows.forEach(function (name) {
        var nameTr = document.createElement("tr");

        // Object.keys returns an array of the keys object
        var nameKeys = Object.keys(name);

        // formats the values in the rows using numeral.js and moment.js
        nameKeys.forEach(function (key) {
            var formatted = "";
            var value = name[key];
            if (key == "tickets") {
                formatted = numeral(value).format('0,0');
            } else  if (key == "sales") {
                formatted = numeral(value).format('$0,0p[.]00');
            } else if (key == "released") {
                formatted = moment(value).format("l");
            } else if (key == "averageCurrency") {
                formatted = numeral(value).format('$0,0.00');
            } else if (key == "averageNum") {
                formatted = numeral(value).format('0,0');
            } else {
                formatted = value;
            }
            var td = document.createElement("td");
            td.textContent = formatted;

            nameTr.appendChild(td);
        });

        tbody.appendChild(nameTr);
    });
    
    // Build totals rows
    var tableFooter = document.createElement("tfoot");
    var totalsTr = document.createElement("tr");
    var totalsNameTd = document.createElement("td");;

    // We don't want anything in the second column
    var blankTd = document.createElement("td");

    var totalsTotalTd = document.createElement("td");

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

    if (value === "star-wars") {
        buildRows(starWars);
    } else if (value === "remake20th") {
        buildRows(remake20th);
    } else if (value === "avg-by-genre") {
        buildRows(avgByGenre, "genre");
    } else if (value === "top-by-tickets") {
        buildRows(topByTickets, "top");
    } else if (value === "avg-by-rating") {
        buildRows(avgByRating, "rating");
    } else {
        buildRows(MOVIES);
    }
});

// Show the data for all movies on page load
buildRows(MOVIES);
