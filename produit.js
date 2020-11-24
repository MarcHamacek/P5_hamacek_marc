const params = new URLSearchParams(location.search);
const id = params.get('id');
console.log(id);

fetch(`http://localhost:3000/api/cameras/${id}`).then(function (response) {
    return response.json();
}).then(function (data) {
    const productDetail = document.getElementById('product._id');
    const detail = document.getElementById('product-details');
    console.log(data)
    detail.innerHTML += `
        <section class="col-10">
            <section class="card detail-produit">
                <img src="${data.imageUrl}" alt="" class="card-img-top">
                <section class="card-body">
                    <section class="row">
                        <section class="col text-left">
                            <h2 class="card-title">${data.name}</h2>
                        </section>
                    </section>
                    <p class="card-text">${data.description}</p>
                </section>
                <section class="card-body">
                    <label for="lenses-select">Choisissez votre lentille :</label>
                    <select name="lenses" id="lenses-select">
                        <option value="">--Sélectionnez--</option>
                    </select>
                </section>
                <section class="card-body">
                    <section class="col text-center">
                        <h2 class="card-title price">${data.price}</h2>
                    </section>
                </section>
                <section class="btn-article">
                    <button id="ajout-panier" class="btn btn-success col-8 col-lg-4">Ajouter au panier</button>
                </section>
            </section>
        </section>
        
        `

    //Ajout de l'option "lenses" à la fiche produit
    const lenses = document.getElementById('lenses-select')
    for (lense of data.lenses) {
        lenses.innerHTML += `
            <option value="">${lense}</option>
            `
    }

    const ajoutPanier = document.getElementById('ajout-panier');

    function productStorage() {
        const produit = new Product(data._id, data.name, data.description, data.price, data.imageUrl, 1);
        if (localStorage.getItem('products') === null) {
            const productsArray = [produit];
            const productsString = JSON.stringify(productsArray);
            localStorage.setItem('products', productsString);
        } else {
            // On extrait d'abord la liste des produits existants sous forme de tableau
            const productsString = localStorage.getItem('products');
            const products = JSON.parse(productsString);

            // On vérifie si le produit qu'on tente d'ajouter ne se trouve pas déjà dans ce tableau
            const productsFound = products.filter((product) => product.id == produit.id);
            if (productsFound.length > 0) {
                // Si il'y trouve déjà, on incrémente sa quantité
                productsFound[0].quantity += 1;
            } else {
                // Sinon, on le rajoute dans le tableau
                products.push(produit)
            }
            // On sauvegarde de nouveau le tableau
            const productsStr = JSON.stringify(products);
            localStorage.setItem('products', productsStr);
        }
    };

    ajoutPanier.addEventListener('click', function () {
        window.alert("Votre produit a bien été ajouté au panier !");
        productStorage();
    });
})

class Product {
    constructor(id, name, description, price, imageUrl, quantity) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.imageUrl = imageUrl;
        this.quantity = quantity;
    }
}