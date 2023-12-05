import { Link, Stack } from "@mui/material";
import { FC } from "react";
import { Link as RouterLink } from "react-router-dom";

type NavLinksListProps = {
  navLinks: NavLink[];
}

type NavLink= {
  name: string;
  href: string;
}

const NavLinksList: FC<NavLinksListProps> = ({navLinks}) => {
  return (
    <Stack
      component="nav"
      direction="row"
      justifyContent="center"
      sx={{ flexGrow: 1 }}
    >
      {navLinks.map(navLink => 
        <Link 
          component={RouterLink}
          variant="button"
          color="text.primary"
          to={navLink.href}
          sx={{ my: 1, mx: 1.5 }}
          key={navLink.name}
        >
          {navLink.name}
        </Link>
      )}
    </Stack>
  );
}

export default NavLinksList;