import { Link } from "react-router-dom";
import { useContext } from 'react';
import clsx from "clsx";
import {
  List,
  Drawer,
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  useTheme
} from "@material-ui/core";
import {
  ChevronLeft,
  ChevronRight,
  AccountCircle,
  ExitToApp,
  TimeToLeave,
  Flag,
  Group,
  Dashboard
} from "@material-ui/icons";

import useStyles from "./styles";
import LoginContext from '../../contexts/LoginContext';

const CustomDrawer =  ({ open, setOpen, logout }) => {
  const classes = useStyles();
  const theme = useTheme();
  const { usuario } = useContext(LoginContext);

  const handleDrawerClose = function() {
    setOpen(false);
  };

  return (
    <Drawer
      variant='permanent'
      className={clsx(classes.drawer, {
        [classes.drawerOpen]: open,
        [classes.drawerClose]: !open,
      })}
      classes={{
        paper: clsx({
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        }),
      }}
    >
      <div className={classes.toolbar}>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === "rtl" ? (
            <ChevronRight/>
          ) : (
            <ChevronLeft/>
          )}
        </IconButton>
      </div>
      <Divider />
      <List>
        <ListItem button className={clsx({ [classes.displayNone]: !!usuario })} component={Link} to='/login' key='Entrar'>
          <ListItemIcon>
            <AccountCircle />
          </ListItemIcon>
          <ListItemText primary='Entrar'/>
        </ListItem>
        <ListItem
          button
          className={clsx({ [classes.displayNone]: !usuario })}
          component={Link}
          onClick={logout}
          to='/login'
          key='Sair'
        >
          <ListItemIcon>
            <ExitToApp/>
          </ListItemIcon>
          <ListItemText primary='Sair' />
        </ListItem>
        <Divider />
        <ListItem button component={Link} to='/veiculos' key='Veículos'>
          <ListItemIcon>
            <TimeToLeave/>
          </ListItemIcon>
          <ListItemText primary='Veículos' />
        </ListItem>
        <ListItem button className={clsx({ [classes.displayNone]: !usuario })} component={Link} to='/marcas' key='Marcas'>
          <ListItemIcon>
            <Flag/>
          </ListItemIcon>
          <ListItemText primary='Marcas' />
        </ListItem>
        <ListItem button className={clsx({ [classes.displayNone]: !usuario })} component={Link} to='/usuarios' key='Usuários'>
          <ListItemIcon>
            <Group/>
          </ListItemIcon>
          <ListItemText primary='Usuários' />
        </ListItem>
        <ListItem button className={clsx({ [classes.displayNone]: !usuario })} component={Link} to='/dashboard' key='Dashboard'>
          <ListItemIcon>
            <Dashboard/>
          </ListItemIcon>
          <ListItemText primary='Dashboard' />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default CustomDrawer;