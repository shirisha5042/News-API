document.addEventListener('DOMContentLoaded', function () {
    // Fetch general news by default when the page loads
    fetchNews('general');
});

function fetchNews(category = '') {
    const apiKey = 'b09f5297530741ad9e0fcaa7cc92d88f'; // Replace with your actual API key
    let url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`;
    
    // If a category is specified, add it to the URL
    if (category) {
        url += `&category=${category}`;
    }

    const searchTerm = document.getElementById('search').value;
    // If there's a search term, search for it
    if (searchTerm) {
        url = `https://newsapi.org/v2/everything?q=${searchTerm}&apiKey=${apiKey}`;
    }

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const newsContainer = document.getElementById('news-container');
            newsContainer.innerHTML = '';

            data.articles.forEach(article => {
                const articleElement = document.createElement('div');
                articleElement.classList.add('article');
                articleElement.innerHTML = `
                    <div class="article-image">
                        <img src="${article.urlToImage}" alt="${article.title}">
                    </div>
                    <div class="article-content">
                        <h2>${article.title}</h2>
                        <p>${article.description || 'No description available.'}</p>
                        <a href="${article.url}" target="_blank">Read more</a>
                    </div>
                `;
                newsContainer.appendChild(articleElement);
            });
        })
        .catch(error => console.error('Error fetching the news:', error));
}
