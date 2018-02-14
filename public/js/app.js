const form = document.getElementById('search-form');
const searchField = document.getElementById('search-keyword');
const responseContainer = document.getElementById('response-container');
let searchedForText;

form.addEventListener('submit', function(event) {
  event.preventDefault();
  responseContainer.innerHTML = '';
  searchedForText = searchField.value;
  getNews();
  getNews2();
});

function getNews() {
  const articleRequest = new XMLHttpRequest();
  articleRequest.open('GET', `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=53f3f12c4348428c8e9add335c42bd3d`);
  articleRequest.onload = addNews;
  articleRequest.onerror = handleError;
  articleRequest.send();
}
function handleError() {
  console.log('Se ha presentado un error');
}
function addNews() {
  let data = JSON.parse(this.responseText);
  let article = data.response.docs;
  console.log(article);
  for (var i = 0; i < article.length; i++) {
    let news = '<li><h2>' + article[i].headline.main + '</h2><p>' + article[i].snippet + '</p><p><a href=' + article[i].web_url + '>Leer mas</a></p><img src=https://static01.nyt.com/' + article[i].multimedia[0].url + '>  </li>';
    $('#response-container').append(news);
  }
}
function getNews2() {
  const articleRequest = new XMLHttpRequest();
  articleRequest.open('GET',`https://newsapi.org/v2/top-headlines?q=${searchedForText}&sources=bbc-news&apiKey=5bc8597ff85946f48100561b36f359b6`);
  articleRequest.onload = addNews2;
  articleRequest.onerror = handleError;
  articleRequest.send();
}
function addNews2() {
  let data = JSON.parse(this.responseText);
  let article = data.articles;
  console.log(article);
  for (var i = 0; i < article.length; i++) {
    let news = '<li><h2>' + article[i].title + '</h2><p>' + article[i].description + '</p><p><a href='+ article[i].url + '>Leer mas</a></p><img src=' + article[i].urlToImage + '>  </li>';
    $('#response-container').append(news);
  }
}