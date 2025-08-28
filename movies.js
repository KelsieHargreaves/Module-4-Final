const moviesWrapper = document.querySelector('.movies')
const searchName = document.querySelector('.search__name')
const loadingBar = document.querySelector('.loading__bar')

function searchChange(event) {
    const searchTerm = event.target.value
    
    if (searchTerm) {
        loadingBar.classList.add('searching')
    } 
    else {
        loadingBar.classList.remove('searching')
    }
    
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

        
        setTimeout (() => {
            displayMovies(currentMovies)
            loadingBar.classList.remove('searching')
        }, 3000)
}    

function displayMovies(movieList) {
    moviesWrapper.innerHTML = movieList
    .slice(0, 6)
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