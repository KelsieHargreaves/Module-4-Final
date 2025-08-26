const resultsContainer = document.querySelector(".movies__results")
const spinner = resultsContainer.querySelector(".movies__spinner")
const moviesWrapper = resultsContainer.querySelector(".movies__wrapper")
const searchInput = document.querySelector(".nav__input")
const searchButton = document.querySelector(".nav__input--button")

async function renderMovies(query = "Avengers") {
    spinner.style.display = "block"
    moviesWrapper.innerHTML = ""
    
    resultsContainer.querySelectorAll(".movie").forEach(m => m.remove())

   try {
        const response = await fetch(`https://www.omdbapi.com/?s=${encodeURIComponent(query)}&apikey=5be1f0a6`)
        const data = await response.json()
        
        if (data.Response === "True") {
            moviesWrapper.innerHTML = data.Search.map(movie => 
                `<div class="movie">
                        <img src="${movie.Poster}" alt="">
                        <h3>${movie.Title}, ${movie.Year}</h3>
                </div>`).join("")
        }

        else {
            moviesWrapper.innerHTML = `<p>No results found</p>`
        }

    }
        catch (err) {
            moviesWrapper.innerHTML = `<p>Error loading movies</p>`
            console.error(err)
        }

        spinner.style.display = "none"

}

searchButton.addEventListener("click", () => {
    const query = searchInput.value.trim()
    if (query) {
        renderMovies(query)
    }
})

searchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        const query = searchInput.value.trim()
        if (query) {
            renderMovies(query)
        }
    }
})

renderMovies()