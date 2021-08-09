import React from "react";
import './PostList.css'
import PostListItem from "../Post-list-item/PostListItem";
import {ListGroup} from "reactstrap";

const PostList = (props) => {
    const itemsPosts = props.postData.map((item, i) => {
        if (checkObject(item)) {
            return (
                <li className="list-group-item" key={`post-id-${i}`}>
                    <PostListItem label={item.label} important={item.important} like={item.like}/>
                </li>
            )
        } else {
            return null;
        }
    })

    function checkObject(obj) {
        if (typeof obj === 'object') {
            return !!obj.label
        }
    }

    return (
        <ListGroup className="app-list list-group">
            {itemsPosts}
        </ListGroup>
    )
}

export default PostList;
