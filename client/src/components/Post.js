import React from 'react'
import {formatISO9075} from 'date-fns';
import { Link } from 'react-router-dom';
import '../App.css'

export default function Post({_id,title,summary,cover,content,createdAt,author}){
    return (
      <div className="post">
        <div className="image">
          <Link to={`/post/${_id}`}>
            <img src={'http://localhost:4000/'+cover} alt="" />
          </Link>
        </div>
        <div className="texts">
          <Link to={`/post/${_id}`}>  
            <h2>{title}</h2>
          </Link>
          <p className="info">
            <a className="author">{author.username}</a>
            <time className='time'>{formatISO9075(new Date(createdAt))}</time>
          </p>
          <p>{summary}</p>
        </div>
      </div>
    );
}