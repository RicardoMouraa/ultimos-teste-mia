// Função para adicionar um evento de clique para cada link 'Veja mais'
function adicionarEventoClick(link, redirectURL) {
  link.addEventListener('click', (event) => {
    event.preventDefault(); // Impedindo a ação padrão do link

    // Pegando as informações do card que contém o link clicado
    const card = link.closest('.card');
    const id = card.dataset.id;
    const nome = card.querySelector('.title').textContent;
    const altura = card.dataset.altura;
    const busto = card.dataset.busto;
    const cintura = card.dataset.cintura;
    const quadril = card.dataset.quadril;
    const sapato = card.dataset.sapato;
    const cabelo = card.dataset.corDoCabelo;
    const olhos = card.dataset.corDosOlhos;
    const imagem = card.querySelector('img').src;
    const imagensExtras = card.dataset.imagensExtras;
    const imagemHorizontal = card.dataset.imagemHorizontal;

    // Armazenando as informações em um objeto
    const modelo = {
      id,
      nome,
      altura,
      busto,
      cintura,
      quadril,
      sapato,
      cabelo,
      olhos,
      imagem,
      imagensExtras,
      imagemHorizontal,
    };

    // Armazenando o objeto modelo na localStorage para ser acessado na página model.html
    localStorage.setItem('modelo', JSON.stringify(modelo));

    // Redirecionando para a página especificada
    window.location.href = redirectURL;
  });
}

function preencherGaleria() {
  const galeria = document.querySelector('.galeria');
  const imagensExtras = modelo.imagensExtras.split(', ');

  let currentRow = document.createElement('div');
  currentRow.className = 'row';
  galeria.appendChild(currentRow);

  let horizontalImages = [];
  let retratoImages = [];

  imagensExtras.forEach((src, index) => {
    const img = document.createElement('img');
    img.alt = `Foto ${index + 1}`;
    img.src = src.trim();

    if (src.includes('horizontal')) {
      img.className = 'horizontal';
      horizontalImages.push(img);
    } else {
      img.className = 'retrato';
      retratoImages.push(img);
    }
  });

  // Incluindo a imagem horizontal do modelo
  if (modelo.imagemHorizontal) {
    const img = document.createElement('img');
    img.alt = 'Foto horizontal';
    img.src = modelo.imagemHorizontal;
    img.className = 'horizontal';
    horizontalImages.push(img);
  }

  // Primeira linha: 4 fotos retrato
  for (let i = 0; i < 4 && retratoImages.length > 0; i++) {
    currentRow.appendChild(retratoImages.shift());
  }

  // Segunda linha: 1 retrato + 1 horizontal + 1 retrato
  currentRow = document.createElement('div');
  currentRow.className = 'row';
  galeria.appendChild(currentRow);

  if (retratoImages.length > 0) currentRow.appendChild(retratoImages.shift());
  if (horizontalImages.length > 0) currentRow.appendChild(horizontalImages.shift());
  if (retratoImages.length > 0) currentRow.appendChild(retratoImages.shift());

  // Preenche as linhas restantes
  while (retratoImages.length > 0 || horizontalImages.length > 0) {
    currentRow = document.createElement('div');
    currentRow.className = 'row';
    galeria.appendChild(currentRow);

    while (retratoImages.length > 0 && currentRow.childElementCount < 4) {
      currentRow.appendChild(retratoImages.shift());
    }

    if (horizontalImages.length > 0) {
      currentRow.appendChild(horizontalImages.shift());
    }
  }
}

const vejaMaisLinks = document.querySelectorAll('.card .overlay a');
vejaMaisLinks.forEach((link) => adicionarEventoClick(link, 'model.html'));

const infosModel = document.querySelector('.infos-model');
const modelo = JSON.parse(localStorage.getItem('modelo'));

// Preenchendo as informações e galeria na página model.html
if (modelo) {
  const nomeElement = infosModel.querySelector('.info-1-model h1');
  const usernameElement = infosModel.querySelector('.info-1-model a');
  const imagemElement = document.querySelector('.left-section .image-container img');

  if (nomeElement) nomeElement.textContent = modelo.nome;
  if (usernameElement) usernameElement.textContent = `@${modelo.nome.replace(' ', '')}`;
  if (imagemElement) imagemElement.src = modelo.imagem;

  for (let i = 1; i <= 7; i++) {
    const firstTdElement = infosModel.querySelector(`table tr:nth-child(${i}) td:nth-child(1)`);
    const secondTdElement = infosModel.querySelector(`table tr:nth-child(${i}) td:nth-child(2)`);

    if (firstTdElement) {
      switch (i) {
        case 1:
          firstTdElement.textContent = modelo.altura;
          break;
        case 2:
          firstTdElement.textContent = modelo.busto;
          break;
        case 3:
          firstTdElement.textContent = modelo.cintura;
          break;
        case 4:
          firstTdElement.textContent = modelo.quadril;
          break;
        case 5:
          firstTdElement.textContent = modelo.sapato;
          break;
        case 6:
          firstTdElement.textContent = modelo.cabelo;
          break;
        case 7:
          firstTdElement.textContent = modelo.olhos;
          break;
      }
    }

    if (secondTdElement) {
      switch (i) {
        case 1:
          secondTdElement.textContent = modelo.altura;
          break;
        case 2:
          secondTdElement.textContent = modelo.busto;
          break;
        case 3:
          secondTdElement.textContent = modelo.cintura;
          break;
        case 4:
          secondTdElement.textContent = modelo.quadril;
          break;
        case 5:
          secondTdElement.textContent = modelo.sapato;
          break;
        case 6:
          secondTdElement.textContent = modelo.cabelo;
          break;
        case 7:
          secondTdElement.textContent = modelo.olhos;
          break;
      }
    }
  }

  // Preenchendo a galeria de imagens na página model.html
  preencherGaleria();
}

// Adicionando um evento para remover o modelo do localStorage quando o usuário volta para a lista de modelos
const voltarLink = document.querySelector('.back-link');
if (voltarLink) {
  voltarLink.addEventListener('click', () => {
    localStorage.removeItem('modelo');
  });
}
