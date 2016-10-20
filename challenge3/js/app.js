"use strict";

document.addEventListener("DOMContentLoaded", function() {
    console.log("Document Readay");
});

var dropdown = document.querySelector("#dropdown");
var table = document.querySelector(".table");

var starWars = MOVIES.filter(function (movie) {
    return movie.title.toLowerCase() === "star wars";
});

function buildRows(rows) {
    
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
    } else if (value === "20th") {
        buildRows(th);
    } else if (value === "avg-by-genre") {
        buildRows(avgByGenre);
    } else if (value === "top-by-tickets") {
        buildRows(topByTickets);
    } else {
        buildRows(MOVIES);
    }
});

// On page load, show the data for all movies
buildRows(MOVIES);
