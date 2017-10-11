import _ from 'lodash';
import axios from 'axios'
import React, { Component } from 'react';
import Search from './search';

const spotifyUrl = 'https://api.spotify.com/v1/search?query=album:'

// here we need to connect to our server, localhost 8080 or whatever (we are using 3000 already)
// const ROOTURL = 'localhost:8080', for example

class SearchResults extends Component {
	constructor(props) {
		super(props);
		this.state = {
			albums: [],
			selectedAlbum: null
		};
		this.albumSearch('one');
	}

	//here, we need a method like getAccessToken(term) that tells our server(ROOTURL) to use our clientID and secret to get authorized
	//clientID 4625fd59d3634a27ab6c9adedf1d163f
	//client secret 5ff822075e1e447f9290edd378377d70
	//see https://developer.spotify.com/web-api/authorization-guide/#client-credentials-flow
	//our server needs to connect to https://accounts.spotify.com/api/token using our client id and secret
	// format for authorization header in server request: Authorization: Basic <base64 encoded client_id:client_secret>
	//it will return an access token
	//we need to put that access token in the header for albumSearch below
	//we can (probably)do that by invoking album search in our "then" promise, sending "term" and "accessToken"
	//format for auth header in album search: Authorization: Bearer NgCXRKdfjaslkMzYjw
	//if done correctly, this will return an object of albums and their properties. 


	//here is how it was set up in postman https://imgur.com/a/iiQ5w
	//grant type is required on the request
	//hardcode that access token into here to set up the format
	//https://developer.spotify.com/web-api/search-item/
	//be careful with merge... we will have multiple people on the same file. 

	albumSearch(term) { //this will also need to accept "accessToken"
		// can use example url to do the searchh here instead: https://api.spotify.com/v1/search?q=album:arrival%20artist:abba&type=album
		//eg axios.get(whateverURL + term + '&type=album', {
		// 	headers: {
		// 		Authorization: Bearer accessToken 
		// 	}
		// })
		// .then(albums => {
			// console.log('albums', albums)
		// 	do whatever with albums returned here
		// })
		axios.get(`${spotifyUrl}` + term + '&type=album')
		.then(albums => {
			console.log(albums)
			console.log('find albums check')
			this.setState({
				albums: albums,
				selectedAlbum: albums[0]
			})
		})
	}

	render() {
		const albumSearch = _.debounce((term)=>{ this.albumSearch(term) }, 300);
		return (
			<div>
				<Search onSearchTermChange={albumSearch} />
			</div>
		)
	}
}

export default SearchResults