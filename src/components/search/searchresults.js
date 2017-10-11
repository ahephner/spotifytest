import _ from 'lodash';
import axios from 'axios'
import React, { Component } from 'react';
import Search from './search';

const spotifyUrl = 'https://api.spotify.com/v1/search?q=album%3'
const client_id = '4625fd59d3634a27ab6c9adedf1d163f'
const client_secret = '5ff822075e1e447f9290edd378377d70'
// const redirect = 'http://localhost:3000/callback'

let config = {
	headers: {
		'Authorization': 'Basic ' + new Buffer(client_id + ':' + client_secret).toString('base64'),
		'Accept':'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
	}
}
class SearchResults extends Component {
	constructor(props) {
		super(props);
		this.state = {
			albums: [],
			selectedAlbum: null
		};
		this.albumSearch('one');
	}

	albumSearch(term) {
		axios.get(`${spotifyUrl}` + term + '&type=album', config)
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