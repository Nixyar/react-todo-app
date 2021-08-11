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
            ],
            term: '',
            filter: 'all'
        };
        this.deletePostItem = this.deletePostItem.bind(this);
        this.addPost = this.addPost.bind(this);
        this.onToggleLike = this.onToggleLike.bind(this);
        this.onToggleImportant = this.onToggleImportant.bind(this);
        this.searchPost = this.searchPost.bind(this);
        this.updateSearch = this.updateSearch.bind(this);
        this.filterSelect = this.filterSelect.bind(this);

        this.maxId = 4;
    }

    updateSearch(term) {
        this.setState({term})
    }

    searchPost(items, term) {
        if (!term.length) {
            return items;
        }

        return items.filter(item => {
            return item.label.toLowerCase().match(term.toLowerCase());
        })
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

            // Мой способ на фильтрах в одну строчку и, о ЧУДО! Он работает правильно, так как фильтрр иммутабельный...
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

    onToggleLike(id) {
        this.changeStatusInPost(true, id);
    }

    onToggleImportant(id) {
        this.changeStatusInPost(false, id);
    }

    changeStatusInPost(liked = false, id) {
        this.setState(({posts}) => {
            const index = posts.findIndex(elem => elem.id === id);
            const postForIndex = posts[index];
            const changeLikePost = liked ? {...postForIndex, like: !postForIndex.like} : {
                ...postForIndex,
                important: !postForIndex.important
            };
            const newArr = [...posts.slice(0, index), changeLikePost, ...posts.slice(index + 1)];
            return {
                posts: newArr
            }
        });
    }

    filterPost(items, filter) {
        if (filter === 'like') {
            return items.filter(val => val.like === true);
        } else {
            return items;
        }
    }

    filterSelect(filter) {
        this.setState({filter});
    }

    render() {
        const {posts, term, filter} = this.state;
        const visiblePosts = this.filterPost(this.searchPost(posts, term), filter);
        const postsLength = posts.length;
        const liked = posts.filter(val => val.like === true).length;
        return (
            <div className="app">
                <AppHeader posts={postsLength} liked={liked}/>
                <div className="search-panel d-flex">
                    <SearchPanel inputText={term} updateSearch={this.updateSearch}/>
                    <PostStatusFilter filterSelect={this.filterSelect} filter={filter}/>
                </div>
                <PostList onToggleLike={this.onToggleLike}
                          onToggleImportant={this.onToggleImportant}
                          onDeleted={this.deletePostItem}
                          postData={visiblePosts}/>
                <PostAddForm addPost={this.addPost}/>
            </div>
        );
    }
}
