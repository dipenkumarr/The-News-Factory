const API_KEY = "3cba9ee7d2ff4ad99a80fa558026915a";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener("load", () => fetchNews("Top News"));

async function fetchNews(query) {
  const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
  const data = await res.json();
  bindData(data.articles);
}

function bindData(articles) {
  const cardsContainer = document.getElementById("cards-container");
  const newsCardTemplate = document.getElementById("template-news-card");

  cardsContainer.innerHTML = "";

  articles.forEach((article) => {
    if (!article.urlToImage) return;
    const CardClone = newsCardTemplate.content.cloneNode(true);
    fillDataInCard(CardClone, article);
    cardsContainer.appendChild(CardClone);
  });
}

function fillDataInCard(CardClone, article) {
  const newsImg = CardClone.querySelector("#news-img");
  const newsTitle = CardClone.querySelector("#news-title");
  const newsSource = CardClone.querySelector("#news-source");
  const newsDesc = CardClone.querySelector("#news-desc");

  newsImg.src = article.urlToImage;
  newsTitle.innerHTML = article.title;
  newsDesc.innerHTML = article.description;

  const date = new Date(article.publishedAt).toLocaleString("en-US", {
    timeZone: "Asia/Jakarta",
  });

  newsSource.innerHTML = `${article.source.name} · ${date}`;

  CardClone.firstElementChild.addEventListener("click", () => {
    window.open(article.url, "_blank");
  });
}

let curSelectedNav = null;

function onNavItemClick(id) {
  fetchNews(id);
  const navItem = document.getElementById(id);
  curSelectedNav?.classList.remove("active");
  curSelectedNav = navItem;
  curSelectedNav.classList.add("active");
}

const searchButton = document.getElementById("search-button");
const searchText = document.getElementById("search-text");

searchButton.addEventListener("click", () => {
  const query = searchText.value;
  if (!query) return;
  fetchNews(query);
  curSelectedNav?.classList.remove("active");
  curSelectedNav = null;
});

function reload() {
  window.location.reload();
}

const navItems = document.querySelectorAll(".nav-item");
navItems.forEach((item) => {
  item.addEventListener("click", () => {
    const itemName = item.textContent;
    updateContent(itemName);
  });
});

searchButton.addEventListener("click", () => {
  const query = searchText.value;
  if (query) {
    updateContent(`Search: ${query}`);
    // fetchNews(query);
  }
});

// Function to update the content based on the selected item
function updateContent(itemName) {
  const contentDiv = document.querySelector(".content");
  contentDiv.textContent = itemName;
}

function toggleMobileMenu() {
  const navLinks = document.querySelector(".nav-links");
  navLinks.classList.toggle("active");
}

// Close the mobile menu when a link is clicked
const navItemsss = document.querySelectorAll(".nav-item");
navItemsss.forEach((item) => {
  item.addEventListener("click", () => {
    const navLinks = document.querySelector(".nav-links");
    if (navLinks.classList.contains("active")) {
      navLinks.classList.remove("active");
    }
  });
});
// Close the mobile menu when clicking anywhere on the screen
document.addEventListener("click", (event) => {
  const navLinks = document.querySelector(".nav-links");
  if (
    navLinks.classList.contains("active") &&
    !event.target.closest(".main-nav")
  ) {
    navLinks.classList.remove("active");
  }
});
