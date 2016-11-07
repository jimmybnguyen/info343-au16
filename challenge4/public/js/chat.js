/*
 * This file should contain code for the following tasks:
 * 1. Display the list of chat messages.
 * 2. Send a new message.
 * 3. Allow a user to edit and delete their own messages.
 * 4. Allow a user to log out.
 * 5. Redirect a user to index.html if they are not logged in.
 */
var messagesList = document.getElementById("messages");
var logoutButton = document.getElementById("logout");
var currentUser;
var currentChannel;

logoutButton.addEventListener("click", function (e) {
    firebase.auth().signOut();
});

firebase.auth().onAuthStateChanged(function(user) {
    // If the user is logged in, user will be an object (truthy).
    // Otherwise, it will be null (falsey).
    if (user) {
        currentUser = user;

        // Connect to firebase
        var database = firebase.database();
        var messages = database.ref('channels/general');
        
        /*
        if (!user.emailVerified) {
            messageInput.disabled = true;
            messageInput.placeholder = "Please verify your email to post.";
        }*/

        // This event listener will be called for each item
        // that has been added to the list.
        // Use this to generate each chat message,
        // both on initial page load and whenver someone creates a new message.
        messages.on('child_added', function(data) {
            var id = data.key;
            var message = data.val();
            var text = message.text;
            var timestamp = message.timestamp;
            
            var image = document.createElement("img");
            image.classList.add("profile-img");
            image.classList.add("circle");
            image.src = message.photoURL;
            image.id = id;
            
            var name = document.createElement("h5");
            name.innerText = message.displayName;
            name.classList.add("display-name");
            name.classList.add("inline");
            name.id = id;
            
            var postDate = document.createElement("span");
            postDate.classList.add("message-extra");
            postDate.textContent = moment(message.timestamp);
            postDate.id = id;
            
            var editText = document.createElement("span");
            editText.id = id;
            editText.classList.add("edit-text");
            editText.textContent = "Edited on ";
            
            var editTime = document.createElement("span");
            editTime.id = id;
            editTime.classList.add("edit-date");
            editTime.textContent = moment(message.editTime);
            
            var editButton = document.createElement("span");
            editButton.classList.add("message-extra");
            editButton.textContent = "Edit";
            editButton.id = id;
            
            editButton.addEventListener("click", function(e) {
                e.preventDefault();
                
                if (user.email == message.email) {
                    var editedMessage = prompt("Edit your message", text);
                    // Edits the message if editMessage is not null
                    // and is not the same as the old text
                    if (editedMessage && editedMessage !== text) {
                        messages.child(id).update({"text": editedMessage, "editTime": new Date().getTime()});
                    }
                }

            });
            
            var deleteButton = document.createElement("span");
            deleteButton.classList.add("message-extra");
            deleteButton.textContent = "Delete";
            //deleteButton.id = id;
            
            deleteButton.addEventListener("click", function(e) {
                e.preventDefault();
                if (user.email == message.email) {
                    var deleteConfirm = confirm("Are you sure you want to delete this message?");
                    if (deleteConfirm) {
                        messages.child(id).remove();
                    }
                }
            });

            var messageLi = document.createElement("li");
            //messageLi.id = id;
            messageLi.innerText = text;
            if (user.email !== message.email) {
                editButton.classList.add("hidden");
                deleteButton.classList.add("hidden");
            }

            messagesList.appendChild(image);
            messagesList.appendChild(name);
            messagesList.appendChild(postDate);
            if (message.editTime != "") {
                messagesList.appendChild(editText);
                messagesList.appendChild(editTime);
            }
            messagesList.appendChild(editButton);
            messagesList.appendChild(deleteButton);
            messagesList.appendChild(messageLi);
            
        });

        // This event listener will be called whenever an item in the list is edited.
        // Use this to update the HTML of the message that was edited.
        messages.on('child_changed', function(data) {
            var id = data.key;
            var message = data.val();

        });

        // This event listener will be called whenever an item in the list is deleted.
        // Use this to remove the HTML of the message that was deleted.
        messages.on('child_removed', function(data) {
            var id = data.key;
            //Does not delete everything
            //var delete = document.getElementById(id);
            //messagesList.removeChild(delete);
            
        });

    } else {
        // If the user is not logged in, redirect to index.html
        window.location.href = "index.html";
    }
});

var messageForm = document.getElementById("message-form");
var messageInput = document.getElementById("message-input");

// When the user submits the form to send a message,
// add the message to the list of messages.
messageForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Connect to the firebase data
    var database = firebase.database();

    // Get the ref for your messages list
    var messages = database.ref('channels/general');

    // Get the message the user entered
    var message = messageInput.value;
    
    if (message !== "") {
        // Create a new message and add it to the list.
        messages.push({
            displayName: currentUser.displayName,
            email: currentUser.email,
            photoURL: currentUser.photoURL,
            text: message,
            timestamp: new Date().getTime(), // unix timestamp in milliseconds
            editTime: ""
        })
        .then(function () {
            // message created succesfully
        })
        .catch(function(error) {
            // message not created succesfully
        });
    }
    messageForm.reset();
});
