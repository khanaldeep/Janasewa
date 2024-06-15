document.addEventListener('DOMContentLoaded', function() {
    const productsContainer = document.getElementById('productsContainer');
    let products = localStorage.getItem('products');
    products = products ? JSON.parse(products) : [];

    products.forEach(product => {
        const productBox = document.createElement('div');
        productBox.classList.add('box');
        productBox.innerHTML = `
            <div class="images">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="content">
                <h3>${product.name}</h3>
                <h4>Cost: Rs ${product.price}</h4>
                <p>Description</p>
                <a href="book.html" class="btn">Buy now</a>
            </div>
        `;
        productsContainer.appendChild(productBox);
    });
});
