import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles';

import Register from '../views/Login'
import { login, register } from '../actions/authActions';
import { resetErrors } from '../actions/errorActions';

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

const mapStateToProps = state => ({
  errors: state.errors,
  currentUser: state.auth.currentUser,
  isLoggedIn: state.auth.isLoggedIn
})

const mapDispatchToProps = dispatch => ({
  register: (data) => dispatch(register(data)),
  login: (data) => dispatch(login(data)),
  resetErrors: () => dispatch(resetErrors())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Register))
