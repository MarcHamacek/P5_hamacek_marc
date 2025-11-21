'use client';

import { FormEvent } from 'react';

export default function CartPage() {
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const contact = {
      firstName: (document.getElementById('firstName') as HTMLInputElement)
        .value,
      lastName: (document.getElementById('lastName') as HTMLInputElement).value,
      address: (document.getElementById('address') as HTMLInputElement).value,
      city: (document.getElementById('city') as HTMLInputElement).value,
      email: (document.getElementById('email') as HTMLInputElement).value,
    };

    if (
      !contact.firstName ||
      !contact.lastName ||
      !contact.address ||
      !contact.city ||
      !contact.email
    ) {
      alert('Veuillez remplir tous les champs du formulaire.');
      return;
    }

    try {
      const cartRes = await fetch('/api/cart');
      if (!cartRes.ok) throw new Error('Impossible de récupérer le panier');
      const cartData = await cartRes.json();
      const products = (cartData.items || []).map(
        (it: { productId: string }) => it.productId
      );

      const orderRes = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contact, products }),
      });

      if (!orderRes.ok) {
        const err = await orderRes.json();
        throw new Error(err?.error || 'Erreur lors de la commande');
      }

      const body = await orderRes.json();
      const { orderId } = body;

      window.location.href = '/confirmation?orderId=' + orderId;
    } catch (err) {
      console.error('Order submit failed', err);
      alert('Une erreur est survenue lors de la commande.');
    }
  };

  return (
    <div>
      <h1>Formulaire</h1>
      <form className="form" id="formUser">
        <section className="row">
          <section className="form-group col-4">
            <label htmlFor="firstName" className="form-check-label">
              Prénom
            </label>
            <input
              type="text"
              className="form-control"
              id="firstName"
              required
            />
            <div className="error firstName alert-danger mt-2"></div>
          </section>
          <section className="form-group col-8">
            <label htmlFor="lastName" className="form-check-label">
              Nom
            </label>
            <input
              type="text"
              className="form-control"
              id="lastName"
              pattern="[A-Za-z]{2,20}"
              required
            />
            <div className="error lastName alert-danger mt-2"></div>
          </section>
        </section>
        <section className="row">
          <section className="form-group col-12">
            <label htmlFor="address" className="form-check-label">
              Addresse
            </label>
            <input
              type="text"
              className="form-control"
              id="address"
              pattern="[A-Za-z0-9]{5,50}"
              required
            />
            <div className="error address alert-danger mt-2"></div>
          </section>
        </section>
        <section className="row">
          <section className="form-group col-4">
            <label htmlFor="city" className="form-check-label">
              Ville
            </label>
            <input
              type="text"
              className="form-control"
              id="city"
              pattern="[A-Za-z]{2,50}"
              required
            />
            <div className="error city alert-danger mt-2"></div>
          </section>
          <section className="form-group col-8">
            <label htmlFor="email" className="form-check-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              pattern="[a-z\.\-]+@[a-z]+\.[a-z]{2,3}"
              required
            />
            <div className="error email alert-danger mt-2"></div>
          </section>
        </section>
        <section className="row">
          <section className="col btn-commander mt-4">
            <button
              onClick={handleSubmit}
              className="btn btn-success col-4"
              id="sendOrder"
              type="button"
            >
              Commander
            </button>
          </section>
        </section>
      </form>
    </div>
  );
}
