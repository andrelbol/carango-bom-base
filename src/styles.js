import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  snackbarWarning: {
    backgroundColor: theme.palette.warning.main
  },

  snackbarError: {
    backgroundColor: theme.palette.error.main
  },
  
  root: {
    display: "flex",
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(10),
  },
}));

export default useStyles;