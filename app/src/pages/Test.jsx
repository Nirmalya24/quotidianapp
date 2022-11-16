import React from "react";
import { useState, useEffect } from "react";

function Test() {
  const [user, setUser] = useState({});
  useEffect(() => {
    const user = localStorage.getItem("loginData");
    if (user) {
      setUser(JSON.parse(user));
    }
  }, []);

  return (
    <div>
      Test
      {user && <div>Hello {user.name}</div>}
    </div>
  );
}

export default Test;
