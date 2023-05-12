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
  
  //for now used css, will upgrade to styled later on
  import "../index.css";
  
  const SideBar = ({logOut}) => {
    const { collapsed } = useProSidebar();
  
    return (
      <div style={{ display: "flex", height: "100vh" }}>
        <Sidebar
          backgroundColor="#f8f9e"
          className="app"
          width="16rem"
          height="relative"
        >
          <Menu className="Menu">
            <div className="Sidebar-items">
              <MenuItem className="menu-item">
                AEROCONNECT
              </MenuItem>
              <MenuItem
                className="menu-item"
                component={<Link to="main" className="link" />}
                icon={<AiOutlineAppstore />}
              >
                Dashboard
              </MenuItem>
  
              <MenuItem
                className="menu-item"
                component={<Link to="orders" className="link" />}
                icon={<AiOutlineShoppingCart />}
              >
                Orders
              </MenuItem>
  
              <MenuItem
                className="menu-item"
                component={<Link to="products" className="link" />}
                icon={<AiOutlineShopping />}
              >
                {" "}
                Products{" "}
              </MenuItem>
              <MenuItem
                className="menu-item"
                component={<Link to="queries" className="link" />}
                icon={<AiOutlineMessage />}
              >
                Queries
              </MenuItem>
              <MenuItem
                className="menu-item"
                component={<Link to="users" className="link" />}
                icon={<AiOutlineMessage />}
              >
                Users
              </MenuItem>
              <SubMenu
                className="menu-item"
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
                className="menu-item"
                id="logout-item"
                icon={<AiOutlineLogout />}
                component={<button onClick={logOut}/>}
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