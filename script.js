document.addEventListener('DOMContentLoaded', () => {
    const api = '2c46288716a18fb7aadcc2a801f3fc6b';

    let page = 1;

    let movieWrapper = document.querySelector('.movies');
    let pageWrapper = document.querySelector('.pages');


    // Movies 
    let getAllMovies = (category = 'popular', page = 1) => {
        fetch(`https://api.themoviedb.org/3/movie/${category}?api_key=${api}&language=en-US&page=${page}`)
        .then((response) => response.json())
        .then((data) => data.results.map((movie) => {
            console.log(data);
            let movieElm = document.createElement('a');
            movieElm.href = `./movie.html?id=${movie.id}`;
            movieElm.classList.add('movie');
            movieWrapper.appendChild(movieElm);

            let movieImg = document.createElement('img');
            movieImg.classList.add('movie-img');
            movieImg.src = `https://image.tmdb.org/t/p/w200/${movie.poster_path}`;
            movieElm.appendChild(movieImg);

            let textWrapper = document.createElement('div');
            textWrapper.classList.add('movie-text-wrapper');

            let movieTitle = document.createElement('h2');
            movieTitle.innerText = movie.original_title;
            movieTitle.classList.add('movie-title');
            textWrapper.appendChild(movieTitle);
            

            let moviePopularity = document.createElement('p');
            moviePopularity.classList.add('movie-popularity');
            moviePopularity.innerText = 'Popularity: ' + movie.popularity;
            textWrapper.appendChild(moviePopularity);

            movieElm.appendChild(textWrapper);            



        }))
    .catch(error => console.log(error));
    }

    
    getAllMovies();

    // Pages
    let setPages = () => {
        for(let i = 0; i <= 50; i++) {
            let pageBtn = document.createElement('button');
            pageBtn.textContent = i;
            pageBtn.classList.add('page');
            pageWrapper.appendChild(pageBtn);

            pageBtn.addEventListener('click', () => {
                movieWrapper.innerHTML = "";

                getAllMovies('popular', i);
            })
        }
    }
    
    setPages();

    let sorting = document.querySelectorAll('.sorting-btn');

    let sortByCategory = (category = 'popular', pageNum = 1) => {
        movieWrapper.innerHTML = "";
        
        getAllMovies(category, pageNum);
    }
    
    sorting.forEach((option) => {
        option.addEventListener('click', () => {
            switch(true) {
                case option.id === 'popular' : {
                    sortByCategory('popular', page);
                    break;
                }
                case option.id === 'showing' : {
                    sortByCategory('now_playing', page);
                    break;
                }
                
                case option.id === 'favorited' : {
                    sortByCategory('upcoming', page);
                    break;
                }
            
    
            }
        })
    })
    
    



})

// Sorting
