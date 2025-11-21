'use client';

import { useSearchParams } from 'next/navigation';

export default function CartPage() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');

  return (
    <div>
      <section className="container">
        <section className="row">
          <section className="col">
            <section className="jumbotron">
              <h1 className="text-center alert alert-success p-4">
                Votre commande a bien été validée !
              </h1>
            </section>
          </section>
        </section>
      </section>
      <section className="col-8 mx-auto">
        <section className="card">
          <section className="card-body text-center">
            <h2 className="card-title">Votre numéro de commande est le :</h2>
            <h4 className="card-text pt-4 pb-4">{orderId ?? '—'}</h4>
            <h4 className="card-text">
              Vous recevrez vos articles sous 5 jours !
            </h4>
          </section>
        </section>
      </section>
    </div>
  );
}
