// Get the login form element
const loginForm = document.getElementById("login-form");

// Add a submit event listener to the login form
loginForm.addEventListener("submit", (e) => {
    e.preventDefault(); // Prevent form submission

    // Get the username and password values
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Use Firebase Authentication to sign in
    firebase
        .auth()
        .signInWithEmailAndPassword(username, password)
        .then((userCredential) => {
            // Login successful
            console.log("Login successful!");
            // Redirect to the desired page
            window.location.href = "library.html";
        })
        .catch((error) => {
            // Login failed
            console.log("Login failed:", error.message);
            // Show error message to the user
            alert("Login failed. Please check your credentials.");
        });
});
