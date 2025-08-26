function openSpinner(button) {
    button.classList.add("loading");
    button.disabled = true;

    setTimeout(() => {
        window.location.href = "./movies.html";
    }, 300)

}
