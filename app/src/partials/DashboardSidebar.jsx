import React, { useState } from "react";
import Emoji from "../utils/Emoji";
import Control from "../images/control.png";
import Logo from "../images/Q..png";
import { Link } from "react-router-dom";
import { BsChevronDown } from "react-icons/bs";

function DashboardSidebar() {
  const [open, setOpen] = useState(true);
  const [submenuOpen, setSubmenuOpen] = useState(false)

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
      title: "Weather",
      src: <Emoji symbol="🌤" label="Weather" />,
      link: "/dashboard/weather",
    },
    {
      title: "Setting",
      src: <Emoji symbol="⚙️" label="Settings" />,
      link: "/dashboard/settings",
    },
    {
      title: "Widget Drawer",
      src: <Emoji symbol="🎁" label="Drawer" />,
      link: "/dashboard/settings",
      submenu: true,
      submenuItems: [
        { 
          title: "To Do List", 
          icon: <Emoji symbol="📝" label="ToDo" />,
        },
        { 
          title: "Mind Map", 
          icon: <Emoji symbol="🧠" label="MindMap" />,
        },
        { 
          title: "Timer" , 
          icon: <Emoji symbol="⏰" label="Timer" />,
        },
      ],
    },
  ];

  const openMenuCloseDrawer = () => {
    setOpen(!open);
    setSubmenuOpen(false);
  }

  const openWidgetDrawer = (e, menu) => {
    let itemClicked = menu.src.props.label;
    console.log("Item clicked: ", itemClicked);
    if (itemClicked === "Drawer") {
      console.log("Drawer should open");
      setSubmenuOpen(!submenuOpen);
      e.preventDefault();
    }
  };

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
           border-2 rounded-full z-10 ${!open && "rotate-180"}`}
          onClick={openMenuCloseDrawer}
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
            <Link
              to={Menu.link}
              relative="path"
              key={index}
              onClick={(e) => openWidgetDrawer(e, Menu)}
            >
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
                {Menu.submenu && open && (
                  <BsChevronDown className={`${submenuOpen && "rotate-180"}`} />
                )}
              </li>
              {Menu.submenu && submenuOpen && open && (
                <div className="grid grid-cols-2 pl-2">
                  {Menu.submenuItems.map((submenuItem, index) => (
                    <div
                      key={index}
                      className={`rounded-md cursor-pointer hover:bg-[#FEA303] hover:text-white hover:font-bold font-semibold text-slate-300 items-center`}
                    >
                      <div className="card items-center text-center width-auto card-compact py-3">
                        <h2 className="text-xs">{submenuItem.title}</h2>
                        <div className="text-3xl">{submenuItem.icon}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default DashboardSidebar;
