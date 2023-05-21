// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDx5yuIPiuaP3Wda_SNV4RDKug7GrY9Vcw",
    authDomain: "library-8b1aa.firebaseapp.com",
    projectId: "library-8b1aa",
    storageBucket: "library-8b1aa.appspot.com",
    messagingSenderId: "953778451713",
    appId: "1:953778451713:web:ed593784e1b83862f89700",
    measurementId: "G-4GZ78Z8FR2"
};

firebase.initializeApp(firebaseConfig);

// Get a reference to the Firestore database
const db = firebase.firestore();

// Register form submission event listener
const form = document.getElementById('registration-form');
form.addEventListener('submit', async (event) => {
    event.preventDefault();

    // Get form values
    const username = form.username.value;
    const email = form.email.value;
    const password = form.password.value;

    try {
        // Create a new user account using Firebase Authentication
        const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);

        // Get the user ID
        const userId = userCredential.user.uid;

        // Store user details in Firestore
        await db.collection('users').doc(userId).set({
            username: username,
            email: email
        });

        // Registration successful
        console.log('Registration successful!');
        // Redirect to the desired page
        // window.location.href = 'index.html';
    } catch (error) {
        // Registration failed
        console.log('Registration failed:', error);
    }
});
