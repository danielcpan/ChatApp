import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ErrorIcon from '@material-ui/icons/Error';
import { Grid, SnackbarContent } from '@material-ui/core';

const styles = theme => ({
  snackbar: {
    fontSize: '12px',
    margin: theme.spacing(0.5),
    backgroundColor: theme.palette.error.dark,
  },
  errorIcon: {
    fontSize: '20px',
    marginRight: theme.spacing(1),
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
});

const ServerErrorsList = (props) => {
  const { classes, errors } = props;

  if (errors) {
    return (
      <Grid item xs={12}>
        {errors.message.split(', ').map((error, index) => (
          <SnackbarContent
            className={classes.snackbar}
            key={`Error_${index}`}
            message={(
              <span id="client-snackbar" className={classes.message}>
                <ErrorIcon className={classes.errorIcon} />
                {error}
              </span>
)}
          />
        ))}
      </Grid>
    );
  }

  return null;
};

ServerErrorsList.propTypes = {
  errors: PropTypes.array,
};

export default withStyles(styles)(ServerErrorsList);
