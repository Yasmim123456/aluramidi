function tocaSom(seletorAudio) {
  const elemento = document.querySelector(seletorAudio);

  if (elemento && elemento.localName === "audio") {
    elemento.play();
  } else {
    alert("Elemento não encontrado ou seletor inválido");
  }
}

const listaDeTeclas = document.querySelectorAll(".tecla");

for (let contador = 0; contador < listaDeTeclas.length; contador++) {
  const tecla = listaDeTeclas[contador];
  const instrumento = tecla.classList[1];

  const idAudio = `#som_${instrumento}`;

  tecla.onclick = function () {
    tocaSom(idAudio);
  };

  tecla.onkeydown = function (evento) {
    if (evento.code === "Enter" || evento.code === "Space") {
      tecla.classList.add("ativa");
    }
  };

  tecla.onkeyup = function () {
    tecla.classList.remove("ativa");
  };
}

const audios = document.querySelectorAll("audio");
const botaoPlay = document.querySelector(".botao.play");
const botaoPause = document.querySelector(".botao.pause");

let indiceAtual = 0;
let tocando = false;

function tocarSequencia(indice) {
  if (indice >= audios.length) {
    tocando = false;
    indiceAtual = 0;
    return;
  }

  const audio = audios[indice];

  audios.forEach((audio) => {
    audio.pause();
    audio.currentTime = 0;
  });

  tocando = true;

  audio.currentTime = 0;
  audio.play().catch((err) => console.error("Erro ao tocar:", err));

  audio.onended = () => {
    if (tocando) {
      indiceAtual++;
      tocarSequencia(indiceAtual);
    }
  };
}

function pausarTudo() {
  tocando = false;
  audios.forEach((audio) => {
    audio.pause();
    audio.currentTime = 0;
  });
  indiceAtual = 0;
}

botaoPlay.addEventListener("click", () => {
  if (!tocando) {
    tocarSequencia(indiceAtual);
  }
});

botaoPause.addEventListener("click", () => {
  pausarTudo();
});