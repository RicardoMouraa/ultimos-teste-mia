function adicionarEventoClick(link, redirectURL) {
    link.addEventListener('click', function (event) {
        event.stopPropagation();
        event.preventDefault();

        const card = link.closest('.card');
        const modelId = card.getAttribute('data-id');
        const modelTitle = card.querySelector('.title').textContent.trim();

        localStorage.setItem('modelId', modelId);
        localStorage.setItem('modelTitle', modelTitle);

        // Redirecionando para a página especificada
        window.location.href = redirectURL;
    });
}


function loadData() {
    const cardHeartIcons = document.querySelectorAll('.card .title .icon .svg-heart');
    const navbarHeartIcon = document.getElementById('navbarHeartIcon');
    const navbarHeartImage = navbarHeartIcon.querySelector('img');
    const notificationBadge = navbarHeartIcon.querySelector('.notification-badge');
    const selectedCardsElement = document.querySelector('.container-galeria');
    const buttonContainer = document.querySelector('.button-container');
    
    
    let selectedCards = [];
    let isLoading = false;

    function getModelImageUrl(modelId) {
        // Use o ID do modelo para criar o nome do arquivo da imagem
        const imageName = `model-${modelId}.svg`;
        

        // Retorne a URL da imagem completa
        return `img/model/${imageName}`;
    }

    cardHeartIcons.forEach((cardHeartIcon) => {
        const currentHeartIcon = cardHeartIcon;
        currentHeartIcon.addEventListener('click', function () {
            const card = currentHeartIcon.closest('.card');
            const cardId = card.getAttribute('data-id');
            const cardTitle = card.querySelector('.title').textContent.trim();

            // Adicione as seguintes linhas de código
            const cardCorDosOlhos = card.getAttribute('data-cor-dos-olhos');
            const cardCorDoCabelo = card.getAttribute('data-cor-do-cabelo');
            const cardTiposDeModelos = card.getAttribute('data-tipos-de-modelos');
            const cardAltura = card.getAttribute('data-altura');
            const cardBusto = card.getAttribute('data-busto');
            const cardCintura = card.getAttribute('data-cintura');
            const cardQuadril = card.getAttribute('data-quadril');
            const cardSapato = card.getAttribute('data-sapato');
            const cardImagensExtras = card.getAttribute('data-imagens-extras');
            const cardImagemHorizontal = card.getAttribute('data-imagem-horizontal');

            
            const cardModelId = card.getAttribute('data-model-id');

            if (cardHeartIcon.getAttribute('src') === 'img/icons/icon-casting-secundary.svg') {
                cardHeartIcon.setAttribute('src', 'img/icons/icon-casting-secundary-preenchido.svg');

                selectedCards.push({
                    id: cardId,
                    title: cardTitle,
                    corDosOlhos: cardCorDosOlhos,
                    corDoCabelo: cardCorDoCabelo,
                    tiposDeModelos: cardTiposDeModelos,
                    altura: cardAltura,
                    busto: cardBusto,
                    cintura: cardCintura,
                    quadril: cardQuadril,
                    sapato: cardSapato,
                    imagensExtras: cardImagensExtras,
                    imagemHorizontal: cardImagemHorizontal,
                    imagePath: card.querySelector('.img-card img').getAttribute('src')
                });
            } else {
                card.querySelector('.icon .svg-heart').setAttribute('src', 'img/icons/icon-casting-secundary.svg');

                // Remove o card da lista de cards selecionados
                selectedCards = selectedCards.filter(selectedCard => selectedCard.id !== cardId);
            }

            // Armazena a lista de cards selecionados no localStorage
            localStorage.setItem('selectedCards', JSON.stringify(selectedCards));

            // Atualiza o badge de notificação
            updateNotificationBadge();

            // Atualiza a mensagem de seleção vazia
            toggleEmptySelectionMessage(); // Adicione esta linha
        });
    });

    function updateNotificationBadge(selectedCardsCount) {
        if (selectedCardsCount === undefined) {
            const selectedCardsJson = localStorage.getItem('selectedCards');
            let selectedCards = [];
    
            if (selectedCardsJson) {
                selectedCards = JSON.parse(selectedCardsJson);
            }
    
            selectedCardsCount = selectedCards.length;
        }
    
        if (selectedCardsCount > 0) {
            notificationBadge.style.display = 'block';
            notificationBadge.textContent = selectedCardsCount;
            navbarHeartImage.setAttribute('src', 'img/icons/icon-casting-secundary-preenchido.svg');
        } else {
            notificationBadge.style.display = 'none';
            notificationBadge.textContent = '';
            navbarHeartImage.setAttribute('src', 'img/icons/icon-casting-secundary.svg');
        }
    }
    
    

    function updateCardSelection(selectedCardIds) {
        const cardHeartIcons = document.querySelectorAll('.card .title .icon .svg-heart');
    
        cardHeartIcons.forEach((cardHeartIcon) => {
            const card = cardHeartIcon.closest('.card');
            const cardId = card.getAttribute('data-id');
    
            if (selectedCardIds.includes(cardId)) {
                card.querySelector('.icon .svg-heart').setAttribute('src', 'img/icons/icon-casting-secundary-preenchido.svg');
            } else {
                cardHeartIcon.setAttribute('src', 'img/icons/icon-casting-secundary.svg');
            }
        });
    
        updateNotificationBadge();
        
    }

    function loadSelectedCards() {
        const selectedCardsJson = localStorage.getItem('selectedCards');
        if (selectedCardsJson) {
            let selectedCards = JSON.parse(selectedCardsJson);
            const selectedCardsElement = document.getElementById('selectedCards');

            selectedCards.forEach(selectedCard => {
                const cardElement = document.createElement('div');
                cardElement.classList.add('card');
                cardElement.setAttribute('data-id', selectedCard.id);
                cardElement.setAttribute('data-cor-dos-olhos', selectedCard.corDosOlhos);
                cardElement.setAttribute('data-cor-do-cabelo', selectedCard.corDoCabelo);
                cardElement.setAttribute('data-tipos-de-modelos', selectedCard.tiposDeModelos);
                cardElement.setAttribute('data-altura', selectedCard.altura);
                cardElement.setAttribute('data-busto', selectedCard.busto);
                cardElement.setAttribute('data-cintura', selectedCard.cintura);
                cardElement.setAttribute('data-quadril', selectedCard.quadril);
                cardElement.setAttribute('data-sapato', selectedCard.sapato);
                cardElement.setAttribute('data-imagens-extras', selectedCard.imagensExtras);
                cardElement.setAttribute('data-imagem-horizontal', selectedCard.imagemHorizontal);
                cardElement.setAttribute('data-selected', true);
                const imgCardElement = document.createElement('div');
                imgCardElement.classList.add('img-card');
                const imgElement = document.createElement('img');
                imgElement.setAttribute('src', selectedCard.imagePath);
                imgElement.setAttribute('alt', selectedCard.title);
                imgCardElement.appendChild(imgElement);
                const overlayElement = document.createElement('div');
                overlayElement.classList.add('overlay');
                const linkElement = document.createElement('a');
                linkElement.setAttribute('href', `model.html?id=${selectedCard.id}`);
                linkElement.textContent = 'Veja mais';
                overlayElement.appendChild(linkElement);
                imgCardElement.appendChild(overlayElement);
                cardElement.appendChild(imgCardElement);
    
                const titleElement = document.createElement('div');
                titleElement.classList.add('title');
                titleElement.textContent = selectedCard.title;
    
                const iconElement = document.createElement('div');
                iconElement.classList.add('icon');
                const heartIconElement = document.createElement('img');
                heartIconElement.classList.add('svg-heart');
                heartIconElement.setAttribute('src', 'img/icons/icon-casting-secundary-preenchido.svg');
                heartIconElement.setAttribute('alt', 'icone casting');
                iconElement.appendChild(heartIconElement);

                // adiciona um evento de click ao coração do card para removê-lo da lista de cards selecionados
                heartIconElement.addEventListener('click', function () {
                    const cardIdToRemove = cardElement.getAttribute('data-id');
                    selectedCards = selectedCards.filter(selectedCard => selectedCard.id !== cardIdToRemove);
                    localStorage.setItem('selectedCards', JSON.stringify(selectedCards));
                    cardElement.remove();
                    updateNotificationBadge();

                    // Adicione esta linha para atualizar a mensagem de seleção vazia
                    toggleEmptySelectionMessage();
                    
                    // Chame a função `updateCardSelection` com a lista de IDs selecionados atualizados
                    const selectedCardIds = selectedCards.map(card => card.id);
                    updateCardSelection(selectedCardIds);
                });

                const initialSelectedCardIds = selectedCards.map(card => card.id);
            updateCardSelection(initialSelectedCardIds);
                

            titleElement.appendChild(iconElement);
            cardElement.appendChild(titleElement);

            selectedCardsElement.appendChild(cardElement);
        });

          
        
        }
        toggleEmptySelectionMessage();
        displayEmptySelectionMessage();
        initializeNavbar();
    
        selectedCardsElement.appendChild(cardElement);
        displayEmptySelectionMessage();
    
        const initialSelectedCardIds = selectedCards.map(card => card.id);
        updateCardSelection(initialSelectedCardIds);
    
        toggleEmptySelectionMessage(); // Adicionado aqui
    }


    function getBaseUrl() {
        const baseUrl = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1);
        return baseUrl;
    }

    function navigateToSelectedCardsPage() {
        window.location.href = 'selectedCards.html';
    }
    

    function toggleEmptySelectionMessage() {
        if (isLoading) {
            return;
        }
    
        const emptySelection = document.getElementById('emptySelection');
        const selectedCardsElement = document.querySelector('.container-galeria');
        const cardsInSelectedCardsElement = selectedCardsElement.querySelectorAll('.card');
    
        if (cardsInSelectedCardsElement.length === 0) {
            emptySelection.classList.add('show');
            buttonContainer.style.display = 'none'; // Adicione esta linha
        } else {
            emptySelection.classList.remove('show');
            buttonContainer.style.display = 'flex'; // Adicione esta linha
        }
    }

    function displayEmptySelectionMessage() {
        const emptySelection = document.getElementById('emptySelection');
        const selectedCardsElement = document.querySelector('.container-galeria');
        const cardsInSelectedCardsElement = selectedCardsElement.querySelectorAll('.card');
    
        if (cardsInSelectedCardsElement.length === 0 && !isLoading) {
            emptySelection.classList.add('show');
        }
    }

    

    function initializeNavbar() {
        const navbarHeartIcon = document.getElementById('navbarHeartIcon');
        const navbarHeartImage = navbarHeartIcon.querySelector('img');
        const notificationBadge = navbarHeartIcon.querySelector('.notification-badge');
    
        function updateNotificationBadge() {
            const selectedCardsJson = localStorage.getItem('selectedCards');
            let selectedCards = [];
    
            if (selectedCardsJson) {
                selectedCards = JSON.parse(selectedCardsJson);
            }
    
            const selectedCardsCount = selectedCards.length;
    
            if (selectedCardsCount > 0) {
                notificationBadge.style.display = 'block';
                notificationBadge.textContent = selectedCardsCount;
                navbarHeartImage.setAttribute('src', 'img/icons/icon-casting-secundary-preenchido.svg');
            } else {
                notificationBadge.style.display = 'none';
                notificationBadge.textContent = '';
                navbarHeartImage.setAttribute('src', 'img/icons/icon-casting-secundary.svg');
            }
        }
    
        navbarHeartIcon.addEventListener('click', navigateToSelectedCardsPage);
    
        const selectedCardsJson = localStorage.getItem('selectedCards');
        if (selectedCardsJson) {
            const selectedCards = JSON.parse(selectedCardsJson);
            const selectedCardIds = selectedCards.map(card => card.id);
            updateCardSelection(selectedCardIds);
        }

        updateNotificationBadge();
        
    }

    // Verifica se a página foi completamente carregada antes de exibir a mensagem
    window.onload = function() {
        displayEmptySelectionMessage();
    };
    
    

    function navigateToCatalogPage() {
        window.location.href = 'catalog.html';
        window.addEventListener('load', () => {
            restoreSelectedCards();
        });
    }

    function restoreSelectedCards() {
        const selectedCardsJson = localStorage.getItem('selectedCards');
        if (selectedCardsJson) {
            const selectedCards = JSON.parse(selectedCardsJson);
            const selectedCardIds = selectedCards.map(card => card.id);
            updateCardSelection(selectedCardIds);
        }
    }

    document.addEventListener('readystatechange', function () {
        if (document.readyState === 'complete') {
            restoreSelectedCards();
        }
    });



    navbarHeartIcon.addEventListener('click', navigateToSelectedCardsPage);
    document.getElementById('backToAllModelsButton').addEventListener('click', () => {
        navigateToCatalogPage();
    });

    const vejaMaisLinks = document.querySelectorAll('.card .overlay a');
    vejaMaisLinks.forEach((link) => adicionarEventoClick(link, 'model.html'));

    initializeNavbar();
    loadSelectedCards();
    toggleEmptySelectionMessage();
    updateNotificationBadge();
}

document.addEventListener('DOMContentLoaded', function () {
    loadData();
});

const backToCatalogButton = document.getElementById('backToCatalogButton');
backToCatalogButton.addEventListener('click', function() {
    window.location.href = 'catalog.html';
});