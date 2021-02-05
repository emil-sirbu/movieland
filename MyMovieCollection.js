const API_KEY = 'd061fa81cdd7349c114ca5fb27675263';
const myEndpoint = 'https://api.themoviedb.org/3/';
const startUrlImg = 'https://image.tmdb.org/t/p/original';
const starImg = './img/star_for_raiting.png';
const favoriteButton = './img/heart_img.png';
const accountId = 9995068;


function searchMovie() {

    const movieInput = document.getElementById('movie');
    const movieInputValue = movieInput.value;

    fetch(`${myEndpoint}search/movie?api_key=${API_KEY}&query=${movieInputValue}`)
        .then(response => response.json())
        .then(data => {

            console.log(data);
            const resultArray = data.results

            const cleanDisplayRating = document.getElementById('listMovie')
            cleanDisplayRating.innerHTML = '';

            resultArray.forEach((key) => {
                const titleRecomandation = document.getElementById('listMovie')
                const newDiv = document.createElement('div')
                newDiv.setAttribute('class', 'col-xl-2 col-lg-3 col-md-4 col-6 mb-5')
                titleRecomandation.appendChild(newDiv)
                const divForImg = document.createElement('div')
                divForImg.setAttribute('class', 'parentDiv')
                newDiv.appendChild(divForImg)
                const divForStarText = document.createElement('div')
                divForStarText.setAttribute('class', 'starDiv')
                newDiv.appendChild(divForStarText)
                const divForStar = document.createElement('div')
                divForStar.setAttribute('id', key.id)
                divForStar.style.display = 'flex'
                const divForStar2 = document.createElement('div')
                divForStar.appendChild(divForStar2)
                const divForText = document.createElement('div')
                divForStarText.appendChild(divForStar)
                divForStarText.appendChild(divForText)
                const posterImg = key.poster_path
                if (posterImg == null) {
                    newDiv.style.display = 'none'
                }
                const newImg = document.createElement('img')
                newImg.setAttribute('src', `${startUrlImg}${posterImg}`)
                newImg.setAttribute('class', 'mb-2 rounded mainImg')
                newImg.style.width = '150px'
                const heartImg = document.createElement('img')
                heartImg.setAttribute('src', `${favoriteButton}`)
                heartImg.setAttribute('class', `heartImg ${key.id}`)
                heartImg.onclick = markFavorite;
                heartImg.style.width = '30px'
                divForImg.appendChild(newImg)
                divForImg.appendChild(heartImg)
                let numberStar = 0;
                for (let starNumImg = 0; starNumImg < 5; starNumImg++) {
                    const starNumImg = document.createElement('img')
                    starNumImg.onclick = getRating;
                    starNumImg.setAttribute('id', key.id)
                    starNumImg.setAttribute('src', `${starImg}`)
                    starNumImg.style.width = '20px'
                    divForStar2.appendChild(starNumImg)
                    numberStar += 1;
                    starNumImg.setAttribute('class', `${numberStar}`)
                }
                const newH6 = document.createElement('h6')
                newH6.style.marginBottom = '0'
                newH6.style.paddingTop = '5px'
                newH6.textContent = key.original_title
                divForText.appendChild(newH6)
            })

            movieInput.value = '';
        })
}

const getInput = document.getElementById('movie');
getInput.addEventListener('keyup', function (event) {
    if (event.defaultPrevented) {
        return;
    }

    let key = event.keyCode;
    if (key === 13) {
        searchMovie();
    }
})


function getRating(event) {
    const myID = event.target.id
    const myNumber = event.toElement.className
    const myBody = {
        'value': myNumber
    }

    fetch(`${myEndpoint}authentication/token/new?api_key=${API_KEY}`, {
        method: 'GET'
    })
        .then(response => response.json())
        .then(data => {

            const tokenE = data.request_token;

            fetch(`${myEndpoint}authentication/token/validate_with_login?api_key=${API_KEY}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    'username': 'E-milS',
                    'password': 'rM@Gk2@899xMdyD',
                    'request_token': `${tokenE}`
                })
            })
                .then(response => response.json())
                .then(data => {

                    const validatedToken = data.request_token;

                    fetch(`${myEndpoint}authentication/session/new?api_key=${API_KEY}`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            request_token: validatedToken
                        })
                    })
                        .then(response => response.json())
                        .then(data => {

                            const sessionId = data.session_id;

                            fetch(`${myEndpoint}movie/${myID}/rating?api_key=${API_KEY}&session_id=${sessionId}`, {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json;charset=utf-8'
                                },
                                body: JSON.stringify(myBody)
                            })
                                .then(response => response.json())
                                .then(data => {

                                    const ratingNote = data

                                    if (ratingNote.success === true) {
                                        const ratingMovie = document.getElementById(myID)
                                        const checkTheButton = ratingMovie.querySelector('button')
                                        if (checkTheButton === null) {
                                            const newDiv = document.createElement('div')
                                            ratingMovie.appendChild(newDiv)
                                            const newButton = document.createElement('button')
                                            newButton.setAttribute('class', 'ratingNoteCss px-2 fw-bold')
                                            newButton.textContent = myNumber
                                            newDiv.appendChild(newButton)
                                        } else {
                                            checkTheButton.remove();
                                            const newDiv = document.createElement('div')
                                            ratingMovie.appendChild(newDiv)
                                            const newButton = document.createElement('button')
                                            newButton.setAttribute('class', 'ratingNoteCss px-2 fw-bold')
                                            newButton.textContent = myNumber
                                            newDiv.appendChild(newButton)
                                        }
                                    }
                                });
                        });
                });
        })
}


function markFavorite(event) {
    const myID = event.toElement.classList[1]
    const myBody = {
        'media_type': 'movie',
        'media_id': myID,
        'favorite': true
    }

    fetch(`${myEndpoint}authentication/token/new?api_key=${API_KEY}`, {
        method: 'GET'
    })
        .then(response => response.json())
        .then(data => {

            const tokenE = data.request_token;

            fetch(`${myEndpoint}authentication/token/validate_with_login?api_key=${API_KEY}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    'username': 'E-milS',
                    'password': 'rM@Gk2@899xMdyD',
                    'request_token': `${tokenE}`
                })
            })
                .then(response => response.json())
                .then(data => {

                    const validatedToken = data.request_token;

                    fetch(`${myEndpoint}authentication/session/new?api_key=${API_KEY}`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            request_token: validatedToken
                        })
                    })
                        .then(response => response.json())
                        .then(data => {

                            const sessionId = data.session_id;

                            fetch(`${myEndpoint}account/${accountId}/favorite?api_key=${API_KEY}&session_id=${sessionId}`, {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json;charset=utf-8'
                                },
                                body: JSON.stringify(myBody)
                            })
                                .then(response => response.json())
                                .then(data => {

                                    console.log(data);
                                })
                        });
                })
        })
}