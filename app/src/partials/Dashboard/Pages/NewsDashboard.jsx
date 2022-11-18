import React, { useState, useEffect } from "react";
import NewsItems from "./NewsItem.jsx";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

function NewsDashboard() {
  const [items, setItems] = useState([]);
  const [active, setActive] = useState(1);
  const [category, setCategory] = useState("general");

  const links = [
    { id: 1, name: "General", value: "general" },
    { id: 2, name: "Business", value: "business" },
    { id: 3, name: "Entertainment", value: "entertainment" },
    { id: 4, name: "Health", value: "health" },
    { id: 5, name: "Science", value: "science" },
    { id: 6, name: "Sports", value: "sports" },
    { id: 7, name: "Technology", value: "technology" },
  ];

  function onClick(id, value) {
    console.log(id, value);
    setActive(id);
    setCategory(value);
  }

  useEffect(() => {
    axios
      .get(`${API_URL}/news/${category}`)
      .then((res) => {
        console.log(res.data.articles);
        setItems(res.data.articles);
      })
      .catch((err) => {
        console.log(err);
      });
    // fetch(
    //   `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=342e5a3a832e49e681b0a6c6f2665800`
    // )
    //   .then((res) => res.json())
    //   .then((data) => setItems(data.articles));
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
