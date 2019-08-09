import React from 'react';
import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Redirect } from 'react-router-dom'
import { 
  Button, 
  Grid, 
  Link, 
  Paper, 
  TextField, 
  Typography, 
  Container 
} from '@material-ui/core';

import ServerErrorsList from '../components/ServerErrorsList';

class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      userFormData: {
        email: '',
        password: ''
      },
      toChats: false,
      toRegister: false,
    }
  }

  onSubmit = async e => {
    e.preventDefault();
    await this.props.login(this.state.userFormData)
  }

  onChange = e => {
    const { name, value } = e.target
    this.setState({ userFormData: {
      ...this.state.userFormData,
      [name]: value
    }})
  }

  linkToRegister = async () => {
    if (this.props.errors) {
      await this.props.resetErrors();  
    }
    this.setState({ toRegister: true})
  }

  render() {
    const { classes, errors } = this.props;

    if (this.props.isLoggedIn) {
      return <Redirect to='/chats' />
    }

    if (this.state.toRegister === true) {
      return <Redirect to='/register' />
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
                    <Typography component="h1" variant="h5"><b>Login</b></Typography>
                  </Grid>

                  <Grid item xs={4}>
                    <Link 
                      onClick={this.linkToRegister} 
                      variant="body2" 
                      style={{ cursor: 'pointer' }}
                    >
                      Sign up
                    </Link> instead?
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
                  Login
                </Button>
              </form>
            </div>
          </Grid>
        </Grid>
      </Container>
    )
  }
}

Login.propTypes = {
  errors: PropTypes.object,
  getCurrentUser: PropTypes.func,
  isLoggedIn: PropTypes.bool.isRequired,
  login: PropTypes.func.isRequired,
  resetErrors: PropTypes.func.isRequired
}

export default Login;