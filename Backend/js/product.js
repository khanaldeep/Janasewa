document.getElementById('uploadForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const itemName = document.getElementById('itemName').value;
    const itemPrice = document.getElementById('itemPrice').value;
    const itemImage = document.getElementById('itemImage').files[0];
    const reader = new FileReader();

    reader.onload = function(e) {
        const imageData = e.target.result;
        const product = {
            name: itemName,
            price: itemPrice,
            image: imageData
        };

        let products = localStorage.getItem('products');
        products = products ? JSON.parse(products) : [];
        products.push(product);
        localStorage.setItem('products', JSON.stringify(products));

        alert('Product uploaded successfully!');
        document.getElementById('uploadForm').reset();
    };

    reader.readAsDataURL(itemImage);
});
