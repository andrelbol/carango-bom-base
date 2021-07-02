import React from "react";
import clsx from "clsx";
import {
  AppBar,
  Toolbar,
  CssBaseline,
  Typography,
  IconButton,
  makeStyles
} from "@material-ui/core";
import { Menu } from "@material-ui/icons";

import CustomDrawer from "../CustomDrawer";
import useStyles from "./style";

export default function MiniDrawer({ logout }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <Menu />
          </IconButton>
          <Typography variant="h6" noWrap>
            Carango Bom
          </Typography>
        </Toolbar>
      </AppBar>

      <CustomDrawer open={open} setOpen={setOpen} logout={logout} />
    </div>
  );
}
