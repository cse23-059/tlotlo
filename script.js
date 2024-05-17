//TMDB

const API_KEY = 'api_key=0191d5388dd10a7532ba70c1c2f8531a';
const BASE_URL = 'https://api.themoviedb.org/3/';
const API_URL = BASE_URL + 'discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&' + API_KEY;
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const searchURL = BASE_URL + '/search/movie?' + API_KEY;

const genres = [
    {
      "id": 28,
      "name": "Action"
    },
    {
      "id": 12,
      "name": "Adventure"
    },
    {
      "id": 16,
      "name": "Animation"
    },
    {
      "id": 35,
      "name": "Comedy"
    },
    {
      "id": 80,
      "name": "Crime"
    },
    {
      "id": 99,
      "name": "Documentary"
    },
    {
      "id": 18,
      "name": "Drama"
    },
    {
      "id": 10751,
      "name": "Family"
    },
    {
      "id": 14,
      "name": "Fantasy"
    },
    {
      "id": 36,
      "name": "History"
    },
    {
      "id": 27,
      "name": "Horror"
    },
    {
      "id": 10402,
      "name": "Music"
    },
    {
      "id": 9648,
      "name": "Mystery"
    },
    {
      "id": 10749,
      "name": "Romance"
    },
    {
      "id": 878,
      "name": "Science Fiction"
    },
    {
      "id": 10770,
      "name": "TV Movie"
    },
    {
      "id": 53,
      "name": "Thriller"
    },
    {
      "id": 10752,
      "name": "War"
    },
    {
      "id": 37,
      "name": "Western"
    }
  ]


const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');
const carouselInner = document.querySelector('.carousel-inner');
const tagEL = document.getElementById('tag')

var selectedGenre = []
setGenre();
function setGenre(){
    tagEL.innerHTML = '';
    genres.forEach(genre => {
        const t = document.createElement('div');
        t.classList.add('tag');
        t.id = genre.id;
        t.innerText = genre.name;
        t.addEventListener('click', () => {
            if(selectedGenre.length == 0){
                selectedGenre.push(genre.id)
            }else{
                if(selectedGenre.includes(genre.id)){
                    selectedGenre.forEach((id, idx) => {
                        if (id == genre.id){
                            selectedGenre.slpce(idx, 1);
                        }
                    })
                }else{
                    selectedGenre.push(genre.id);
                }
            }
            console.log(selectedGenre)
            getMovies(API_URL + '&with_genres=' +encodeURI(selectedGenre.join(',')));
            highlightselection()

        })
        tagEL.append(t);
    })
}

function highlightselection(){

    const tags = document.querySelectorAll('.tag');
    tags.forEach(tag => {
        tag.classList.remove('highlight');
    })

    if(selectedGenre.length !=0){
        selectedGenre.forEach(id => {
            const highlightedtag = document.getElementById(id);
            highlightedtag.classList.add('highlight');
        })
    }
   
}

getMovies(API_URL);

function getMovies(url) {
    fetch(url)
        .then(res => res.json()) // Corrected: res.json() is a function
        .then(data => {
            console.log(data)
            if(data.results.length !==0){
                showmovies(data.results);

            }else{
                main.innerHTML = '<h1> no results found </h1>'
            }
        })
}


function showmovies(data) {
    main.innerHTML = '';

    data.forEach(movie => {
        const {title, poster_path, vote_average, overview, id} = movie;
        const movieEl = document.createElement('div');
        movieEl.classList.add('movie');
        movieEl.innerHTML = `
        
        
        <img src="${IMG_URL}${poster_path}" alt="${title}"> 


        <div class="movie-info">
            <h1>${title}</h1>
            <span class="${getcolor(vote_average)}">${vote_average}</span>
          </div>

          <div class="overview">
            <h3>Overview</h3>
                ${overview}
                <br/>
                <button class="movie-info" id="${id}> Movie Info</button
            </div>
            `
        main.appendChild(movieEl);

        document.getElementById(id).addEventListener('click', () => {
            console.log(id)
            openNav()
        })
    });
    
}
/* Open when someone clicks on the span element */
function openNav() {
    document.getElementById("myNav").style.width = "100%";
  }
  
  /* Close when someone clicks on the "x" symbol inside the overlay */
  function closeNav() {
    document.getElementById("myNav").style.width = "0%";
  }

function getcolor(vote){

    if(vote => 8){
        return"green"
    }
        else if(vote => 5){
            return"orange"
        }else{
            return"red"
        }
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const searchTerm = search.value;

    if(searchTerm){
        getMovies(searchURL+'&query='+searchTerm);
    }else{
        getMovies(API_URL);
    }
});


