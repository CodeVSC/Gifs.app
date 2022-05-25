const API_KEY = "Mic5tJbWYxnehS4XJhCx0el8XTVAgMV6";
const API_URL = "https://api.giphy.com/v1/gifs/search";
const params = {
    api_key: API_KEY,
    q: "",
    limit: 50,
    offset: 5,
    lang: "es",
};

const paramString = (params) => {
    return Object.keys(params).map(key => `${key}=${params[key]}`).join('&');
}

const getUrl = () => {
    return `${API_URL}?${paramString(params)}`;
}

fetch(getUrl(), {
    ethod: 'GET'
}).then(response => {
    return response.json();
}, error => {
    console.log(error);
});

const searchTerm = document.getElementById('search-term');
const searchButton = document.getElementById('search-button');
const searchResults = document.getElementById('search-results');
const divContent = document.getElementById('search-results');
divContent.hidden = true;

searchButton.addEventListener('click', () => {
    if (divContent.hidden == true) {
        divContent.hidden = false;
    }
    params.q = searchTerm.value;
    const url = getUrl();

    fetch(url, {
        method: 'GET'
    }).then(response => {
        return response.json();
    }, error => {
        console.log(error);
    }).then(data => {

        searchResults.innerHTML = '';

        data.data.forEach(gif => {
            const gifDiv = document.createElement('section');
            gifDiv.classList.add('gif');
            gifDiv.innerHTML = `<img src="${gif.images.fixed_height_small.url}" alt="${gif.title}">`;
            searchResults.appendChild(gifDiv);
        });
    });
});

window.onscroll = function () {
    if (window.pageYOffset > 20) {
        searchButton.style.display = 'none';
    }
    if (window.pageYOffset == 0 || window.pageYOffset < 5) {
        searchButton.style.display = 'block';
    }
    if (window.pageYOffset > 20) {
        searchTerm.hidden = true;
    }
    if (window.pageYOffset == 0 || window.pageYOffset < 5) {
        searchTerm.hidden = false;
    }
}
