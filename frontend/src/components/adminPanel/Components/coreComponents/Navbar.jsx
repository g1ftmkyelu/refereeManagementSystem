import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { useDispatch } from "react-redux";
import { fetchUserData, signOut } from "../../../../Redux/slices/authThunk";
import { useNavigate } from "react-router-dom";

//nav refactor


function Navbar({ resources }) {
  const dispatch = useDispatch();
  const nav = useNavigate();

  const [userData, setUserData] = useState(null); // Initialize user data as null

  useEffect(() => {
    async function fetchUser() {
      try {
        const data = await dispatch(fetchUserData());
        const { payload: { user } } = data;
        setUserData(user); // Set the user data in the state
      } catch (error) {
        console.error(error);
      }
    }

    fetchUser();
  }, [dispatch]);





  const mainMenuItems = resources.filter(resource => resource.menu === undefined);
  const submenuItems = resources.filter(resource => resource.menu !== undefined);

  const resourcesByMenu = submenuItems.reduce((acc, resource) => {
    const menu = resource.menu.name;
    if (!acc[menu]) {
      acc[menu] = [];
    }
    acc[menu].push(resource);
    return acc;
  }, {});

  return (
    <div  className="w-2/12 bg-slate-600   shadow-md">
      <nav className="font-thin text-nav_link_color  text-2xl w-full">
        <ul className="list-none p-0 w-full">
          <div className="pt-4 pl-10 flex items-center justify-evenly-">Logo</div><br />
          {mainMenuItems.map((resource) => (
            <NavItem key={resource.path} config={resource} />
          ))}
          {Object.entries(resourcesByMenu).map(([menu, menuResources]) => (
            <MenuItem
              key={menu}
              menu={menu}
              resources={menuResources}
              Icon={menuResources[0].menu.icon} // Assuming all resources in the menu have the same icon
            />
          ))}
        </ul>
      </nav>
    </div>
  );
}

function MenuItem({ menu, resources, Icon }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSubMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <li className="text-nav_link_color px-10 w-full">
      <div className="flex items-center justify-between max-w-full" onClick={toggleSubMenu}>
        <span className="flex items-center" >
          <Icon /> &nbsp; {menu}
        </span>
        <span>
          {isOpen ? <FiChevronUp /> : <FiChevronDown />}
        </span>
      </div>
      {isOpen && (
        <ul>
          {resources.map((resource) => (
            <NavItem className='text-nav_link_color' key={resource.path} config={resource} />
          ))}
        </ul>
      )}
    </li>
  );

}

function NavItem({ config }) {
  return (
    <li>
      <Link to={`/${config.path}`} className="px-10 my-5 focus:bg-navbar_link_focus_bg focus:text-navbar_link_focus_color hover:bg-navbar_link_hover_color active:bg-navbar_link_active_bg active:text-navbar_link_active_color  flex items-center justify-start text-left">
        {config.icon && <config.icon />}&nbsp;
        {config.path}
      </Link>
    </li>
  );
}
Navbar.propTypes = {
  resources: PropTypes.arrayOf(
    PropTypes.shape({
      path: PropTypes.string.isRequired,
      icon: PropTypes.elementType,
      menu: PropTypes.string, // Allow menu to be undefined
    })
  ).isRequired,
};

export default Navbar;
