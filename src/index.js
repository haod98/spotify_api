const SpotifyWebApi = require("spotify-web-api-js");
const githubUrlHomepage = "https://haod98.github.io/spotify_api/";
const localhostUrlHomepage = "http://127.0.0.1:5500/";

const spotifyApi = new SpotifyWebApi();
//Get the access token from hash 
const hashLink = window.location.hash;
const hashEqualSign = hashLink.indexOf('=') + 1;
const hashAndSign = hashLink.indexOf('&');
//Set access token in HTTP Head
const access_token = hashLink.substr(hashEqualSign, hashAndSign - hashEqualSign);
const headers = new Headers();
headers.set('Authorization', `Bearer ${access_token}`);



spotifyApi.setAccessToken(access_token);
spotifyApi.getMyTopTracks({ limit: 10 }, (err, data) => {
  const contentBody = document.querySelector('.j-contentContainer');
  if (err) {
    let secondsLeft = 5;
    const errorContainer = document.querySelector('.j-showErrorMsg');
    const countdownTag = document.createElement('p');
    countdownTag.textContent = secondsLeft;
    errorContainer.appendChild(countdownTag);
    errorContainer.style.display = "block";
    const countdown = setInterval(() => {
      countdownTag.innerHTML = secondsLeft;
      console.log(secondsLeft);

      if (secondsLeft === 0) {
        window.location.replace(githubUrlHomepage);
        clearInterval(countdown);
      }
      --secondsLeft;
    }, 1000);

  } else if (data.items.length > 0) {
    for (let i = 0; i < data.items.length; i++) {
      const artistName = data.items[i].artists[0].name;
      const favoriteTrack = data.items[i].name;
      const albumCoverSrc = data.items[i].album.images[1].url;
      const urlTrack = data.items[i].external_urls.spotify;
      contentBody.innerHTML += `
      <div class="cardTrack">
        <p><span class=topTen> ${i + 1}. </span> ${artistName} - ${favoriteTrack} </p>
        <img src="${albumCoverSrc}" alt="Album Cover from ${artistName} Song: ${favoriteTrack}">
        <a href="${urlTrack}" target="_blank" class="spotifyLinks">Listen <span class="bold">${artistName} - ${favoriteTrack}</span></a>
      </div>
      `

    }
  } else {
    /**
     * @todo create error msg if now data can be found
     */
    console.log('No data found');
  }
});