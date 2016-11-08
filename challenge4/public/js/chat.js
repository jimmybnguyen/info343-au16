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
var generalRef = firebase.database().ref("channels/general");
var memesRef = firebase.database().ref("channels/memes");

var currentRef = generalRef;

var generalButton = document.getElementById("general-button");
var memesButton = document.getElementById("memes-button");
var channelName = document.querySelector(".channel-name");
channelName.textContent = "General";
var currentUser;

logoutButton.addEventListener("click", function (e) {
    firebase.auth().signOut();
});

generalButton.addEventListener("click", function() {
    currentRef.off();
    currentRef = generalRef;
    channelName.textContent = "General";
})

memesButton.addEventListener("click", function() {
    currentRef.off();
    currentRef = memesRef;
    channelName.textContent = "Memes";
})

firebase.auth().onAuthStateChanged(function(user) {
    // If the user is logged in, user will be an object (truthy).
    // Otherwise, it will be null (falsey).
    if (user) {
        currentUser = user;
        /*
        // Connect to firebase
        var database = firebase.database();
        var messages = database.ref('channels/general');
        */
        var messages = currentRef;
        /*
        if (!user.emailVerified) {
            messageInput.disabled = true;
            messageInput.placeholder = "Please verify your email to post, edit, and delete.";
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
            image.id = "img" + id;
            image.classList.add("profile-img");
            image.classList.add("circle");
            image.src = message.photoURL;
            
            var name = document.createElement("h5");
            name.id = "name" + id;
            name.innerText = message.displayName;
            name.classList.add("display-name");
            name.classList.add("inline");
            
            var postDate = document.createElement("span");
            postDate.id = "post-date" + id;
            postDate.classList.add("message-extra");
            postDate.textContent = moment(message.timestamp).format("MMMM Do YYYY, h:mm:ss a");
            
            var editText = document.createElement("span");
            editText.id = "edit-text" + id;
            editText.classList.add("edit-text");
            editText.textContent = "Edited on ";
            
            var editTime = document.createElement("span");
            editTime.id = "edit-time" + id;
            editTime.classList.add("edit-time");
            editTime.textContent = moment(message.editTime).format("MMMM Do YYYY, h:mm:ss a");
            
            var editButton = document.createElement("span");
            editButton.id = "edit-button" + id;
            editButton.classList.add("message-extra");
            editButton.textContent = "Edit";
            
            var deleteButton = document.createElement("span");
            deleteButton.id = "delete-button" + id;
            deleteButton.classList.add("message-extra");
            deleteButton.textContent = "Delete";
            
            
            if (user.emailVerified) {
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
                
                deleteButton.addEventListener("click", function(e) {
                    e.preventDefault();
                    if (user.email == message.email) {
                        var deleteConfirm = confirm("Are you sure you want to delete this message?");
                        if (deleteConfirm) {
                            messages.child(id).remove();
                        }
                    }
                });
                
            // Email is not verified
            } else {
                messageInput.disabled = true;
                messageInput.placeholder = "Please verify your email to post, edit, and delete.";
            }
            
            var messageLi = document.createElement("li");
            messageLi.id = "chat-message" + id;
            messageLi.innerText = text;
            if (user.email !== message.email) {
                editButton.classList.add("hidden");
                deleteButton.classList.add("hidden");
            }
            
            messagesList.appendChild(image);
            messagesList.appendChild(name);
            messagesList.appendChild(postDate);
            
            // If the message has been edited, adds in 
            // element to show the chat message has been edited
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
            
            // The text from the prompt box
            var newText = message.text;

            var messageToEdit = document.getElementById("chat-message" + id);
            messageToEdit.textContent = newText;
            
            // Grabbing this as a reference, edit text and time will
            // be appended before the edit button
            var editButton = document.getElementById("edit-button" + id);
            
            // Adding in elements to show the message has been edited
            var editText = document.createElement("span");
            editText.id = "edit-text" + id;
            editText.classList.add("edit-text");
            editText.textContent = "Edited on ";
            
            var editTime = document.createElement("span");
            editTime.id = "edit-time" + id;
            editTime.classList.add("edit-time");
            editTime.textContent = moment(message.editTime).format("MMMM Do YYYY, h:mm:ss a");
            messagesList.insertBefore(editText, editButton);
            messagesList.insertBefore(editTime, editButton);
        });

        // This event listener will be called whenever an item in the list is deleted.
        // Use this to remove the HTML of the message that was deleted.
        messages.on('child_removed', function(data) {
            var id = data.key;

            // Grabs every element per chat message
            var imageToRemove = document.getElementById("img" + id);
            var nameToRemove = document.getElementById("name" + id);
            var postDateToRemove = document.getElementById("post-date" + id);
            var editTextToRemove = document.getElementById("edit-text" + id);
            var editTimeToRemove = document.getElementById("edit-time" + id);
            var editButtonToRemove = document.getElementById("edit-button" + id);
            var deleteButtonToRemove = document.getElementById("delete-button" + id);
            var chatMessageToRemove = document.getElementById("chat-message" + id);

            imageToRemove.remove();
            nameToRemove.remove();
            postDateToRemove.remove();
            editButtonToRemove.remove();
            deleteButtonToRemove.remove();
            chatMessageToRemove.remove();
            // Checks to see if it is an edited post. If so, delete
            // edited post UI elements
            if (editTextToRemove != null && editTimeToRemove != null) {
                editTextToRemove.remove();
                editTimeToRemove.remove();
            }
        });

    } else {
        // If the user is not logged in, redirect to index.html
        window.location.href = "index.html";
    }
});

var messageForm = document.getElementById("message-form");
var messageInput = document.getElementById("message-input");
var messageError = document.getElementById("message-error");

// When the user submits the form to send a message,
// add the message to the list of messages.
messageForm.addEventListener("submit", function (e) {
    e.preventDefault();
    
    messageError.classList.remove('active');
    /*
    // Connect to the firebase data
    var database = firebase.database();

    // Get the ref for your messages list
    var messages = database.ref('channels/general');
    */
    
    var messages = currentRef;
    
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
            messageError.textContent = error.message;
            messageError.classList.add('active');
        });
    }
    messageForm.reset();
});
