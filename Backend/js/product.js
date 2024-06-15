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
firebase.initializeApp(firebaseConfig);

document.getElementById('uploadForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const itemName = document.getElementById('itemName').value;
    const itemPrice = document.getElementById('itemPrice').value;
    const itemImage = document.getElementById('itemImage').files[0];
    const category = document.getElementById('category').value;

    const storageRef = firebase.storage().ref();
    const databaseRef = firebase.database().ref();

    // Create a unique file name
    const imageFileName = new Date().getTime() + '-' + itemImage.name;
    const uploadTask = storageRef.child(`${category}_buy/${imageFileName}`).put(itemImage);

    uploadTask.on('state_changed', 
        function(snapshot) {
            // Progress function (optional)
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
        }, 
        function(error) {
            // Error function
            console.error('Upload failed:', error);
        }, 
        function() {
            // Complete function
            uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
                const product = {
                    itemName: itemName, // Make sure the field names match
                    itemPrice: itemPrice, // Make sure the field names match
                    imageUrl: downloadURL,
                    category: category
                };

                databaseRef.child(`${category}_buy`).push(product, function(error) {
                    if (error) {
                        console.error('Error saving product:', error);
                    } else {
                        alert('Product uploaded successfully!');
                        document.getElementById('uploadForm').reset();
                    }
                });
            });
        }
    );
});
