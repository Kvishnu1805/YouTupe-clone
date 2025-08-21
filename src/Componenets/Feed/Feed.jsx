import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import moment from 'moment'
import "./Feed.css";

import {API_KEY} from '../../data'
import {value_counter} from '../../data'

const Feed = ({category}) => {

  const [data,setData] = useState([]);

  const fetchData = async () =>{
    const video_URl = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=150&regionCode=US&videoCategoryId=${category}&key=${API_KEY}`

    await fetch(video_URl).then(Response => Response.json()).then(data => setData(data.items));

  }

  useEffect( ()=> {
    fetchData()
  },[category])

  return (
    <div className="feed">
      {data.map((item,index) => {
        return (
          <Link key={index} to={`video/${item.snippet.categoryId}/${item.id}`} className="card">
        <img src={item.snippet.thumbnails.medium.url} alt="" />
        <h2>{item.snippet.title}</h2>
        <h3>{item.snippet.channelTitle}</h3>
        <p>{value_counter(item.statistics.viewCount)} views &bull; {moment(item.snippet.publishedAt).fromNow()}</p>
      </Link>
        )
      })}
      
       
    </div>
  );
};

export default Feed;
