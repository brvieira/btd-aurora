(() => {
  "use strict";

  const config = {
    formAction: "https://docs.google.com/forms/d/e/1FAIpQLSe2slwyddLFYuPEB6juth3NPOGN9DsYO4HbqNKKlzn22BjwSw/formResponse",
    entries: {
      nome: "entry.1220342085",
      adultos: "entry.1205329804",
      criancas: "entry.1971493790",
      resposta: "entry.995674977",
    },
    opcoes: { sim: "Vou sim", nao: "Não poderei ir" },
  };

  const form = document.getElementById("rsvp-form");
  const nomeInput = document.getElementById("rsvp-nome");
  const adultosInput = document.getElementById("rsvp-adultos");
  const criancasInput = document.getElementById("rsvp-criancas");
  const simBtn = document.getElementById("rsvp-sim");
  const naoBtn = document.getElementById("rsvp-nao");
  const submitBtn = document.getElementById("rsvp-submit");
  const erroEl = document.getElementById("rsvp-erro");
  const successView = document.getElementById("rsvp-success");
  const successMessage = document.getElementById("rsvp-success-message");
  const resetBtn = document.getElementById("rsvp-reset");

  let vai = null;
  let enviando = false;

  function setErro(msg) {
    erroEl.textContent = msg;
  }

  function updateChoiceButtons() {
    simBtn.classList.toggle("is-active-sim", vai === true);
    simBtn.setAttribute("aria-checked", String(vai === true));
    naoBtn.classList.toggle("is-active-nao", vai === false);
    naoBtn.setAttribute("aria-checked", String(vai === false));
  }

  simBtn.addEventListener("click", () => {
    vai = true;
    setErro("");
    updateChoiceButtons();
  });

  naoBtn.addEventListener("click", () => {
    vai = false;
    setErro("");
    updateChoiceButtons();
  });

  nomeInput.addEventListener("input", () => setErro(""));

  function enviar() {
    const body = new URLSearchParams({
      [config.entries.nome]: nomeInput.value.trim(),
      [config.entries.adultos]: String(vai ? (Number(adultosInput.value) || 0) : 0),
      [config.entries.criancas]: String(vai ? (Number(criancasInput.value) || 0) : 0),
      [config.entries.resposta]: vai ? config.opcoes.sim : config.opcoes.nao,
    });
    return fetch(config.formAction, { method: "POST", mode: "no-cors", body });
  }

  function showSuccess() {
    successMessage.textContent = vai === false
      ? "Que pena! Obrigado por avisar — vamos sentir sua falta."
      : "Presença confirmada! Nos vemos no dia 08 de novembro.";
    form.hidden = true;
    successView.hidden = false;
  }

  function resetForm() {
    form.reset();
    vai = null;
    enviando = false;
    setErro("");
    updateChoiceButtons();
    submitBtn.disabled = false;
    submitBtn.textContent = "Confirmar";
    form.hidden = false;
    successView.hidden = true;
    adultosInput.value = "1";
    criancasInput.value = "0";
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (enviando) return;

    if (!nomeInput.value.trim()) {
      setErro("Escreva seu nome, por favor.");
      return;
    }
    if (vai === null) {
      setErro("Diga se poderá vir.");
      return;
    }

    enviando = true;
    setErro("");
    submitBtn.disabled = true;
    submitBtn.textContent = "Enviando…";

    enviar()
      .then(() => {
        enviando = false;
        showSuccess();
      })
      .catch(() => {
        enviando = false;
        submitBtn.disabled = false;
        submitBtn.textContent = "Confirmar";
        setErro("Não consegui enviar. Tente de novo em instantes.");
      });
  });

  resetBtn.addEventListener("click", resetForm);
})();
