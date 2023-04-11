document.addEventListener('DOMContentLoaded', function () {
    filtrarCards();
  });
  
  async function loadCardsFromCatalog() {
    const response = await fetch('catalog.html');
    const catalogHtml = await response.text();
    const catalogDoc = new DOMParser().parseFromString(catalogHtml, 'text/html');
    const cards = catalogDoc.querySelectorAll('.card');
    const cardsByGender = {
      feminino: [],
      masculino: [],
      kids: []
    };
  
    cards.forEach(card => {
      const genero = card.dataset.tiposDeModelos;
      if (cardsByGender.hasOwnProperty(genero)) {
        cardsByGender[genero].push(card.cloneNode(true));
      }
    });
  
    return cardsByGender;
  }
  
  async function filtrarCards() {
    const cardsByGender = await loadCardsFromCatalog();
    let genero;
    let galeria;
    let paginaAtual = window.location.pathname.split('/').pop();
  
    if (paginaAtual === 'feminino.html') {
      genero = 'feminino';
      galeria = document.getElementById('feminino-galeria');
    } else if (paginaAtual === 'masculino.html') {
      genero = 'masculino';
      galeria = document.getElementById('masculino-galeria');
    } else if (paginaAtual === 'kids.html') {
      genero = 'kids';
      galeria = document.getElementById('kids-galeria');
    } else {
      return;
    }
  
    galeria.innerHTML = '';
  
    cardsByGender[genero].forEach(card => {
      galeria.appendChild(card.cloneNode(true));
    });
}
  