import React from 'react';

import CssBaseline from '@material-ui/core/CssBaseline';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { withStyles } from '@material-ui/core/styles';
import { Avatar, Button, Grid, Link, TextField, Typography, Container } from '@material-ui/core';

const styles = theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    // alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});

class UserForm extends React.Component {
  state = {
    username: '',
    usernameError: '',
    email: '',
    emailError: '',
    password: '',
    passwordError: ''
  };

  onSubmit = async () => {

  }

  onChange = e => {
    const { name, value } = e.target
    this.setState({ [name]: value })
  }

  validate = (val) => {
    const errors = {
      usernameError: '',
      emailError: '',
      passwordError: ''
    }

    const usernameLengthRule = val => (val.length >= 2 && val.length <= 23) || 'Please enter a value between 2 and 23 characters long';
    // const 

    // const rules = this.getRules();
    const rules = [usernameLengthRule]
    const usernameError = rules.map(rule => rule(val)).filter(el => el !== true)[0] || ''

    this.setState({
      ...this.state,
      usernameError
    })
  }  

  render() {
    const { classes } = this.props;

    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <form className={classes.form} autoComplete="off">
            <Grid container direction="row" justify="center" alignItems="center" spacing={3}>
              
              <Grid item xs={8}>
                <Typography component="h1" variant="h5">
                  Create Account
                </Typography>
              </Grid>

              <Grid item xs={4}>
                <Link href="#" variant="body2">Sign in</Link> instead?
              </Grid>              

              <Grid item xs={12}>
                <TextField
                  id="email"
                  type="email"
                  label="Email"
                  name="email"
                  value={this.state.email}
                  error={!!this.state.emailError}
                  helperText={this.state.emailError}
                  onChange={this.onChange}
                  variant="outlined"
                  required
                  fullWidth
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  id="username"
                  type="text"
                  label="Username"
                  name="username"
                  value={this.state.username}
                  error={!!this.state.usernameError}
                  helperText={this.state.usernameError}
                  onChange={this.onChange}
                  variant="outlined"
                  required
                  fullWidth
                />
              </Grid>              

              <Grid item xs={12}>
                <TextField
                  id="password"
                  type="password"
                  label="Password"
                  name="password"
                  value={this.state.password}
                  error={!!this.state.passwordError}
                  helperText={this.state.passwordError}
                  onChange={this.onChange}
                  variant="outlined"
                  required
                  fullWidth
                />
              </Grid>
            </Grid>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={this.onSubmit}
            >
              Sign Up
            </Button>
          </form>
        </div>
      </Container>
    )
  }
}

export default withStyles(styles)(UserForm);