// Your web app's Firebase configuration
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

document.getElementById('uploadForm').addEventListener('submit', uploadProduct);

function uploadProduct(event) {
    event.preventDefault();

    // Get form values
    const itemName = document.getElementById('itemName').value;
    const itemPrice = document.getElementById('itemPrice').value;
    const itemImage = document.getElementById('itemImage').files[0];
    const category = document.getElementById('category').value;

    if (!itemImage) {
        alert('Please select an image to upload.');
        return;
    }

    // Create a root reference
    let storageRef;
    let databaseRef;

    // Set the storage and database references based on the selected category
    switch (category) {
        case 'paper_recycle':
            storageRef = firebase.storage().ref('paper_recycle_buy/' + itemImage.name);
            databaseRef = firebase.database().ref('paper_recycle_buy');
            break;
        case 'plastic_recycle':
            storageRef = firebase.storage().ref('plastic_recycle_buy/' + itemImage.name);
            databaseRef = firebase.database().ref('plastic_recycle_buy');
            break;
        case 'clothe_recycle':
            storageRef = firebase.storage().ref('clothe_recycle_buy/' + itemImage.name);
            databaseRef = firebase.database().ref('clothe_recycle_buy');
            break;
        default:
            alert('Please select a valid category.');
            return;
    }

    // Upload the file to Firebase Storage
    storageRef.put(itemImage).then(snapshot => {
        snapshot.ref.getDownloadURL().then(downloadURL => {
            // Store metadata in Firebase Realtime Database
            const newItemRef = databaseRef.push();
            newItemRef.set({
                itemName: itemName,
                itemPrice: itemPrice,
                imageUrl: downloadURL,
                category: category
            }).then(() => {
                alert('Product uploaded successfully!');
            }).catch(error => {
                console.error('Error writing to Firebase Database', error);
            });
        });
    }).catch(error => {
        console.error('Error uploading file to Firebase Storage', error);
    });
}
