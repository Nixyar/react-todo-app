import React from "react";
import './App.css';
import AppHeader from "./components/App-header/AppHeader";
import SearchPanel from "./components/Search-panel/SearchPanel";
import PostStatusFilter from "./components/Post-status-filter/PostStatusFilter";
import PostList from "./components/Post-list/PostList";
import PostAddForm from "./components/Post-add-form/PostAddForm";

function App() {
    const posts = [
        {label: 'Post 1', important: true, like: false},
        {label: 'Post 2', important: false, like: true},
        {label: 'Post 3', important: false, like: false},
        9,
        {},
        []
    ]

    return (
        <div className="app">
            <AppHeader/>
            <div className="search-panel d-flex">
                <SearchPanel/>
                <PostStatusFilter/>
            </div>
            <PostList postData={posts}/>
            <PostAddForm/>
        </div>
    );
}

export default App;
