import React from "react";
import { Link } from "react-router-dom";

function Logo({ fontSize }) {
  return (
    <Link to="/" className={`block ${fontSize}`} aria-label="Cruip">
      <span className="font-['Orbitron']">Q.</span>
    </Link>
  );
}
export default Logo;
