const produitPanier = document.getElementById('mon-panier');
function produitChoisi() {
    var name = localStorage.getItem('productName');
    var description = localStorage.getItem('productDescription')
    var price = localStorage.getItem('productPrice');
}

produitPanier.innerHTML = `
            <section class="card col-8">
                <section class="card-body">
                    <h2 class="card-title">${name}</h2>
                    <p class="card-text">${description}</p>
                </section>    
            </section>
            <section class="card col-2">
                <section class="card-body">
                    <label for="quantity-select">Quantité</label>
                    <select name="quantity" id="quantity-select">
                        <option value="">--Sélectionnez--</option>
                        <option value="">1</option>
                        <option value="">2</option>
                        <option value="">3</option>
                    </select>
                </section>    
            </section>
            <section class="card col-2">
                <section class="card-body">
                    <h2 class="card-text">${price} €</h2>
                </section>    
            </section>

            `