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

const plasticItemsContainer = document.getElementById('plastic-items-container');

firebase.database().ref('plastic_recycle_buy').on('value', snapshot => {
    plasticItemsContainer.innerHTML = '';
    snapshot.forEach(childSnapshot => {
        const item = childSnapshot.val();
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('item');
        itemDiv.innerHTML = `
            <h3>${item.itemName}</h3>
            <p>Price: $${item.itemPrice}</p>
            <img src="${item.imageUrl}" alt="${item.itemName}" />
            <button class="buy-button" data-id="${childSnapshot.key}">Buy Now</button>
        `;
        plasticItemsContainer.appendChild(itemDiv);
    });

    document.querySelectorAll('.buy-button').forEach(button => {
        button.addEventListener('click', (e) => {
            const itemId = e.target.getAttribute('data-id');
            window.location.href = `item_details.html?id=${itemId}&category=plastic`;
        });
    });
});
