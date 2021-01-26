import React from "react";
import './PostList.css'
import PostListItem from "../Post-list-item/PostListItem";

const PostList = (props) => {
    const itemsPosts = props.postData.map((item, i) => {
        if (checkObject(item)) {
            return (
                <li className="list-group-item" key={`post-id-${i}`}>
                    <PostListItem label={item.label} important={item.important} like={item.like}/>
                </li>
            )
        }
    })

    function checkObject(obj) {
        if (typeof obj === 'object') {
            for (let label in obj) {
                return true
            }
            return false
        }
    }

    return (
        <ul className="app-list list-group">
            {itemsPosts}
        </ul>
    )
}

export default PostList;
