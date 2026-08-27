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
    let visibilityTimer;

    const replies = [
      "¿Seguro? El SÍ acaba de ganar poderes.",
      "El sentido arácnido detecta dudas...",
      "Ese NO se está quedando sin telaraña.",
      "El SÍ ya está salvando la cita.",
      "Última oportunidad, villano del romance.",
      "El NO sigue ahí... técnicamente.",
    ];

    const maxYesScale = () => (window.innerWidth <= 430 ? 1.7 : 2.05);

    const randomBetween = (minimum, maximum) =>
      minimum + Math.random() * Math.max(0, maximum - minimum);

    const keepNoVisible = () => {
      if (!noButton.classList.contains("is-roaming")) return;

      const margin = 12;
      const rect = noButton.getBoundingClientRect();
      const viewportWidth = document.documentElement.clientWidth;
      const viewportHeight = window.innerHeight;
      const shiftX =
        rect.left < margin
          ? margin - rect.left
          : rect.right > viewportWidth - margin
            ? viewportWidth - margin - rect.right
            : 0;
      const shiftY =
        rect.top < margin
          ? margin - rect.top
          : rect.bottom > viewportHeight - margin
            ? viewportHeight - margin - rect.bottom
            : 0;

      if (shiftX || shiftY) {
        noButton.style.left = `${Number.parseFloat(noButton.style.left) + shiftX}px`;
        noButton.style.top = `${Number.parseFloat(noButton.style.top) + shiftY}px`;
      }
    };

    const scheduleVisibilityCheck = () => {
      window.clearTimeout(visibilityTimer);
      visibilityTimer = window.setTimeout(keepNoVisible, 460);
    };

    const moveNoRandomly = (startingRect) => {
      const buttonWidth = noButton.offsetWidth;
      const buttonHeight = noButton.offsetHeight;
      const scaledWidth = buttonWidth * noScale;
      const scaledHeight = buttonHeight * noScale;
      const viewportWidth = document.documentElement.clientWidth;
      const viewportHeight = window.innerHeight;
      const margin = 12;

      if (!noButton.classList.contains("is-roaming")) {
        noButton.classList.add("is-roaming");
        noButton.style.left = `${startingRect.left}px`;
        noButton.style.top = `${startingRect.top}px`;
        void noButton.offsetWidth;
      }

      const visibleLeft = randomBetween(
        margin,
        Math.max(margin, viewportWidth - scaledWidth - margin),
      );
      const visibleTop = randomBetween(
        margin,
        Math.max(margin, viewportHeight - scaledHeight - margin),
      );

      window.requestAnimationFrame(() => {
        noButton.style.left = `${visibleLeft}px`;
        noButton.style.top = `${visibleTop}px`;
        scheduleVisibilityCheck();
      });
    };

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
      const startingRect = noButton.getBoundingClientRect();
      noClicks += 1;
      noScale = Math.max(0.36, noScale * 0.85);
      yesScale = Math.min(maxYesScale(), yesScale * 1.15);
      status.textContent = replies[Math.min(noClicks - 1, replies.length - 1)];
      applyScales();
      moveNoRandomly(startingRect);
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

    noButton.addEventListener("transitionend", (event) => {
      if (event.propertyName === "left" || event.propertyName === "top") {
        keepNoVisible();
      }
    });

    window.addEventListener(
      "resize",
      () => {
        applyScales();
        if (noButton.classList.contains("is-roaming")) {
          moveNoRandomly(noButton.getBoundingClientRect());
        }
      },
      { passive: true },
    );
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", setupInteraction, { once: true });
  } else {
    setupInteraction();
  }
})();
