/*const produitPanier = document.getElementById('mon-panier');
function produitChoisi() {
    var name = localStorage.getItem('productName');
    var description = localStorage.getItem('productDescription')
    var price = localStorage.getItem('productPrice');
}

produitPanier.innerHTML = `

`*/

//Récupérer les éléments du local storage
const productsString = localStorage.getItem('products');

//Transcrire en JSON
const products = JSON.parse(productsString);


//Création d'une boucle pour intégrer tous les produits

for(product of products) {
    const monPanier = document.getElementById('mon-panier');
    console.log(product)
    //Intégrer la section HTML avec les produits ajoutés au panier
    monPanier.innerHTML += `
            <section class="card col-1">
                <img src="${product.imageUrl}" alt="" height="" class="card-img mt-auto mb-auto">
            </section>
            <section class="card col-5 text-left">
                <section class="card-body">
                    <h3>${product.name}</h3>
                </section>
            </section>
            <section class="card col-2 text-center">
                <section class="card-body">
                    <h3>${product.price}</h3>
                </section>
            </section>
            <section class="card col-2 text-center">
                <section class="card-body">
                    <h3>${product.quantity}</h3>
                </section>    
            </section>
            <section class="card col-2 text-center">
                <section class="card-body">
                    <h3 class="card-text">ns</h3>
                </section>    
            </section>

`
}

