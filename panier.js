//Récupérer les éléments du local storage
const productsString = localStorage.getItem('products');

//Transcrire en JSON
const products = JSON.parse(productsString);


//Si le panier est vide, afficher un message le signalant

//Sinon, afficher les produits

//Création d'une boucle pour intégrer tous les produits
let totalPriceOfOrder = 0;
for (product of products) {
    const monPanier = document.getElementById('mon-panier');
    console.log(product)
    //Calcul du prix total par produit
    const totalPricePerProduct = product.price * product.quantity;
    totalPriceOfOrder += totalPricePerProduct;
    //Intégrer la section HTML avec les produits ajoutés au panier
    monPanier.innerHTML += `
            <section class="row">
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
                        <h3 class="card-text">${totalPricePerProduct}</h3>
                    </section>    
                </section>
            </section>
`
}
//Intégration du prix total dans le panier
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

/**
 *
 * Expects request to contain:
 * contact: {
 *   firstName: string,
 *   lastName: string,
 *   address: string,
 *   city: string,
 *   email: string
 * }
 * products: [string] <-- array of product _id
 *
 */


//Récupérer les ID des produits et les intégrer à un tableau

const idProducts = [];
for (var i = 0; i < products.length; i++) {
    var idProduit = products[i].id;
    idProducts.push(idProduit);
}
console.log(idProducts);

const orderToSend = document.getElementById('sendOrder');
orderToSend.addEventListener('click', function (e) {
    e.preventDefault();
    fetch('http://localhost:3000/api/cameras/order', {
            method: 'POST',
            body: JSON.stringify({
                //Récupérer les données du formulaire
                contact: {
                    firstName: document.getElementById('firstName').value,
                    lastName: document.getElementById('lastName').value,
                    address: document.getElementById('address').value,
                    city: document.getElementById('city').value,
                    email: document.getElementById('email').value,
                },
                products: idProducts,
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }).then(response => response.json())
        .then(function (response) {
            //Sauvegarder l'orderId
            console.log(response);
            //Stocker l'orderId dans le local storage
            localStorage.setItem('orderId', response.orderId);
            //Redirection vers la page de confirmation au clic sur le bouton 'sendOrder'
            window.location.href = "confirmation.html";
        })
        .catch(function (error) {
            console.error(error)
        });
})