(() => {
  const setupInteraction = () => {
    const yesButton = document.querySelector('[data-answer="yes"]');
    const noButton = document.querySelector('[data-answer="no"]');
    const status = document.querySelector("[data-answer-status]");
    const card = document.querySelector(".question-card");
    const couponStage = document.querySelector("[data-coupon-stage]");
    const couponTicket = document.querySelector("[data-coupon-ticket]");
    const couponAccept = document.querySelector("[data-coupon-accept]");
    const couponStatus = document.querySelector("[data-coupon-status]");

    if (
      !yesButton ||
      !noButton ||
      !status ||
      !card ||
      !couponStage ||
      !couponTicket ||
      !couponAccept ||
      !couponStatus
    ) return;
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
      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      card.classList.add("is-leaving");
      status.textContent = "Preparando tu cupón especial...";

      window.setTimeout(
        () => {
          card.hidden = true;
          couponStage.hidden = false;
          window.requestAnimationFrame(() => {
            couponStage.classList.add("is-visible");
            couponTicket.focus({ preventScroll: true });
          });
        },
        reducedMotion ? 10 : 360,
      );
    });

    couponAccept.addEventListener("click", () => {
      couponAccept.disabled = true;
      couponAccept.textContent = "❤️ Cupón aceptado";
      couponStatus.textContent = "Enviar captura para canjearlo";
      couponTicket.classList.add("is-redeemed");
    });

    window.addEventListener("resize", applyScales, { passive: true });
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", setupInteraction, { once: true });
  } else {
    setupInteraction();
  }
})();
