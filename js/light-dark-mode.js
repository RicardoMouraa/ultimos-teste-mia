const darkModeCssHref = "/css/darkmode.css";
const darkModeStorageKey = "darkmode";

function switchImageSrc(src, original, replacement) {
    return src.replace(original, replacement);
}

function updateImageSources(replacePrimary, replaceBlack, enableDarkMode) {
    const images = document.getElementsByTagName("img");
    for (const image of images) {
        if (enableDarkMode) {
            if (image.src.includes("-primary")) {
                image.dataset.originalSrc = image.src;
                image.src = switchImageSrc(image.src, "-primary", replacePrimary);
            }
            if (image.src.includes("-black")) {
                image.dataset.originalSrc = image.src;
                image.src = switchImageSrc(image.src, "-black", replaceBlack);
            }
        } else {
            if (image.dataset.originalSrc) {
                image.src = image.dataset.originalSrc;
            }
        }
    }
}

function toggleButtonIcon(enableDarkMode) {
    const buttonIcon = document.querySelector("#toggleColors img");
    buttonIcon.src = enableDarkMode ? "/img/icons/light-mode.svg" : "/img/icons/night-mode.svg";
}

function enableDarkMode() {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = darkModeCssHref;
    link.id = "dark-mode-css";
    document.head.appendChild(link);
    localStorage.setItem(darkModeStorageKey, "enabled");
    updateImageSources("-secundary", "-white", true);
    toggleButtonIcon(true);
}

function disableDarkMode() {
    const link = document.getElementById("dark-mode-css");
    if (link) {
        document.head.removeChild(link);
    }
    localStorage.removeItem(darkModeStorageKey);
    updateImageSources(null, null, false);
    toggleButtonIcon(false);
}

function toggleDarkMode() {
    const darkModeEnabled = localStorage.getItem(darkModeStorageKey);
    if (darkModeEnabled) {
        disableDarkMode();
    } else {
        enableDarkMode();
    }
}

// Carregar a preferência salva no localStorage
if (localStorage.getItem(darkModeStorageKey)) {
    enableDarkMode();
}

// Adicionar o evento de clique ao botão
document.getElementById("toggleColors").addEventListener("click", (event) => {
    event.preventDefault();
    toggleDarkMode();
});