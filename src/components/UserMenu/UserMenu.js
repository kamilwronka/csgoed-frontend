import React, { useState } from "react";
import { Avatar, Popover } from "antd";
import OutsideClickHandler from "react-outside-click-handler";

import UserMenuDropdown from "./UserMenuDropdown";

function UserMenu() {
  const [popoverOpen, setPopover] = useState();

  function togglePopover() {
    setPopover(!popoverOpen);
  }

  return (
    <Popover
      content={
        <OutsideClickHandler
          onOutsideClick={togglePopover}
          disabled={!popoverOpen}
        >
          <UserMenuDropdown togglePopover={togglePopover} />
        </OutsideClickHandler>
      }
      trigger="click"
      overlayClassName="custom"
      placement="bottomRight"
      visible={popoverOpen}
    >
      <div
        onClick={togglePopover}
        style={{ height: 48, transform: "translateY(-10px)" }}
      >
        <Avatar size={42} icon="user" />
      </div>
    </Popover>
  );
}

export default UserMenu;
