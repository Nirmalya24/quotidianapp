import React, { useState, useEffect } from "react";
import NewsItems from './NewsItem.jsx'
import axios from "axios";

function NewsDashboard() {
  const [items, setItems] = useState([]);
  const [active, setActive] = useState(1);
  const [category, setCategory] = useState("news");

  var options = {
    method: "GET",
    url: "https://api.newscatcherapi.com/v2/latest_headlines",
    params: {
      lang: "en",
      // sort_by: "relevancy",
      page: "1",
      page_size: "24",
      countries: "US",
      topic: category,
      when: "24h",
    },
    headers: {
      "x-api-key": "HmT_bPs53pwTD5N_1oMLLL77etqO9tHoD0RDCbyZsd0",
    },
  };

  const links = [
    { id: 1, name: "General", value: "news" },
    { id: 2, name: "Business", value: "business" },
    { id: 3, name: "Entertainment", value: "entertainment" },
    { id: 4, name: "Travel", value: "travel" },
    { id: 5, name: "Sports", value: "sport" },
    { id: 6, name: "Technology", value: "tech" },
  ];

  function onClick(id, value) {
    // console.log(id, value);
    setActive(id);
    setCategory(value);
  }

  useEffect(() => {
    axios
      .request(options)
      .then(function (response) {
        console.log(response.data.articles);
        setItems(response.data.articles);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, [category]);

  return (
    <div className="widget-page grow justify-center">
      <h1 className="news-title">See the Latest News</h1>
      <nav className="news-menu">
        <ul>
          {links.map((link) => (
            <li
              key={link.id}
              className={active === link.id ? "active" : "inactive"}
              onClick={() => onClick(link.id, link.value)}
            >
              {link.name}
            </li>
          ))}
        </ul>
      </nav>
      <div className="bg-gray-100 min-h-screen pt-16 pb-32 px-10">
        <div className="grid row-span-full grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-y-10 gap-x-6">
          {items.map((item, i) => (
            <NewsItems key={i} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default NewsDashboard;
