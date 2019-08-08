import React from 'react';
import { connect } from 'react-redux';
import CssBaseline from '@material-ui/core/CssBaseline';
import { withStyles } from '@material-ui/core/styles';
import { Redirect } from 'react-router-dom'
import { Button, Grid, Link, Paper, TextField, Typography, Container } from '@material-ui/core';

import { login } from '../actions/authActions';
import { resetErrors } from '../actions/errorActions';
import ServerErrorsList from '../components/ServerErrorsList';

const styles = theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  root: {
    marginTop: theme.spacing(10),
    width: '70vw',
  },  
  image: {
    backgroundImage: `url(${require('../assets/SignUp.jpg')})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(2, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});

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
    // console.log()
    if (this.props.isLoggedIn) {
      this.setState({ toChats: true })
    }
  }

  onChange = e => {
    const { name, value } = e.target
    this.setState({ userFormData: {
      ...this.state.userFormData,
      [name]: value
    }})
  }

  linkToRegister = async () => {
    await this.props.resetErrors();
    this.setState({ toRegister: true})
  }

  render() {
    const { classes, errors } = this.props;

    if (this.state.toChats === true) {
      return <Redirect to='/chats/1' />
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
const mapStateToProps = state => ({
  errors: state.errors,
  currentUser: state.auth.currentUser,
  isLoggedIn: state.auth.isLoggedIn
})

const mapDispatchToProps = dispatch => ({
  login: (data) => dispatch(login(data)),
  resetErrors: () => dispatch(resetErrors())
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Login));