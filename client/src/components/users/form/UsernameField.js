import React from 'react';

import TextField from '@material-ui/core/TextField';

const UsernameField = ({props}) => {
  // const {} p
  return (
    <TextField
      id="username"
      type="text"
      label="Name"
      name="username"
      value={this.state.username}
      error={!!this.state.usernameError}
      helperText={this.state.usernameError}
      onChange={this.onChange}
      margin="normal"
    />
  )
}



class UsernameField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      usernameError: '',
    };
  }

  onChange = e => {
    const { name, value } = e.target
    this.validate(value)
    this.setState({ [name]: value })
  }

  getRules = () => {
    const requiredRule = val => !!val || 'Username is required';
    const lengthRule = val => (val.length >= 2 && val.length <= 23) || 'Please enter a value between 2 and 23 characters long';

    return [requiredRule, lengthRule];
  }

  validate = (val) => {
    const rules = this.getRules();
    const usernameError = rules.map(rule => rule(val)).filter(el => el !== true)[0] || ''

    this.setState({
      ...this.state,
      usernameError
    })
  }

  render() {

    return (
      <TextField
        id="username"
        type="text"
        label="Name"
        name="username"
        value={this.state.username}
        error={!!this.state.usernameError}
        helperText={this.state.usernameError}
        onChange={this.onChange}
        margin="normal"
      />
    );
  }
}

export default UsernameField;