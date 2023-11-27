function searchMovies() {
  const searchInput = document.getElementById('searchInput').value;

  const apiKey = '9fa01256c1010332acbc94e6652e7334';
  const apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchInput}`;

  // Fazendo a solicitação AJAX
  fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error('Erro na solicitação da API');
      }
      return response.json();
    })
    .then(data => {
      const movies = data.results;
      localStorage.setItem('lastSearchResults', JSON.stringify(movies));
      displayResults(movies);
    })
    .catch(error => {
      console.error('Erro:', error);
    });
}

function displayResults(results) {
  const resultsContainer = document.getElementById('results');
  resultsContainer.innerHTML = '';

  if (results.length === 0) {
    resultsContainer.innerHTML = '<p>Nenhum resultado encontrado.</p>';
    return;
  }

  results.forEach(movie => {
    const movieCard = document.createElement('div');
    movieCard.classList.add('movie-card');

    const movieDetails = document.createElement('div');
    movieDetails.innerHTML = `<h2>${movie.title}</h2>
                              <p>${movie.overview}</p>
                              <p>Classificação: ${movie.vote_average}</p>
                              <p>Data de Lançamento: ${movie.release_date}</p>`;
                            

    const imageElement = document.createElement('img');
    imageElement.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
    imageElement.alt = movie.title;
    imageElement.classList.add('movie-image');

    const detailsLink = document.createElement('a');
    detailsLink.href = `movie_details.html?movieId=${movie.id}`;
    detailsLink.textContent = 'Ver Detalhes';
    
    movieDetails.appendChild(detailsLink);
    movieCard.appendChild(imageElement);
    movieCard.appendChild(movieDetails);
    resultsContainer.appendChild(movieCard);

  });
  
  // Chama a função para carregar os resultados da última pesquisa ao carregar a página
  window.addEventListener('load', loadLastSearchResults);

}
