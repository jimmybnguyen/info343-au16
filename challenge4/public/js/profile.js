"use strict";

// Store our DOM elements
var profileForm = document.getElementById("profile-form");
var profileName = document.getElementById("profile-name");
var profileEmail = document.getElementById("profile-email");
var profilePassword = document.getElementById("profile-password");
var profilePasswordConfirm = document.getElementById("profile-password-confirm");
var profileSucess = document.getElementById("profile-success");
var profileError = document.getElementById("profile-error");

firebase.auth().onAuthStateChanged(function(user) {
    
    if (user) {
        profileForm.addEventListener("submit", function (e) {
            e.preventDefault();

            profileError.classList.remove('active');
            profileSucess.classList.remove('active');

            var displayName = profileName.value;
            var email = profileEmail.value;
            var password = profilePassword.value;
            var passwordConfirm = profilePasswordConfirm.value;

            if (password !== passwordConfirm) {
                profileError.textContent = 'Passwords do not match.';
                profileError.classList.add('active');
            } else {
                user.updateProfile({
                    displayName: displayName,
                })
                user.updateEmail(email);
                user.updatePassword(password);
                profileSucess.textContent = "Profile info has been changed.";
                profileSucess.classList.add("active");
            }
        });
  } else {
      window.location.href = "index.html";
  }
});
