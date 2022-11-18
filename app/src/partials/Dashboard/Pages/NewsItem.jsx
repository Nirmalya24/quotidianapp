import React from "react";

function NewsItem({ item }) {
    const websiteUrl = item.url
    const website = websiteUrl.split('https://').pop().split('/')[0]

    const date = item.publishedAt
    const formatDate = date.replace('T', '')
    const formatTime = formatDate.replace('Z', '')

    return (
        <a href={item.url}>
            <div className="card max-w-lg bg-base-100 shadow-lg rounded-lg hover:shadow-2xl transition duration-300">
                <figure><img src={item.urlToImage} alt={item.title} /></figure>
                <div className="card-body">
                    <div className="card-title">
                        <h1>{item.title}</h1>
                    </div>
                    <div className="article-source">
                        <img src={`https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE, SIZE,
                    URL&url=http://${website}&size=16`} alt={item.source.id} />
                        <span>{item.source.name}</span>
                    </div>
                    <p>{item.description}</p>
                    <div className="grid place-items-end">
                        <div className="border border-solid border-black rounded-lg">
                            <div className="px-2 inline-block text-xs">
                                <div><b>Published At: </b>{formatTime}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </a>
    )
}

export default NewsItem