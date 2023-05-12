import {
  Sidebar,
  Menu,
  MenuItem,
  SubMenu,
  useProSidebar,
} from "react-pro-sidebar";

import { AiOutlineAppstore } from "react-icons/ai";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { AiOutlineShopping } from "react-icons/ai";
import { AiOutlineLogout } from "react-icons/ai";
import { AiOutlineMessage } from "react-icons/ai";
import { AiOutlineUser } from "react-icons/ai";
import { AiOutlineBell } from "react-icons/ai";
import { AiOutlineLock } from "react-icons/ai";
import { AiOutlineSetting } from "react-icons/ai";

import { Link } from "react-router-dom";
import { useAuthContext } from "../auth/authContext";

import { Button } from "@mui/material";

//for now used css, will upgrade to styled later on
import "../index.css";

const SideBar = ({ type }) => {
  const { collapsed } = useProSidebar();
  const logoutHandler = useAuthContext().logoutHandler;

  const menuItemsStyle = {
    paddingLeft: collapsed ? "1rem" : "2rem",
    paddingBottom: "15px",
    color: "dark grey",
    fontWeight: 50,
    fontSize: "large",
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <Sidebar
        backgroundColor="#f8f9e"
        className="app"
        width="12rem"
        height="relative"
      >
      AEROCONNECT
        <Menu>
          <div
            style={{
              marginTop: "120px",
            }}
          >
            <MenuItem
              style={menuItemsStyle}
              component={<Link to="main" />}
              icon={<AiOutlineAppstore />}
            >
              Dashboard
            </MenuItem>

            <MenuItem
              style={menuItemsStyle}
              component={<Link to="orders" />}
              icon={<AiOutlineShoppingCart />}
            >
              Orders
            </MenuItem>

            <MenuItem
              style={menuItemsStyle}
              component={<Link to="products" />}
              icon={<AiOutlineShopping />}
            >
              {" "}
              Products{" "}
            </MenuItem>
            <MenuItem
              style={menuItemsStyle}
              component={<Link to="queries" className="link" />}
              icon={<AiOutlineMessage />}
            >
              Queries
            </MenuItem>
            <MenuItem
              style={menuItemsStyle}
              component={<Link to="users" className="link" />}
              icon={<AiOutlineMessage />}
            >
              Users
            </MenuItem>
            <SubMenu
              style={menuItemsStyle}
              label="Settings"
              icon={<AiOutlineSetting />}
            >
              <MenuItem
                component={<Link to="settings" className="link" />}
                icon={<AiOutlineUser />}
              >
                {" "}
                Settings{" "}
              </MenuItem>
              <MenuItem icon={<AiOutlineLock />}> Privacy </MenuItem>
              <MenuItem icon={<AiOutlineBell />}>Notifications</MenuItem>
            </SubMenu>
            <MenuItem
              icon={<AiOutlineLogout />}
              component={<Button onClick={() => logoutHandler()} />}
              style={{
                marginTop: "5rem",
                marginLeft:collapsed?"0.5rem":"1.5rem"

              }}
            >
              {" "}
              Logout{" "}
            </MenuItem>
          </div>
        </Menu>
      </Sidebar>
    </div>
  );
};

export default SideBar;
