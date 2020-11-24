const confirmationMessage = document.getElementById('confirmation');
//Récupérer ID de la commande
const orderId = localStorage.getItem('orderId');
//L'afficher dans le message
confirmationMessage.innerHTML = `
        <section class="col-8 mx-auto">
            <section class="card">
                <section class="card-body text-center">
                    <h2 class="card-title">Votre numéro de commande est le :</h2>
                    <h4 class="card-text pt-4 pb-4">${orderId}</h4>
                    <h4 class="card-text">Vous recevrez vos articles sous 5 jours !</h4>
                </section>
            </section>
        </section>
`

//Vider le local storage une fois la commande passée
localStorage.removeItem('products');
localStorage.removeItem('orderId');