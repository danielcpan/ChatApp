import React from 'react';
import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Redirect } from 'react-router-dom';
import {
  Button,
  Grid,
  Link,
  Paper,
  TextField,
  Typography,
  Container,
} from '@material-ui/core';

import ServerErrorsList from '../components/ServerErrorsList';

class Register extends React.Component {
  state = {
    userFormData: {
      username: '',
      email: '',
      password: '',
    },
    toChats: false,
    toLogin: false,
  };

  onSubmit = async (e) => {
    e.preventDefault();
    await this.props.register(this.state.userFormData);
    const loginData = {
      email: this.state.userFormData.email,
      password: this.state.userFormData.password,
    };
    if (!this.props.errors) {
      await this.props.login(loginData);
    }
  }

  onChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      userFormData: {
        ...this.state.userFormData,
        [name]: value,
      },
    });
  }

  linkToLogin = async () => {
    if (this.props.errors) {
      await this.props.resetErrors();
    }
    this.setState({ toLogin: true });
  }

  render() {
    const { classes, errors } = this.props;

    if (this.state.toChats === true || this.props.isLoggedIn) {
      return <Redirect to="/chats" />;
    }

    if (this.state.toLogin === true) {
      return <Redirect to="/login" />;
    }

    return (
      <Container component="main" className={classes.root}>
        <Grid container component={Paper} elevation={6} square>
          <CssBaseline />
          <Grid item xs={false} sm={false} md={6} className={classes.image} />
          <Grid item xs={12} sm={12} md={6}>
            <div className={classes.paper}>
              <form className={classes.form} autoComplete="off" onSubmit={this.onSubmit}>
                <Grid container direction="row" justify="center" alignItems="center" spacing={3}>
                  <Grid item xs={8}>
                    <Typography component="h1" variant="h5"><b>Create Account</b></Typography>
                  </Grid>

                  <Grid item xs={4}>
                    <Link
                      onClick={this.linkToLogin}
                      variant="body2"
                      style={{ cursor: 'pointer' }}
                    >
                      Sign in
                    </Link>
                    {' '}
instead?
                  </Grid>

                  <ServerErrorsList errors={errors} />

                  <Grid item xs={12}>
                    <TextField
                      id="email"
                      type="email"
                      label="Email"
                      name="email"
                      value={this.state.userFormData.email}
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
                      value={this.state.userFormData.username}
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
                      value={this.state.userFormData.password}
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
                  Sign up and login
                </Button>
              </form>
            </div>
          </Grid>
        </Grid>
      </Container>
    );
  }
}

Register.propTypes = {
  errors: PropTypes.object,
  isLoggedIn: PropTypes.bool.isRequired,
  register: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
  resetErrors: PropTypes.func.isRequired,
};

export default Register;
