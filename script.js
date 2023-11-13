const API_KEY = "74994eba-1455-485f-81d0-280c2de54c90";
const API_URL_POPULAR_TOP ="https://kinopoiskapiunofficial.tech/api/v2.2/films/collections?type=TOP_POPULAR_MOVIES&page=1";

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
}

function showMovies(data) {
    const moviesEl =document.querySelector('.movies');
    console.log(data)
    

    data.items.forEach((item) => {
        const movieEl =document.createElement('div');
        movieEl.classList.add('movie');
        // movieEl.id = item.id;
        movieEl.innerHTML = `
        <div class="movie__cover-inner">
        <img src="${item.posterUrlPreview}"
        class="movie__cover" alt="${item.nameRu}"/>
        <div class="movie__cover-darkened"></div>
    </div>
    <div class="movie__info">
        <div class="movie__title">${item.nameRu}</div>
        <div class="movie__category">${item.genres.map(
            (genre)=>`${genre.genre}`)}</div>
        <div class="movie__average movie__average-green">9</div>
    </div>`;
        moviesEl.appendChild(movieEl);
        // console.log(data)
    });

};