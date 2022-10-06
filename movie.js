document.addEventListener('DOMContentLoaded', () => {

    const api = '2c46288716a18fb7aadcc2a801f3fc6b';
    
    let getMovieById = () => {
        let url = document.URL;
        let split = url.split('?id=');

        let id = split[1];

        let movieWrapper = document.querySelector('.movie-wrapper');

        fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${api}&language=en-US`)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                let movieImg = document.createElement('img');
                movieImg.src = `https://image.tmdb.org/t/p/w500/${data.poster_path}`;
                movieImg.classList.add('movie-img');
                movieWrapper.appendChild(movieImg);

                let textWrapper = document.createElement('div');
                textWrapper.classList.add('movie-text-wrapper');
                movieWrapper.appendChild(textWrapper);

                let movieTitle = document.createElement('h1');
                movieTitle.classList.add('movie-title');
                movieTitle.textContent = data.title;
                textWrapper.appendChild(movieTitle);

                let genreWrapper = document.createElement('ul');
                genreWrapper.classList.add('genre-wrapper');

                for(let i = 0; i < data.genres.length; i++) {
                    let genre = document.createElement('li');
                    genre.classList.add('movie-genre');
                    genre.textContent = data.genres[i].name;
                    genreWrapper.appendChild(genre);
                }

                textWrapper.appendChild(genreWrapper);


                let movieTagline = document.createElement('p');
                movieTagline.classList.add('movie-tagline');
                movieTagline.textContent = data.tagline;
                textWrapper.appendChild(movieTagline);

                let movieOverview = document.createElement('p');
                movieOverview.classList.add('movie-overview');
                movieOverview.textContent = data.overview;
                textWrapper.appendChild(movieOverview);



               
            })
        .catch(error => console.log(error));


    }

    getMovieById();



    
});