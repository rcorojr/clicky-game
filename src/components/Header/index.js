import React from "react";

function Header() {
  return (
    <div className="align-items-center bg-header jumbotron header-hgt header-pad head-mar-top nav-shadow neon text-center yx-auto text-center">
      <h1 className="flicker-1 header-font">
        Click on an image for points!
      </h1>
      <h1 className="flicker-1 header-font">
        Be sure to only click once!
      </h1>
    </div>
  );
}

export default Header;