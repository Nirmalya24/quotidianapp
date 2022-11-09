import React, { useState } from "react";
import Emoji from "../utils/Emoji";
import Control from "../images/control.png";
import Logo from "../images/Q..png";
import { Link } from "react-router-dom";

function DashboardSidebar() {
  const [open, setOpen] = useState(true);
  const Menus = [
    {
      title: "Home",
      src: <Emoji symbol="🏠" label="Home" />,
      link: "/dashboard",
    },
    {
      title: "News",
      src: <Emoji symbol="📰" label="News" />,
      link: "/dashboard/news",
    },
    {
      title: "Productivity",
      src: <Emoji symbol="📥" label="Productivity" />,
      link: "/dashboard/productivity",
    },
    {
      title: "Schedule",
      src: <Emoji symbol="🗓️" label="Schedule" />,
      link: "/dashboard/schedule",
    },
    {
      title: "Setting",
      src: <Emoji symbol="⚙️" label="Settings" />,
      link: "/dashboard/settings",
    },
  ];

  return (
    <div className="flex">
      <div
        className={` ${
          open ? "w-72" : "w-20 "
        } bg-[#0E3506] h-screen p-5  pt-8 relative duration-300`}
      >
        <img
          src={Control}
          className={`absolute cursor-pointer -right-3 top-9 w-7 border-dark-purple
           border-2 rounded-full  ${!open && "rotate-180"}`}
          onClick={() => setOpen(!open)}
        />
        <div className="flex gap-x-4 items-center">
          <img
            src={Logo}
            className={`cursor-pointer duration-500 ${
              open && "rotate-[360deg]"
            }`}
          />
          <h1
            className={`text-white origin-left font-medium text-xl duration-200 ${
              !open && "scale-0"
            }`}
          >
            Quotidian.app
          </h1>
        </div>
        <ul className="pt-6">
          {Menus.map((Menu, index) => (
            <Link to={Menu.link} relative="path" key={index}>
              <li
                key={index}
                className={`flex  rounded-md p-2 cursor-pointer hover:bg-[#FEA303] hover:text-white hover:font-bold font-semibold text-slate-300 text-md items-center gap-x-4 
              ${Menu.gap ? "mt-8" : "mt-2"} ${
                  index === 0 && "bg-light-white"
                } `}
              >
                {Menu.src}
                <span
                  className={`${!open && "hidden"} origin-left duration-200`}
                >
                  {Menu.title}
                </span>
              </li>
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default DashboardSidebar;
