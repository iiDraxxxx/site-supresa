const grid = document.querySelector('.grid');
const legendaInput = document.getElementById('legendaInput');
const linkInput = document.getElementById('linkInput');
const fileInput = document.getElementById('fileInput');
const estiloInput = document.getElementById('estiloInput');
const molduraInput = document.getElementById('molduraInput');

let imagens = JSON.parse(localStorage.getItem('galeria')) || [];

function salvar() {
  localStorage.setItem('galeria', JSON.stringify(imagens));
}

function renderizar() {
  grid.innerHTML = '';
  imagens.forEach((img, index) => {
    const card = document.createElement('div');
    card.className = `card ${img.moldura} ${img.estilo}`;

    const imagem = document.createElement('img');
    imagem.src = img.src;

    const overlay = document.createElement('div');
    overlay.className = 'overlay';

    const legenda = document.createElement('p');
    legenda.className = 'legenda';
    legenda.textContent = img.legenda;

    const botoes = document.createElement('div');
    botoes.className = 'botoes';

    const editarBtn = document.createElement('button');
    editarBtn.innerHTML = '✏️';
    editarBtn.onclick = () => editar(index);

    const apagarBtn = document.createElement('button');
    apagarBtn.innerHTML = '🗑️';
    apagarBtn.onclick = () => apagar(index);

    botoes.append(editarBtn, apagarBtn);
    overlay.append(legenda, botoes);
    card.append(imagem, overlay);
    grid.appendChild(card);
  });
}

function adicionarImagem() {
  const legenda = legendaInput.value.trim();
  const estilo = estiloInput.value;
  const moldura = molduraInput.value;

  let src = linkInput.value.trim();

  if (!src && fileInput.files[0]) {
    const leitor = new FileReader();
    leitor.onload = function (e) {
      imagens.push({ src: e.target.result, legenda, estilo, moldura });
      salvar();
      renderizar();
      limparInputs();
    };
    leitor.readAsDataURL(fileInput.files[0]);
  } else if (src) {
    imagens.push({ src, legenda, estilo, moldura });
    salvar();
    renderizar();
    limparInputs();
  } else {
    alert("Escolha um link ou uma imagem.");
  }
}

function editar(index) {
  const novaLegenda = prompt("Nova legenda:", imagens[index].legenda);
  if (novaLegenda !== null) {
    imagens[index].legenda = novaLegenda;
    salvar();
    renderizar();
  }
}

function apagar(index) {
  if (confirm("Tem certeza que deseja apagar esta imagem?")) {
    imagens.splice(index, 1);
    salvar();
    renderizar();
  }
}

function limparInputs() {
  legendaInput.value = '';
  linkInput.value = '';
  fileInput.value = '';
  estiloInput.value = 'normal';
  molduraInput.value = 'quadrada';
}

renderizar();
