const SpotifyWebApi = require("spotify-web-api-js");

const spotifyApi = new SpotifyWebApi();
const hashLink = window.location.hash;

const hashEqualSign = window.location.hash.indexOf('=') + 1;
const hashAndSign = window.location.hash.indexOf('&');

const access_token = window.location.hash.substr(hashEqualSign, hashAndSign - hashEqualSign);
const headers = new Headers();
headers.set('Authorization', `Bearer ${access_token}`);

console.log(access_token);
spotifyApi.setAccessToken(access_token);
spotifyApi.getMyTopTracks({type: 'artists'}, (err, data) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`Artist albums`, data);
  }
})