import { Stack } from '@mui/material';
import { FC } from 'react';
import { NavLink as RouterNavLink } from 'react-router-dom';
import styles from './navLinksList.module.css';

type NavLinksListProps = {
  navLinks: NavLink[];
};

type NavLink = {
  name: string;
  href: string;
};

const NavLinksList: FC<NavLinksListProps> = ({ navLinks }) => {
  return (
    <Stack
      component="nav"
      direction="row"
      justifyContent="center"
      sx={{ flexGrow: 1 }}
    >
      {navLinks.map((navLink) => (
        <RouterNavLink
          to={navLink.href}
          className={({ isActive }) =>
            isActive ? styles.navLink_active : styles.navLink
          }
          key={navLink.name}
        >
          {navLink.name}
        </RouterNavLink>
      ))}
    </Stack>
  );
};

export default NavLinksList;
