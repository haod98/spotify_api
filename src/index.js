const SpotifyWebApi = require("spotify-web-api-js");

const spotifyApi = new SpotifyWebApi();
const hashLink = window.location.hash;

const hashEqualSign = window.location.hash.indexOf('=') + 1;
const hashAndSign = window.location.hash.indexOf('&');

const access_token = window.location.hash.substr(hashEqualSign, hashAndSign - hashEqualSign);
const headers = new Headers();
headers.set('Authorization', `Bearer ${access_token}`);


const contentBody = document.querySelector('.j-contentContainer');

console.log(contentBody);
spotifyApi.setAccessToken(access_token);
spotifyApi.getMyTopTracks({ limit: 10 }, (err, data) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`Artist albums`, data);
    for (let i = 0; i < data.items.length; i++) {
      const artistName = data.items[i].artists[0].name;
      const favouriteTrack = data.items[i].name;
      const albumCoverSrc = data.items[i].album.images[1].url;
      const urlTrack = data.items[i].external_urls.spotify;
      contentBody.innerHTML += `
      <div class="cardTrack">
        <p><span class=topTen> ${i + 1}. </span> ${artistName} - ${favouriteTrack} </p>
        <img src="${albumCoverSrc}" alt="Album Cover from ${artistName} Song: ${favouriteTrack}">
        <a href="${urlTrack}" target="_blank" class="spotifyLinks">Listen <span class="bold">${artistName} - ${favouriteTrack}</span></a>
      </div>
      `
      console.log(urlTrack);

    }
  }
});