import { connect } from 'react-redux';
import CheckBoxOptions from './CheckBoxOptions';
import { updateBotMessage } from '../actions';


// Todo: set id's for each message in state so can look up via state rather than own props
const mapStateToProps = (state, ownProps) => ({
  options: ownProps.message.checkBoxOptions,
  hasBeenAnswered: ownProps.message.hasBeenAnswered,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  inputHandler: (data) => {
    const updatedMessage = ownProps.message;
    updatedMessage.hasBeenAnswered = true;
    dispatch(updateBotMessage(updatedMessage));
    ownProps.inputHandler(data);
  },
});

const CheckBoxOptionsContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(CheckBoxOptions);

export default CheckBoxOptionsContainer;
