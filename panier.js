
//Récupérer les éléments du local storage
const productsString = localStorage.getItem('products');

//Transcrire en JSON
const products = JSON.parse(productsString);


//Création d'une boucle pour intégrer tous les produits
let totalPriceOfOrder = 0;
for(product of products) {
    const monPanier = document.getElementById('mon-panier');
    console.log(product)
    const totalPricePerProduct = product.price * product.quantity;
    totalPriceOfOrder += totalPricePerProduct;
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
            <section class="card col-2 text-center">S
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
                    <h3 class="card-text">${totalPricePerProduct}</h3>
                </section>    
            </section>

`
}
const totalPrice = document.getElementById('total-price');
totalPrice.innerHTML += `
        <section class="card col-10 text-right">
            <h3>Prix total</h3>
        </section>
        <section class="card col-2 text-center">
            <h3>${totalPriceOfOrder}</h3>
        </section>

`

//Envoi du formaulaire au back-end



//Récupérer les données du formulaire

//Récupérer les ID des produits

//Les mettres sous forme d'array

//Au clic du bouton, envoyer les données

const orderToSend = document.getElementById('sendOrder');
/*orderToSend.addEventListener('click', function() {

})*/

