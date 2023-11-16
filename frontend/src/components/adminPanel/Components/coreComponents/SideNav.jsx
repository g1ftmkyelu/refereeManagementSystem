import React, { useState } from 'react';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { FaBars } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const SideNav = ({ resources }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const renderResources = (resources) => {
    const renderedMenus = new Set();

    return resources.map((resource) => {
      if (resource.menu && !renderedMenus.has(resource.menu.name)) {
        renderedMenus.add(resource.menu.name);

        return (
          <SubMenu key={resource.menu.name} label={resource.menu.name} icon={<resource.menu.icon/>}>
            {resources
              .filter((res) => res.menu && res.menu.name === resource.menu.name)
              .map((subResource) => ( 
                <MenuItem key={subResource.path} component={<Link to={`/${subResource.path}`} />} icon={<subResource.icon/>}>{subResource.path}</MenuItem>
              ))
            }
          </SubMenu>
        );
      } else if (!resource.menu) {
        return (
          <MenuItem key={resource.path} component={<Link to={`/${resource.path}`}/>} icon={<resource.icon/>}>
            {resource.path}
          </MenuItem>
        );
      }
      return null;
    });
  };

  return (
    <>
      <Sidebar collapsed={!isSidebarOpen} backgroundColor="#ffff" style={{ zIndex: 1 }}>
        {/* The following div will align its content at the top-right corner */}
        <div className="flex justify-center items-center p-4">
          <div>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdRLQvJkjHAu5rIcayCK5IjO_Wy_1wNnPbPw&usqp=CAU" width={80} height={80} alt="Logo" />
          </div>
        </div>
        <Menu>
          {renderResources(resources)}
        </Menu>
      </Sidebar>
    </>
  );
};

export default SideNav;
