const API_KEY = 'd061fa81cdd7349c114ca5fb27675263';
const myEndpoint = 'https://api.themoviedb.org/3/';
const startUrlImg = 'https://image.tmdb.org/t/p/original';
const accountId = 9995068;


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

                        fetch(`${myEndpoint}account/${accountId}/favorite/movies?api_key=${API_KEY}&session_id=${sessionId}&language=en-US&sort_by=created_at.desc&page=1`, {
                            method: 'GET',
                        })
                            .then(response => response.json())
                            .then(data => {

                                const favoriteMovie = data.results
                                const sortMovieByVote = favoriteMovie.sort((a, b) => (a.vote_average < b.vote_average) ? 1 : -1)
                           
                                sortMovieByVote.forEach((key) => {                         
                                    const titleRecomandation = document.getElementById('listMovieFavorit')
                                    const newDiv = document.createElement('div')
                                    newDiv.setAttribute('class', 'column justify-content-center col-xl-2 col-lg-3 col-md-4 col-6 mb-5')
                                    titleRecomandation.appendChild(newDiv)
                                    const divForImg = document.createElement('div')
                                    newDiv.appendChild(divForImg)
                                    const divForStarText = document.createElement('div')
                                    newDiv.appendChild(divForStarText)
                                    const divForText = document.createElement('div')
                                    divForStarText.appendChild(divForText)
                                    const posterImg = key.poster_path
                                    const newImg = document.createElement('img')
                                    newImg.setAttribute('src', `${startUrlImg}${posterImg}`)
                                    newImg.setAttribute('class', 'mb-2 rounded')
                                    newImg.style.width = '150px'
                                    divForImg.appendChild(newImg)
                                    const newH1 = document.createElement('h6')
                                    newH1.style.marginBottom = '0'
                                    newH1.style.paddingTop = '5px'
                                    newH1.textContent = key.original_title
                                    divForText.appendChild(newH1)
                                })                            
                            })
                    });
            });
    });   
