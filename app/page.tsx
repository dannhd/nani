export default function Home() {
  return (
    <main className="scene">
      <div className="scene__art" aria-hidden="true" />
      <div className="scene__wash" aria-hidden="true" />
      <div className="city-side city-side--left" aria-hidden="true" />
      <div className="city-side city-side--right" aria-hidden="true" />
      <div className="scanlines" aria-hidden="true" />

      <header className="brand-badge" aria-label="Spider Date, Nueva York">
        <span className="brand-badge__top">NYC // 20:00</span>
        <span className="brand-badge__title">SPIDER DATE</span>
      </header>

      <section
        className="question-card"
        aria-labelledby="question-title"
        data-question-card
      >
        <span className="corner corner--one" aria-hidden="true" />
        <span className="corner corner--two" aria-hidden="true" />
        <span className="question-card__eyebrow">UNA PREGUNTA IMPORTANTE</span>
        <h1 id="question-title">
          ¿Aceptarías ver el hombre araña con su novio?
        </h1>
        <div className="answers" aria-label="Elige tu respuesta">
          <button
            className="answer answer--yes"
            type="button"
            data-answer="yes"
            aria-label="Sí, acepto"
          >
            SÍ
          </button>
          <button
            className="answer answer--no"
            type="button"
            data-answer="no"
            aria-label="No"
          >
            NO
          </button>
        </div>
        <p className="answer-status" data-answer-status aria-live="polite">
          Elige sabiamente, héroe del barrio.
        </p>
      </section>

      <section
        className="coupon-stage"
        data-coupon-stage
        aria-labelledby="coupon-title"
        hidden
      >
        <div className="heart-burst" aria-hidden="true">
          <span>♥</span>
          <span>♥</span>
          <span>♥</span>
          <span>♥</span>
          <span>♥</span>
          <span>♥</span>
        </div>

        <article className="coupon-ticket" tabIndex={-1} data-coupon-ticket>
          <div className="coupon-photo-panel">
            <div className="coupon-photo-frame">
              {/* Standalone HTML and the hosted app intentionally share this local asset. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/coupon-photo.jpeg"
                alt="Andrés y su cita en la fotografía del cupón"
                decoding="async"
              />
            </div>
            <span className="photo-heart photo-heart--one" aria-hidden="true">
              ♥
            </span>
            <span className="photo-heart photo-heart--two" aria-hidden="true">
              ♥
            </span>
          </div>

          <div className="coupon-details">
            <div className="coupon-details__frame">
              <span className="coupon-eyebrow">CUPÓN ESPECIAL</span>
              <h2 id="coupon-title">¡Gracias por aceptar la cita! ❤️</h2>
              <p className="coupon-intro">Puedes canjear este cupón por:</p>

              <div className="coupon-options">
                <strong>💋 Un millón de besos de Andrés</strong>
                <span>o</span>
                <strong>🎁 Un regalito especial</strong>
              </div>

              <div className="coupon-validity">
                <span>Válido exclusivamente para esta cita ❤️</span>
                <small>Sin fecha de vencimiento</small>
              </div>

              <button
                className="coupon-accept"
                type="button"
                data-coupon-accept
              >
                ❤️ Acepto mi cupón
              </button>
              <p className="coupon-status" data-coupon-status aria-live="polite" />
            </div>
          </div>
        </article>
      </section>

      <footer className="scene-footer">
        <span>QUEENS</span>
        <span aria-hidden="true">◆</span>
        <span>BROOKLYN</span>
      </footer>
      <script src="/script.js" defer />
    </main>
  );
}
