import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@material-ui/core';

import { createChat } from '../actions/chatActions';

class ChatForm extends React.Component {
  state = {
    chatFormData: {
      name: '',
    },
  };

  onChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      chatFormData: {
        ...this.state.chatFormData,
        [name]: value,
      },
    });
  }

  onSubmit = (e) => {
    e.preventDefault();
    this.props.createChat(this.state.chatFormData);
    this.props.handleClose();
  }

  render() {
    const { isFormOpen, handleClose } = this.props;

    return (
      <div>
        <Dialog fullWidth open={isFormOpen} onClose={handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Create New Chat </DialogTitle>
          <DialogContent>
            <form onSubmit={this.onSubmit}>
              <TextField
                id="name"
                type="text"
                label="Chat name"
                name="name"
                value={this.state.chatFormData.name}
                onChange={this.onChange}
                variant="outlined"
                required
                fullWidth
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
    );
  }
}

ChatForm.propTypes = {
  isFormOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  createChat: data => dispatch(createChat(data)),
});

export default connect(null, mapDispatchToProps)(ChatForm);
