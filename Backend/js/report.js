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
firebase.initializeApp(firebaseConfig);

const database = firebase.database();
const storage = firebase.storage();

document.addEventListener("DOMContentLoaded", function() {
    const reportContainer = document.getElementById("report-container");

    // Fetch data from Firebase Realtime Database
    database.ref('map_data').once('value', (snapshot) => {
        const data = snapshot.val();
        if (data) {
            Object.keys(data).forEach(key => {
                const item = data[key];
                const itemContainer = document.createElement("div");
                itemContainer.className = "report-item";

                const img = document.createElement("img");
                img.src = item.imageUrl;
                img.alt = item.description;

                const description = document.createElement("p");
                description.textContent = `Description: ${item.description}`;

                const location = document.createElement("p");
                location.textContent = `Location: ${item.name} (Lat: ${item.latitude}, Lng: ${item.longitude})`;

                itemContainer.appendChild(img);
                itemContainer.appendChild(description);
                itemContainer.appendChild(location);
                reportContainer.appendChild(itemContainer);
            });
        } else {
            reportContainer.textContent = "No data available";
        }
    }).catch(error => {
        console.error("Error fetching data: ", error);
    });
});