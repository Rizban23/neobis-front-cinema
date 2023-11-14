const API_KEY = "74994eba-1455-485f-81d0-280c2de54c90";
const API_URL_POPULAR_TOP ="https://kinopoiskapiunofficial.tech/api/v2.2/films/collections?type=TOP_POPULAR_MOVIES&page=1";
const SEARCH_API =
  "https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=";

getMovies(API_URL_POPULAR_TOP);

async function getMovies(url) {
    const resp = await fetch(url, {
        method: 'GET',
        headers: {
            'X-API-KEY': API_KEY,
            'Content-Type': 'application/json',
        },
    });
    const respData = await resp.json();
    // console.log(respData);
    showMovies(respData);
    // getMovies(New_Url);

}

function getRate(rate){
    if (rate >= 7){
        return "green"
    }else if (rate > 5){
        return "yellow"
    }else{
        return "red"
    }
};


function showMovies(data) {
    const moviesEl =document.querySelector('.movies');
    // очищаем предыдущие фильмы
    document.querySelector(".movies").innerHTML="";


    const items = data.releases || data.films || data.items;
    items.slice(0, 30).forEach((movie) => {
        const movieEl =document.createElement('div');
        movieEl.classList.add('movie');
        // movieEl.id = item.id;
        movieEl.innerHTML = `
        <div class="movie__cover-inner">
        <img src="${movie.posterUrlPreview}"
        class="movie__cover" alt="${movie.nameRu}"/>
        <div class="movie__cover-darkened"></div>
    </div>
    <div class="movie__info">
        <div class="movie__title">${movie.nameRu}</div>
        <div class="movie__category">${movie.genres.map(
            (genre)=>`${genre.genre}`)}</div>
            <div class="movie__year">${movie.year}</div>
        <div class="movie__average movie__average-${getRate(movie.ratingKinopoisk)}">${movie.ratingKinopoisk}</div>
    </div>`;
        moviesEl.appendChild(movieEl);
        // console.log(data)
       
    });
    
};

function getLocal() {
    if (!localStorage.getItem("items")) {
      localStorage.setItem("items", JSON.stringify([]));
    }
  }
  

// Поиск

const form = document.querySelector("form");
const search = document.querySelector(".header__search");

form.addEventListener("submit",(e)=>{
    e.preventDefault();

    const New_Url = `${SEARCH_API}${search.value}`;
    if(search.value){
        getMovies(New_Url);
        search.value ="";
       
    }
   
});
