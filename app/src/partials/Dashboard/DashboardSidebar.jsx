import React, { useState } from "react";
import Emoji from "../../utils/Emoji";
import Control from "../../images/control.png";
import Logo from "../../images/Q..png";
import { Link } from "react-router-dom";
import { BsChevronDown } from "react-icons/bs";
import { subWidgets } from "./SubWidgets"
import { StatefulSourceBox as SourceBox } from "./SourceBox";
import { CiLogout } from "react-icons/ci";

function DashboardSidebar() {
  const [open, setOpen] = useState(true);
  const [submenuOpen, setSubmenuOpen] = useState(false);

  const Menus = [
    {
      title: "Home",
      src: <Emoji symbol="🏠" label="Home" />,
      link: "/dashboard",
    },
    {
      title: "News",
      src: <Emoji symbol="🌎" label="News" />,
      link: "/dashboard/news",
    },
    // {
    //   title: "Productivity",
    //   src: <Emoji symbol="📥" label="Productivity" />,
    //   link: "/dashboard/productivity",
    // },
    {
      title: "Weather",
      src: <Emoji symbol="🌤" label="Weather" />,
      link: "/dashboard/weather",
    },
    {
      title: "Mindmap",
      src: <Emoji symbol="🧠" label="Weather" />,
      link: "/dashboard/mindmap",
    },

    {
      title: "Widget Drawer",
      src: <Emoji symbol="🎁" label="Drawer" />,
      link: "/dashboard/settings",
      submenu: true,
      submenuItems: { subWidgets },
    },
    // {
    //   title: "Settings",
    //   src: <Emoji symbol="⚙️" label="Settings" />,
    //   link: "/dashboard/settings",
    //   gap: true,
    // },
  ];

  const openMenuCloseDrawer = () => {
    setOpen(!open);
    setSubmenuOpen(false);
  };

  const openWidgetDrawer = (e, menu) => {
    let itemClicked = menu.src.props.label;
    console.log("Item clicked: ", itemClicked);
    if (itemClicked === "Drawer") {
      console.log("Drawer should open");
      setSubmenuOpen(!submenuOpen);
      e.preventDefault();
    }
  };

  const widgetClick = (widgetTitle) => {
    console.log("Widget clicked: ", widgetTitle);
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
          alt={"Control"}
        />
        <div className="flex gap-x-4 items-center">
          <img
            src={Logo}
            className={`cursor-pointer duration-500 ${
              open && "rotate-[360deg]"
            }`}
            alt={"Menubar cursor"}
          />
          <h1
            className={`text-white origin-left font-medium text-xl duration-200 ${
              !open && "scale-0"
            }`}
          >
            Quotidian.app
          </h1>
        </div>
        <ul className="pt-6 flex flex-col">
          {Menus.map((Menu, index) => (
            <div key={index}>
              <Link
                to={Menu.link}
                relative="path"
                onClick={(e) => openWidgetDrawer(e, Menu)}
              >
                <li
                  className={`flex  rounded-md p-2 cursor-pointer hover:bg-[#FEA303] hover:text-white hover:font-bold font-semibold text-slate-300 text-md items-center gap-x-4
              ${Menu.gap ? "mt-20" : "mt-2"} ${
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
                    <BsChevronDown
                      className={`${submenuOpen && "rotate-180"}`}
                    />
                  )}
                </li>
              </Link>
              {Menu.submenu && submenuOpen && open && <SourceBox />}
            </div>
          ))}
          <Link
            to={"/"}
            relative="path"
            onClick={(e) => {
              localStorage.clear();
              // window.location.reload();
            }}
          >
            <li
              className={
                "flex  rounded-md p-2 cursor-pointer hover:bg-[#FEA303] hover:text-white hover:font-bold font-semibold text-slate-300 text-md items-center gap-x-4 mt-20"
              }
            >
              <CiLogout />
              <span className={`${!open && "hidden"} origin-left duration-200`}>
                Logout
              </span>
              {/* {Menu.submenu && open && (
                <BsChevronDown className={`${submenuOpen && "rotate-180"}`} />
              )} */}
            </li>
          </Link>
        </ul>
      </div>
    </div>
  );
}

export default DashboardSidebar;
