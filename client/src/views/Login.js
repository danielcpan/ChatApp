import React from 'react';
import { connect } from 'react-redux';
import CssBaseline from '@material-ui/core/CssBaseline';
import { withStyles } from '@material-ui/core/styles';
import ErrorIcon from '@material-ui/icons/Error';
import { Link } from 'react-router-dom'
import { Button, Grid, Paper, TextField, Typography, Container, Icon, SnackbarContent } from '@material-ui/core';

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

class UserForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      userFormData: {
        email: '',
        password: ''
      }
    }
  }

  onSubmit = async e => {
    e.preventDefault();

    this.props.login(this.state.userFormData)
    // console.log(this.props)

  }

  onChange = e => {
    const { name, value } = e.target
    // this.validate(value)
    this.setState({ userFormData: {
      ...this.state.userFormData,
      [name]: value
    }})
  }

  validate = (val) => {
    const errors = {
      usernameError: '',
      emailError: '',
      passwordError: ''
    }

    const usernameLengthRule = val => (val.length >= 2 && val.length <= 23) || 'Please enter a value between 2 and 23 characters long';

    // const rules = this.getRules();
    const rules = [usernameLengthRule]
    const usernameError = rules.map(rule => rule(val)).filter(el => el !== true)[0] || ''

    this.setState({
      ...this.state,
      usernameError
    })
  }

  componentWillMount() {
    console.log("login about to mount")
    this.props.resetErrors()
  }

  render() {
    const { classes, errors } = this.props;

    // if (this.state.toDashboard === true) {
    //   return <Redirect to='/dashboard' />
    // }

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
                    <Link to={'/register'} variant="body2">Sign up</Link> instead?
                    {/* <Link to={`/users/${user.id}`} activeClassName="active">{user.name}</Link> */}
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
})

const mapDispatchToProps = dispatch => ({
  login: (data) => dispatch(login(data)),
  resetErrors: () => dispatch(resetErrors())
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(UserForm));