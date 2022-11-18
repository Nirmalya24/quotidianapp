import React from 'react';
import NGAvatar from '../images/NG-Avatar.png'
import ZWAvatar from '../images/ZW-Avatar.png'
import LKAvatar from '../images/LK-Avatar.png'
import Logo from "../utils/Logo";

function Creators() {
  return (
    <>
      <div class="grid grid-flow-col gap-4">
        <p className="mx-4 flex items-center justify-center">Made by</p>
        <div className="avatar w-8 rounded-full ring-2 ring-gray-300">
          <a href="https://github.com/Nirmalya24" target="_blank">
            <img src={NGAvatar} alt="NirmalyaGithub" />
          </a>
        </div>
        <div className="avatar w-8 rounded-full ring-2 ring-gray-300">
          <a href="https://github.com/zwang4-code" target="_blank">
            <img src={ZWAvatar} alt="ZiGithub" />
          </a>
        </div>
        <div className="avatar w-8 rounded-full ring-2 ring-gray-300">
          <a href="https://github.com/lammngo" target="_blank">
            <img src={LKAvatar} alt="LolitaGithub" />
          </a>
        </div>
      </div>
    </>
  );
}

function Footer() {
  return (
    <footer className="footer items-center p-4 bg-neutral text-neutral-content">
      <div className="items-center grid-flow-col">
        <Logo fontSize={"text-4xl"} />
      </div>
      <div className="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
        <Creators />
      </div>
    </footer>
  );
}

export default Footer;
