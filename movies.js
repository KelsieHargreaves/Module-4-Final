const moviesWrapper = document.querySelector('.movies')
const searchName = document.querySelector('.search__name')

function searchChange(event) {
    renderMovies(event.target.value)
    searchName.innerHTML = event.target.value

}

let currentMovies = []

async function renderMovies(searchTerm) {
    const response = await fetch(
        `https://www.omdbapi.com/?s=${searchTerm}&apikey=5be1f0a6`
    )
    const data = await response.json()
    currentMovies = data.Search
    displayMovies(currentMovies)
}

function displayMovies(movieList) {
    moviesWrapper.innerHTML = movieList
    .map((movie) => {
        return `
        <div class="movie">
        <img class="movie__img" src="${movie.Poster}" alt="">
        <h3 class="movie__info">${movie.Title}, ${movie.Year}</h3>
        <button class="movie__info--button">Learn More</button>
        </div>  
        `
    })
    .join('')
}

function sortChange(event) {
    const sortOption = event.target.value
    let sortedMovies = [...currentMovies]

    if (sortOption === "newest") {
        sortedMovies.sort((a,b) => b.Year - a.Year)
    }

    else if (sortOption === "oldest") {
        sortedMovies.sort((a,b) => a.Year - b.Year)
    }

    displayMovies(sortedMovies)
}