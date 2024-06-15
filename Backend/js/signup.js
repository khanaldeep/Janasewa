
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
  import { getDatabase, set, ref } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
const db= getDatabase();
const auth = getAuth(app);

let firstname= document.getElementById('firstname');
let lastname= document.getElementById('lastname');
let email= document.getElementById('email');
let contact= document.getElementById('contact');
let password= document.getElementById('password');
let mainForm= document.getElementById('mainForm');

let RegisterUser = evt => {
    evt.preventDefault();

    createUserWithEmailAndPassword(auth, email.value, password.value)
    .then((credentials)=>{
       set(ref(db, 'UsersAuthList/' + credentials.user.uid),{
        firstname: firstname.value,
        lastname: lastname.value,
        contact: contact.value
       })
       .then(() => {
           alert('Registration Successful!');
           window.location.href = "login.html"; // Redirect to login page after successful registration
       })
       .catch(error => {
           console.error("Error writing document: ", error);
           alert('An error occurred. Please try again later.');
       });
    })
    .catch((error)=>{
        alert(error.message);
        console.log(error.code);
        console.log(error.message);
    })
}

mainForm.addEventListener('submit', RegisterUser);