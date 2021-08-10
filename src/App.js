import React, {Component} from "react";
import './App.css';
import AppHeader from "./components/App-header/AppHeader";
import SearchPanel from "./components/Search-panel/SearchPanel";
import PostStatusFilter from "./components/Post-status-filter/PostStatusFilter";
import PostList from "./components/Post-list/PostList";
import PostAddForm from "./components/Post-add-form/PostAddForm";

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [
                {label: 'Post 1', important: true, like: false, id: 1},
                {label: 'Post 2', important: false, like: true, id: 2},
                {label: 'Post 3', important: false, like: false, id: 3},
            ]
        };
        this.deletePostItem = this.deletePostItem.bind(this)
        this.addPost = this.addPost.bind(this)

        this.maxId = 4;
    }

    deletePostItem(id) {
        this.setState(({posts}) => {
            // const index = posts.findIndex(elem => elem.id === id);

            // Нельзя на прямую менять state (BAD practice)

            // posts.splice(index, 1)
            // return {
            //     posts: posts
            // }

            // Второй, более правильный способ. Напрямую не меняется state

            // const before = posts.slice(0, index);
            // const after = posts.slice(index + 1);
            //
            // const newArr = [...before, ...after];

            // Мой способ на фильтрах в одну строчку и, о ЧУДО! Он работает...
            const postsFilter = posts.filter(val => val.id !== id);

            return {
                posts: postsFilter
            }
        })
    }

    addPost(text) {
        const newPost = {
            label: text,
            important: false,
            id: this.generatePostId()
        }
        this.setState(({posts}) => {
            const newArr = [...posts, newPost];
            return {
                posts: newArr
            }
        })
        console.log(this.state.posts)
    }

    generatePostId() {
        const array = new Uint32Array(1);
        const arrayAllId = [];
        window.crypto.getRandomValues(array);
        this.state.posts.forEach(val => {
            arrayAllId.push(val.id);
        })
        if (arrayAllId.includes(...array)) {
            this.generatePostId();
        }
        return array.join(',');
    }

    render() {
        return (
            <div className="app">
                <AppHeader/>
                <div className="search-panel d-flex">
                    <SearchPanel/>
                    <PostStatusFilter/>
                </div>
                <PostList postData={this.state.posts} onDeleted={this.deletePostItem}/>
                <PostAddForm addPost={this.addPost}/>
            </div>
        );
    }
}
