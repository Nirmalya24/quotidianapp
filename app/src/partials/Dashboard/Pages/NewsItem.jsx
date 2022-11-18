import React from "react";
import NewsError from "../../../images/news-fallback.jpg";

function NewsItem({ item }) {
  const websiteUrl = item.url;
  // const website = websiteUrl.split("https://").pop().split("/")[0];

  const date = item.published_date.split(" ");
  const formatDate = date[0];
  const formatTime = date[1];

  const onError = (e) => {
    e.target.onerror = null;
    e.target.src = NewsError;
  };

  return (
    <a href={item.link}>
      <div className="card max-w-lg bg-base-100 shadow-lg rounded-lg hover:shadow-2xl transition duration-300">
        <figure>
          {/* // TODO: onError is not triggered */}
          <img src={item.media} alt={item.title} onError={onError} />
        </figure>
        <div className="card-body">
          <div className="card-title">
            <h2>{item.title}</h2>
          </div>
          {/* <div className="article-source">
            <img
              src={`https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE, SIZE,
                    URL&url=http://${website}&size=16`}
              alt={item.source.id}
            />
            <span>{item.source.name}</span>
          </div> */}
          {/* First 150 characters of the summary */}
          <p>{item.summary.slice(0, 150)}...</p>
          <div className="grid place-items-end">
            <div className="border border-solid border-black rounded-lg">
              <div className="px-2 inline-block text-xs">
                <div>
                  <b>Published At: </b>
                  {formatTime}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </a>
  );
}

export default NewsItem