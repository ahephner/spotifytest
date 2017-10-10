import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import SearchResults from './components/search/searchresults'

ReactDOM.render(
    <div className="row">
<App>
    <SearchResults />
</App>
</div>,
document.getElementById('root'));


