(() => {
  const setupInteraction = () => {
    const yesButton = document.querySelector('[data-answer="yes"]');
    const noButton = document.querySelector('[data-answer="no"]');
    const status = document.querySelector("[data-answer-status]");
    const card = document.querySelector(".question-card");

    if (!yesButton || !noButton || !status || !card) return;
    if (card.dataset.interactionReady === "true") return;
    card.dataset.interactionReady = "true";

    let noScale = 1;
    let yesScale = 1;
    let noClicks = 0;

    const replies = [
      "¿Seguro? El SÍ acaba de ganar poderes.",
      "El sentido arácnido detecta dudas...",
      "Ese NO se está quedando sin telaraña.",
      "El SÍ ya está salvando la cita.",
      "Última oportunidad, villano del romance.",
      "El NO sigue ahí... técnicamente.",
    ];

    const maxYesScale = () => (window.innerWidth <= 430 ? 1.7 : 2.05);

    const applyScales = () => {
      yesScale = Math.min(yesScale, maxYesScale());
      yesButton.style.setProperty("--scale", yesScale.toFixed(3));
      noButton.style.setProperty("--scale", noScale.toFixed(3));
      noButton.setAttribute(
        "aria-label",
        `No. Se ha reducido ${noClicks} ${noClicks === 1 ? "vez" : "veces"}.`,
      );
    };

    noButton.addEventListener("click", () => {
      noClicks += 1;
      noScale = Math.max(0.36, noScale * 0.85);
      yesScale = Math.min(maxYesScale(), yesScale * 1.15);
      card.classList.remove("is-accepted");
      status.textContent = replies[Math.min(noClicks - 1, replies.length - 1)];
      applyScales();
    });

    yesButton.addEventListener("click", () => {
      card.classList.remove("is-accepted");
      void card.offsetWidth;
      card.classList.add("is-accepted");
      status.textContent = "¡Plan confirmado! Tu amigable cita del barrio está lista. 🕷";
    });

    window.addEventListener("resize", applyScales, { passive: true });
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", setupInteraction, { once: true });
  } else {
    setupInteraction();
  }
})();
