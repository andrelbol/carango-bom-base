import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  snackbarWarning: {
    backgroundColor: theme.palette.warning.main
  },

  snackbarError: {
    backgroundColor: theme.palette.error.main
  },

  actions: {
      marginLeft: '10px',
  }
}));

export default useStyles;