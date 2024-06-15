// Import Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getDatabase, get, ref, child } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCwzwiuzcu4RfMf5vfGDUUBTfWRgV1UTDs",
    authDomain: "green-street-20e5e.firebaseapp.com",
    projectId: "green-street-20e5e",
    storageBucket: "green-street-20e5e.appspot.com",
    messagingSenderId: "420682581480",
    appId: "1:420682581480:web:6428c4a04a472d94c8905d",
    measurementId: "G-VQ7GX9TK6T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth(app);
const dbref = ref(db);

// Wait until DOM is fully loaded
document.addEventListener('DOMContentLoaded', function () {
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const mainForm = document.getElementById('mainForm');

    mainForm.addEventListener('submit', function (evt) {
        evt.preventDefault();

        signInWithEmailAndPassword(auth, email.value, password.value)
            .then((credentials) => {
                // Store credentials in session storage
                sessionStorage.setItem("user-creds", JSON.stringify(credentials.user));
                
                // Fetch user data from database
                return get(child(dbref, 'UsersAuthList/' + credentials.user.uid));
            })
            .then((snapshot) => {
                if (snapshot.exists()) {
                    sessionStorage.setItem("user-info", JSON.stringify({
                        fname: snapshot.val().firstname,
                        lname: snapshot.val().lastname,
                        cont: snapshot.val().contact
                    }));
                    window.location.href = 'hi.html';
                } else {
                    alert('No user data found.');
                }
            })
            .catch((error) => {
                alert(error.message);
                console.log(error.code);
                console.log(error.message);
            });
    });
});
