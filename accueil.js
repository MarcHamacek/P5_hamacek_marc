fetch("http://localhost:3000/api/cameras").then(function(response) {
    return response.json();
}) .then(function(data) {
    const products = document.getElementById('products');
    for(product of data) {
        console.log(product)
        products.innerHTML += ` 
        <section class="col-12 col-lg-6">
            <section class="card">
                <img class="card-img-top" src="${product.imageUrl}" alt="">
                <section class="card-body">
                    <h2 class="card-title">${product.name}</h2>
                    <p class="card-text">${product.description}</p>
                </section>
                <section class="btn-article">
                    <a class="btn btn-success col-6 col-lg-4" href="produit.html?id=${product._id}" role="button">Voir détails</a>
                </section>
            </section>
        </section>

        `
    }
})

