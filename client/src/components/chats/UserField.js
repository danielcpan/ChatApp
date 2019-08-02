import React from 'react';
import PropTypes from 'prop-types';
import deburr from 'lodash/deburr';
import Downshift from 'downshift';
import { withStyles } from '@material-ui/core/styles';
import { TextField, Paper, MenuItem, Chip } from '@material-ui/core';
import axios from 'axios';

function renderInput(inputProps) {
  const { InputProps, classes, ref, ...other } = inputProps;

  return (
    <TextField
      variant="outlined"
      InputProps={{
        inputRef: ref,
        classes: {
          root: classes.inputRoot,
          input: classes.inputInput,
        },
        ...InputProps,
      }}
      {...other}
    />
  );
}

renderInput.propTypes = {
  classes: PropTypes.object.isRequired,
  InputProps: PropTypes.object,
};

function renderSuggestion(suggestionProps) {
  const { suggestion, index, itemProps, highlightedIndex, selectedItem } = suggestionProps;
  const isHighlighted = highlightedIndex === index;
  const isSelected = (selectedItem || '').indexOf(suggestion.username) > -1;

  return (
    <MenuItem
      {...itemProps}
      key={suggestion.username}
      selected={isHighlighted}
      component="div"
      style={{
        fontWeight: isSelected ? 500 : 400,
      }}
    >
      {suggestion.username}
    </MenuItem>
  );
}

renderSuggestion.propTypes = {
  highlightedIndex: PropTypes.oneOfType([PropTypes.oneOf([null]), PropTypes.number]).isRequired,
  index: PropTypes.number.isRequired,
  itemProps: PropTypes.object.isRequired,
  selectedItem: PropTypes.string.isRequired,
  suggestion: PropTypes.shape({
    label: PropTypes.string.isRequired,
  }).isRequired,
};

function getSuggestions(value, users, { showEmpty = false } = {}) {
  const inputValue = deburr(value.trim()).toLowerCase();
  const inputLength = inputValue.length;
  let count = 0;

  return inputLength === 0 && !showEmpty
    ? []
    : users.filter(user => {
        const keep =
          count < 5 && user.username.slice(0, inputLength).toLowerCase() === inputValue;
        if (keep) {
          count += 1;
        }
        
        return keep;
      });
}

function DownshiftMultiple(props) {
  const { 
    usersSuggestionList, 
    selectedItem, 
    inputValue, 
    handleKeyDown, 
    handleInputChange, 
    handleChange, 
    handleDelete, 
    classes 
  } = props;

  return (
    <Downshift
      id="downshift-multiple"
      inputValue={inputValue}
      onChange={handleChange}
      selectedItem={selectedItem}
    >
      {({
        getInputProps,
        getItemProps,
        getLabelProps,
        isOpen,
        inputValue: inputValue2,
        selectedItem: selectedItem2,
        highlightedIndex,
      }) => {
        const { onBlur, onChange, onFocus, ...inputProps } = getInputProps({
          onKeyDown: handleKeyDown,
          placeholder: 'Type usernames',
        });

        return (
          <div className={classes.container}>
            {renderInput({
              fullWidth: true,
              classes,
              InputLabelProps: getLabelProps(),
              InputProps: {
                startAdornment: selectedItem.map(item => (
                  <Chip
                    key={item}
                    tabIndex={-1}
                    label={item}
                    className={classes.chip}
                    onDelete={handleDelete(item)}
                  />
                )),
                onBlur,
                onChange: event => {
                  handleInputChange(event);
                  onChange(event);
                },
                onFocus,
              },
              inputProps,
            })}

            {isOpen ? (
              <Paper className={classes.paper} square>
                {getSuggestions(inputValue2, usersSuggestionList).map((suggestion, index) =>
                  renderSuggestion({
                    suggestion,
                    index,
                    itemProps: getItemProps({ item: suggestion.username }),
                    highlightedIndex,
                    selectedItem: selectedItem2,
                  }),
                )}
              </Paper>
            ) : null}
          </div>
        );
      }}
    </Downshift>
  );
}

DownshiftMultiple.propTypes = {
  classes: PropTypes.object.isRequired,
};

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: 250,
  },
  container: {
    flexGrow: 1,
    position: 'relative',
  },
  paper: {
    position: 'absolute',
    zIndex: 1,
    marginTop: theme.spacing(1),
    left: 0,
    right: 0,
  },
  chip: {
    margin: theme.spacing(0.5, 0.25),
  },
  inputRoot: {
    flexWrap: 'wrap',
  },
  inputInput: {
    width: 'auto',
    flexGrow: 1,
  },
  divider: {
    height: theme.spacing(2),
  },
});

class UserField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      usersSuggestionList: [],
      selectedItem: [],
      inputValue: ''
    }
  }
  

  async componentWillMount() {
    const response = await axios.get('http://localhost:5000/api/users')
    this.setState({ usersSuggestionList: response.data })
  }

  handleKeyDown = event => {
    if (this.state.selectedItem.length && !this.state.inputValue.length && event.key === 'Backspace') {
      this.setState({ selectedItem: this.state.selectedItem.slice(0, this.state.selectedItem.length - 1) })
    }
  }

  handleInputChange = event => {
    this.setState({ inputValue: event.target.value })
  }

  handleChange = item => {
    let newSelectedItem = [...this.state.selectedItem];
    if (newSelectedItem.indexOf(item) === -1) {
      newSelectedItem = [...newSelectedItem, item];
    }
    this.setState({ inputValue: '' })
    this.setState({ selectedItem: newSelectedItem})
  }

  handleDelete = item => () => {
    const newSelectedItem = [...this.state.selectedItem];
    newSelectedItem.splice(newSelectedItem.indexOf(item), 1);
    this.setState({ selectedItem: newSelectedItem})
  };  

  render() {
    const { classes } = this.props;

    return (
      <DownshiftMultiple 
        usersSuggestionList={this.state.usersSuggestionList} 
        selectedItem={this.state.selectedItem} 
        inputValue={this.state.inputValue}
        handleKeyDown={this.handleKeyDown}
        handleInputChange={this.handleInputChange}
        handleChange={this.handleChange}
        handleDelete={this.handleDelete}
        classes={classes} 
      />
    )
  }
}

export default withStyles(styles)(UserField);