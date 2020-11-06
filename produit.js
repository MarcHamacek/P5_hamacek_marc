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
                    <a id="ajout-panier" class="btn btn-success col-4" href="">Ajouter au panier</a>
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



