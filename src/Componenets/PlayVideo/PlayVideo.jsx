import React, { useEffect, useState } from "react";
import "./PlayVideo.css";
import { API_KEY } from "../../data";
import { value_counter } from "../../data";
import moment from "moment";

import like from "../../assets/like.png";
import dislike from "../../assets/dislike.png";
import share from "../../assets/share.png";
import save from "../../assets/save.png";
import { useParams } from "react-router-dom";

const PlayVideo =  () => {

  const {videoId} = useParams();
  //video data (title,discription,likes,comments)
  const [apiData, setApiData] = useState(null);

  //channel data
  const [channelData, setChannelData] = useState(null);

  //video comments
  const [CommentData, setCommentData] = useState([]);

  const fetchVideoData = async () => {
    //fetching videos Data
    const videoDetails_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${API_KEY}`;

    await fetch(videoDetails_url)
      .then((res) => res.json())
      .then((data) => setApiData(data.items[0]));
  };

  const fetchOtherData = async () => {
    //fetch channel details
    const channeldetails_url = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${apiData.snippet.channelId}&key=${API_KEY}`;

    await fetch(channeldetails_url)
      .then((res) => res.json())
      .then((data) => setChannelData(data.items[0]));

    //fetch Video comments
    const videoComment_url = `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&maxResults=50&videoId=${videoId}&key=${API_KEY}`;

    await fetch(videoComment_url)
      .then((res) => res.json())
      .then((data) => setCommentData(data.items));
  };

  useEffect(() => {
    fetchVideoData();
  }, [videoId]);

  // useEffect(() => {
  //   fetchOtherData();
  // }, [apiData]);

  useEffect(() => {
    if (apiData) {
      fetchOtherData();
    }
  }, [apiData]); 
  

  

  return (
    <div className="play-video">
      {/* <video src={video1} controls autoPlay muted></video> */}

      {videoId && (
        <iframe
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>

      )}

      <h3> {apiData ? apiData.snippet.title : "Title Here"}</h3>

      <div className="play-video-info">
        <p>
          {" "}
          {apiData ? value_counter(apiData.statistics.viewCount) : "16k"}views
          &bull; {apiData ? moment(apiData.snippet.publishedAt).fromNow() : " "}{" "}
        </p>
        <div>
          <span>
            <img src={like} alt="" />
            {apiData ? value_counter(apiData.statistics.likeCount) : "160"}
          </span>
          <span>
            <img src={dislike} alt="" />
          </span>
          <span>
            <img src={share} alt="" />
            share
          </span>
          <span>
            <img src={save} alt="" />
            save
          </span>
        </div>
      </div>

      <hr />

      <div className="publisher">
        <img
          src={channelData ? channelData.snippet.thumbnails.default.url : ""}
          alt=""
        />
        <div>
          <p>{apiData ? apiData.snippet.channelTitle : "Channel Title here"}</p>
          <span>
            {channelData
              ? value_counter(channelData.statistics.subscriberCount)
              : "1M"}{" "}
            Subscribes
          </span>
        </div>
        <button>Subscribe</button>
      </div>

      <div className="vid-description">
        <p>
          {apiData
            ? apiData.snippet.description.slice(0, 250)
            : "Description here"}
        </p>
        <hr />
        <h4>
          {apiData ? value_counter(apiData.statistics.commentCount) : "120"}{" "}
          comments
        </h4>

        {CommentData.map((comment, index) => {
          return (
            <div className="comment" key={index}>
              <img src={comment.snippet.topLevelComment.snippet.authorProfileImageUrl} alt="" />

              <div>
                <h3>
                  {comment.snippet.topLevelComment.snippet.authorDisplayName} <span>{moment(comment.snippet.topLevelComment.snippet.publishedAt).fromNow()}</span>
                </h3>
                <p>
                  {comment.snippet.topLevelComment.snippet.textDisplay}
                </p>

                <div className="comment-section">
                  <img src={like} alt="" />
                  <span>{value_counter(comment.snippet.topLevelComment.snippet.likeCount)}</span>
                  <img src={dislike} alt="" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PlayVideo;
