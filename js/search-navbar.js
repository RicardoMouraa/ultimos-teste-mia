function toggleSearchBar() {
    const searchBarContainer = document.querySelector(".search-bar-container");
    searchBarContainer.style.display =
      searchBarContainer.style.display === "none" ? "block" : "none";
}
  
function applyNameFilterFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    const nameFilter = urlParams.get("name");
  
    if (nameFilter) {
      const cards = document.getElementsByClassName("card");
  
      for (let i = 0; i < cards.length; i++) {
        const modelName = cards[i]
          .querySelector(".title")
          .textContent.toLowerCase();
        if (modelName.indexOf(nameFilter.toLowerCase()) > -1) {
          cards[i].style.display = "";
        } else {
          cards[i].style.display = "none";
        }
      }
    }
}
  
function initializeSearchBar() {
    const searchBar = document.getElementById("search-bar");
    if (!searchBar) return;
  
    searchBar.addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        const filter = searchBar.value.trim().toLowerCase();
        if (filter) {
          window.location.href = `catalog.html?name=${encodeURIComponent(
            filter
          )}`;
        } else {
          alert("Por favor, digite o nome do modelo antes de pesquisar.");
        }
      }
    });
  
    const searchBarContainer = document.querySelector(".search-bar-container");
    searchBarContainer.style.display = "none";
  
    document.addEventListener("click", function (event) {
      if (
        !searchBarContainer.contains(event.target) &&
        !event.target.classList.contains("svg-search")
      ) {
        searchBarContainer.style.display = "none";
      }
    });
  
    applyNameFilterFromUrl();
}
  
document.addEventListener("DOMContentLoaded", function () {
    initializeSearchBar();
});
  