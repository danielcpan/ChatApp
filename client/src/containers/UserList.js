import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles';

import UserList from '../components/users/UserList'
import { getUsers } from '../actions/userActions';

const styles = theme => ({
  root: {
    width: '100%',
    overflow: 'auto',
  },
  inline: {
    display: 'inline',
  },
  header: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 28,
    padding: theme.spacing(1)
  },
  fab: {
    margin: theme.spacing(1),
  },
});

const mapStateToProps = state => ({
  users: state.users.userList,
})

const mapDispatchToProps = dispatch => ({
  getUsers: (id) => dispatch(getUsers()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(UserList))
