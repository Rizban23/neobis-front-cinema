const infoDate = new Date();
const monthOfYear = ["JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE", "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"];
const month = monthOfYear[infoDate.getMonth()];
const year = infoDate.getFullYear();

const API_URL_PREMIERES = `https://kinopoiskapiunofficial.tech/api/v2.2/films/premieres?year=${year}&month=${month}`;
const API_URL_ANTICIPATED = 'https://kinopoiskapiunofficial.tech/api/v2.2/films/collections?type=CLOSES_RELEASES&page=1';
const API_URL_SEARCH = "https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=";
const API_URL_RELEASES = `https://kinopoiskapiunofficial.tech/api/v2.1/films/releases?year=${year}&month=${month}`;
const API_KEY = "74994eba-1455-485f-81d0-280c2de54c90";
const API_URL_POPULAR_TOP ="https://kinopoiskapiunofficial.tech/api/v2.2/films/collections?type=TOP_POPULAR_MOVIES&page=1";
const SEARCH_API = "https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=";
    

const premiereMoviesBtn = document.getElementById('premiereMovies');
const anticipatedMoviesBtn = document.getElementById('anticipatedMovies');
const popularMoviesBtn = document.getElementById('popularMovies');
const realesesMonthMoviesBtn = document.getElementById('realesesMonthMovies');
const favoriteMoviesBtn = document.getElementById('favoriteMovies');

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
    const favoriteMovies = JSON.parse(localStorage.getItem('favoriteMovies')) || [];


    const items = data.releases || data.films || data.items;
    items.slice(0, 30).forEach((movie) => {
        const isFavorite = favoriteMovies.some(favMovie => favMovie.kinopoiskId === movie.kinopoiskId);
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
    <div class="movie-content">
        <div class="movie__title">${movie.nameRu}</div>
        <div class="movie__category">${movie.genres.map(
            (genre)=>`${genre.genre}`)}</div>
            <div class="movie__year">${movie.year}</div>
                      
            ${movie.ratingKinopoisk !== undefined && movie.ratingKinopoisk !== null ? `
            <div class="movie__average 
            movie__average--${getRate(movie.rating)}">
                ${movie.ratingKinopoisk}
            </div>
            
        ` : ''}
        </div>
    
    <div class="movie_content-favorite">
        <img 
            class="favorite-btn"
            data-kinopoisk-id="${movie.kinopoiskId}"
            src="${isFavorite ? 'img/heart__red.png' : 'img/heart__white.png'}"
            alt="logo_favorite"
        >
        </div>
    </div>
    `;
    const favoriteBtn = movieEl.querySelector(".favorite-btn");

    favoriteBtn.addEventListener("click", (e) => {
        e.preventDefault();
        if (isFavorite) {
            removeFavorite(movie.kinopoiskId);
        } else {
            toggleFavorite(movie);
        }
        showMovies(data);
    });

    
        moviesEl.appendChild(movieEl);
        // console.log(data)
       
    });
    
};

function toggleFavorite(movie) {
    const favoriteMovies = JSON.parse(localStorage.getItem('favoriteMovies')) || [];
    const movieIndex = favoriteMovies.findIndex(favMovie => favMovie.kinopoiskId === movie.kinopoiskId);

    if (movieIndex === -1) {
        favoriteMovies.push(movie);
    } else {
        favoriteMovies.splice(movieIndex, 1);
    }

    localStorage.setItem('favoriteMovies', JSON.stringify(favoriteMovies));

    showMovies({ films: favoriteMovies });

    return favoriteMovies;
}

function removeFavorite(kinopoiskId) {
    const favoriteMovies = JSON.parse(localStorage.getItem('favoriteMovies')) || [];
    const updatedFavorites = favoriteMovies.filter(movie => movie.kinopoiskId !== kinopoiskId);
    localStorage.setItem('favoriteMovies', JSON.stringify(updatedFavorites));
    showMovies({ items: updatedFavorites });

    return updatedFavorites;
}
  
favoriteMoviesBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const favoriteMovies = JSON.parse(localStorage.getItem('favoriteMovies')) || [];

    if (favoriteMovies.length > 0) {
        showMovies({ films: favoriteMovies });
    } else {
        console.log('No favorite movies.');
    }
});

premiereMoviesBtn.addEventListener('click', (e) => {
    e.preventDefault();
    getMovies(API_URL_PREMIERES);
});

anticipatedMoviesBtn.addEventListener("click", (e) => {
    e.preventDefault();
    getMovies(API_URL_ANTICIPATED);
});

realesesMonthMoviesBtn.addEventListener('click', (e) => {
    e.preventDefault();
    getMovies(API_URL_RELEASES);
});

popularMoviesBtn.addEventListener('click', (e) => {
    e.preventDefault();
    getMovies(API_URL_POPULAR_TOP);
});


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
