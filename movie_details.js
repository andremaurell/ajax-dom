const apiKey = '9fa01256c1010332acbc94e6652e7334';

function getMovieDetails(movieId) {
    const apiUrl = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&append_to_response=credits`;

    return fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro na solicitação da API');
              }
              return response.json();
        })
        .then(data => {
            return data;
        })
        .catch(error => {
            console.error('Erro:', error);
        });
}
function displayMovieDetails(movieId) {
    const movieDetailsContainer = document.getElementById('movieDetails');
    const movieTitleElement = document.getElementById('movieTitle');


  getMovieDetails(movieId)
    .then(movieDetails => {
      // Atualiza o título da página
      movieTitleElement.textContent = movieDetails.title;

      // Constrói o conteúdo dos detalhes do filme (você pode personalizar isso conforme necessário)
      const movieDetailsContent = `<p><strong>Descrição:</strong> ${movieDetails.overview}</p>
                                   <p><strong>Classificação:</strong> ${movieDetails.vote_average}</p>
                                   <p><strong>Data de Lançamento:</strong> ${movieDetails.release_date}</p>
                                   <h2>Elenco:</h2>
                                   <ul class='cast-list'>${getCastList(movieDetails.credits.cast)}</ul>`;
    

      // Exibe os detalhes do filme na página
      movieDetailsContainer.innerHTML = movieDetailsContent;
    });
}

// Função para obter uma lista formatada de membros do elenco
function getCastList(cast) {
    return cast.map(actor => {
      const actorPhoto = actor.profile_path
        ? `<img src="https://image.tmdb.org/t/p/w200${actor.profile_path}" alt="${actor.name}">`
        : '';
  
      return `<li>${actorPhoto} ${actor.name} as ${actor.character}</li>`;
    }).join('');
  }

// Verifica se o parâmetro movieId está presente na URL
const urlParams = new URLSearchParams(window.location.search);
const movieId = urlParams.get('movieId');

// Verifica se o ID do filme está presente e exibe os detalhes
if (movieId) {
  displayMovieDetails(movieId);
} else {
  // Redireciona para a página inicial se o ID do filme não estiver presente
  window.location.href = 'index.html';
}
