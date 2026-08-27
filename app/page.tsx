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

      <section className="question-card" aria-labelledby="question-title">
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

      <footer className="scene-footer">
        <span>QUEENS</span>
        <span aria-hidden="true">◆</span>
        <span>BROOKLYN</span>
      </footer>
      <script src="/script.js" defer />
    </main>
  );
}
