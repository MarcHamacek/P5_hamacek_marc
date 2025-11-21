import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
  const imageLink = '/images/logo-orinoco-min.jpg';

  return (
    <header className="header-color">
      <section className="container">
        <section className="row">
          <nav className="col navbar navbar-expand-lg bg-transparent navbar-light">
            <Link href="/" className="navbar-brand">
              <Image src={imageLink} alt="Orinoco" width={300} height={300} />
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarContent"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div id="navbarContent" className="collapse navbar-collapse">
              <ul className="navbar-nav">
                <li className="nav-item active">
                  <Link href="/" className="nav-link">
                    Accueil
                  </Link>
                </li>
                <li className="nav-item">
                  <Link href="/cart" className="nav-link">
                    Mon panier
                  </Link>
                </li>
                <li className="nav-item">
                  <a href="mailto:contact@orinoco.com" className="nav-link">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
          </nav>
        </section>
      </section>
    </header>
  );
}
