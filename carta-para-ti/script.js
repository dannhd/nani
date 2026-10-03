(() => {
  "use strict";

  const noMessages = ["No", "¿Segura?", "Piénsalo bien 🥺", "¿De verdad?", "Última oportunidad", "Te vas a arrepentir 😭"];
  const MAX_SCALE = 7.5;
  let noClicks = 0;
  let yesScale = 1;
  let noScale = 1;

  const questionScene = document.querySelector("#questionScene");
  const letterScene = document.querySelector("#letterScene");
  const decisionCard = document.querySelector("#decisionCard");
  const answers = document.querySelector("#answers");
  const yesButton = document.querySelector("#yesButton");
  const noButton = document.querySelector("#noButton");
  const prompt = document.querySelector("#prompt");

  function updateChoices() {
    document.documentElement.style.setProperty("--yes-scale", yesScale.toFixed(4));
    document.documentElement.style.setProperty("--no-scale", noScale.toFixed(4));
    noButton.textContent = noMessages[Math.min(noClicks, noMessages.length - 1)];
    noButton.setAttribute("aria-label", `Responder: ${noButton.textContent}`);

    if (noClicks >= 3) {
      decisionCard.classList.add("is-growing");
      answers.classList.add("is-stacked");
      prompt.textContent = "Cada vez es más difícil decir que no…";
    }
    if (yesScale >= 4.3) {
      prompt.textContent = "Creo que el corazón ya decidió.";
    }
    if (yesScale >= 6.19) {
      yesButton.classList.add("yes-fullscreen");
      noButton.classList.add("is-floating");
      prompt.textContent = "Solo queda una respuesta.";
    }
  }

  function makeHeart() {
    const heart = document.createElement("span");
    heart.className = "celebration";
    heart.textContent = Math.random() > 0.45 ? "♥" : "✦";
    heart.style.left = `${18 + Math.random() * 64}%`;
    heart.style.setProperty("--drift", `${-100 + Math.random() * 200}px`);
    document.body.appendChild(heart);
    heart.addEventListener("animationend", () => heart.remove(), { once: true });
  }

  function showLetter() {
    yesButton.disabled = true;
    noButton.disabled = true;
    for (let index = 0; index < 7; index += 1) window.setTimeout(makeHeart, index * 90);
    questionScene.classList.add("is-leaving");

    window.setTimeout(() => {
      letterScene.removeAttribute("aria-hidden");
      letterScene.classList.add("is-visible");
    }, 180);

    window.setTimeout(() => letterScene.classList.add("is-arriving"), 300);
    window.setTimeout(() => letterScene.classList.add("is-opening"), 1320);
    window.setTimeout(() => letterScene.classList.add("is-revealing"), 2320);
    window.setTimeout(() => letterScene.classList.add("is-settling"), 4100);
    window.setTimeout(() => letterScene.classList.add("is-settled"), 5150);

    window.setTimeout(() => {
      questionScene.hidden = true;
    }, 850);
  }

  noButton.addEventListener("click", () => {
    noClicks += 1;
    yesScale = Math.min(yesScale * 1.2, MAX_SCALE);
    noScale = Math.max(noScale * 0.94, 0.68);
    updateChoices();
  });

  yesButton.addEventListener("click", showLetter);
})();
