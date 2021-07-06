import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  snackbarWarning: {
    backgroundColor: theme.palette.warning.main
  },

  snackbarError: {
    backgroundColor: theme.palette.error.main
  }
}));

export default useStyles;