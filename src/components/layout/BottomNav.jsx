import { NavLink } from "react-router-dom";

import {
  FiHome,
  FiBook,
  FiTarget,
  FiBarChart2,
  FiUser,
} from "react-icons/fi";

import "../../styles/bottomnav.css";

const navItems = [
  {
    label: "Home",
    path: "/",
    icon: FiHome,
  },
  {
    label: "Learn",
    path: "/learning",
    icon: FiBook,
  },
  {
    label: "Practice",
    path: "/practice",
    icon: FiTarget,
  },
  {
    label: "Progress",
    path: "/progress",
    icon: FiBarChart2,
  },
  {
    label: "Profile",
    path: "/profile",
    icon: FiUser,
  },
];

function BottomNav() {
  return (
    <nav className="bottom-nav">
      {navItems.map((item) => {
        const Icon = item.icon;

        return (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === "/"}
            className={({ isActive }) =>
              isActive
                ? "bottom-nav__link bottom-nav__link--active"
                : "bottom-nav__link"
            }
          >
            <Icon className="bottom-nav__icon" />
            <span className="bottom-nav__label">
              {item.label}
            </span>
          </NavLink>
        );
      })}
    </nav>
  );
}

export default BottomNav;