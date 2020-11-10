const params = new URLSearchParams(location.search);
const id = params.get('id');
console.log(id);



fetch(`http://localhost:3000/api/cameras/${id}`).then(function(response) {
    return response.json();
}) .then(function(data) {
    const productDetail = document.getElementById('product._id');
    const detail = document.getElementById('product-details');
        console.log(data)
        detail.innerHTML += `
        <section class="col-10">
            <section class="card detail-produit">
                <img src="${data.imageUrl}" alt="" class="card-img-top">
                <section class="card-body">
                    <section class="row">
                        <section class="col-9">
                            <h2 class="card-title">${data.name}</h2>
                        </section>
                        <section class="col-3">
                            <h2 class="card-title price">${data.price}</h2>
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
                <section class="btn-article">
                    <button id="ajout-panier" class="btn btn-success col-4">Ajouter au panier</button>
                </section>
            </section>
        </section>
        
        `
        const lenses = document.getElementById('lenses-select')
        for(lense of data.lenses) {
            lenses.innerHTML += `
            <option value="">${lense}</option>
            `
        }
})

/*const ajoutPanier = document.getElementById('ajout-panier');
function popUps() {
    const popUp = document.getElementById('btn-popup');
    popUp.innerHTML += `
        <section class="alert alert-success alert-dismissible fade show" role="alert">
            <h5 class="alert-heading">Confirmation</h5>
            <p>Votre produit a bien été ajouté au panier !</p>
            <a id="voir-panier" class="btn btn-success text-center" role="button" href="./panier.html">Voir mon panier</a>
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">×</span>
            </button>
        </section>

        `
};

ajoutPanier.addEventListener('click', popUps);*/

/*const ajoutPanier = document.querySelector("#ajout-panier");
const ajouts = window.alert('Votre produit a bien été ajouté au panier !');

ajoutPanier.addEventListener('click', ajouts, once);*/



/*const ajoutPanier = getElementById('ajout-panier');
function productStorage() {
    localStorage.setItem('productName', data.name);
    localStorage.setItem('productDescription', data.description);
    localStorage.setItem('productPrice', data.price)
};

ajoutPanier.addEventListener('click', function() {
    window.alert("Votre produit a bien été ajouté au panier !");
    console.log(productStorage);
});*/




