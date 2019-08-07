import React from 'react';
import { connect } from 'react-redux';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';
import { createChat } from '../../actions/chatActions';

import UserField from './UserField';

class ChatForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      chatFormData: {
        usersIdList: []
      }
    }
  }

  handleUsersIdListChange = usersList => {
    const idList = usersList.map(user => { if (user !== null) return user.id})
    this.setState({ chatFormData: { usersIdList: idList }})
  }

  onSubmit = e => {
    e.preventDefault()
    console.log("testing")
    // console.log(this.props)
    this.props.createChat(this.state.chatFormData)
    this.props.handleClose()
  }
  
  render() {
    const { isFormOpen, handleClose } = this.props;

    return (
      <div>
        <Dialog fullWidth={true} open={isFormOpen} onClose={handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Create New Chat And Send To: </DialogTitle>
          <DialogContent style={{ height: '190px' }}>
            <form onSubmit={this.onSubmit}>
              <UserField 
                handleUsersIdListChange={this.handleUsersIdListChange} 
                usersIdList={this.state.usersIdList}
              />
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.onSubmit} color="primary">
              Ok
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  createChat: (data) => dispatch(createChat(data)),
})

export default connect(null, mapDispatchToProps)(ChatForm)
