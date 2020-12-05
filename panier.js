//Récupérer les éléments du local storage
const productsString = localStorage.getItem('products');

//Transcrire en JSON
const products = JSON.parse(productsString);

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

//Validation du formulaire

const error = document.querySelector('.error');

// Fonction qui nous sert à vérifier les inputs utilisateur, hors email et adresse
function validateInput(name, nbrCaracteres, message) { 

    let reg = new RegExp(`^[a-zA-Z \u00C0-\u00FF ]{2,${nbrCaracteres}}$`, "i") ;
    let input = document.getElementById(name);
    const error = document.querySelector(`.error.${name}`);

    if(reg.test(input.value)) { // Si c'est ok, on valide et on enlève le message d'alerte si il était là
        error.innerHTML = "";
        return true;
    } else { // Ajouter un message d'erreur

        error.innerHTML = message;
        input.focus();
        return false;
    }
};

// Fonction qui nous sert à vérifier l'adresse
function validateAddress() { 

    let reg = /^\d+\s[A-z]+\s[A-z]+/;
    let addressInput = document.getElementById('address');
    const error = document.querySelector(`.error.address`);

    if(reg.test(addressInput.value)) { // Si c'est ok, on valide et on enlève le message d'alerte si il était là
    error.innerHTML = "";
    return true;
    } else { // Ajouter un message d'erreur
        error.innerHTML = "Votre addresse n'est pas valide, elle doit contenir entre 5 et 50 caractères !"
        addressInput.focus();
        return false;
    }
};

// Fonction qui nous sert à vérifier l'email
function validateEmail() { 

    let reg = /^([\w\.\-]+)@([\w\-]+)((\.(\w){2,3})+)$/;
    let emailInput = document.getElementById('email');
    const error = document.querySelector(`.error.email`); 

    if(reg.test(emailInput.value)) { // Si c'est ok, on valide et on enlève le message d'alerte si il était là
        error.innerHTML = "";
        return true;
    } else { // Ajouter un message d'erreur
        error.innerHTML = "Votre email n'est pas valide !"
        emailInput.focus();
        return false;
    }
};



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
    const isPrenomValid = validateInput('firstName', 20, "Votre prénom n'est pas valide, il doit contenir entre 2 et 20 caractères !");
    const isNomValid = validateInput('lastName', 20, "Votre nom n'est pas valide, il doit contenir entre 2 et 20 caractères !");
    const isVilleValid = validateInput('city', 50, "Le nom de votre ville n'est pas valide, il doit contenir entre 2 et 50 caractères !");
    const isAddressValid = validateAddress();
    const isEmailValid = validateEmail();
    if (isPrenomValid == false || isNomValid == false || isVilleValid == false || isAddressValid == false || isEmailValid == false) {
        return;
    }
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