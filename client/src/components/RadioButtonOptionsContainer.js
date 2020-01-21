import { connect } from 'react-redux';
import RadioButtonOptions from './RadioButtonOptions';
import { updateBotMessage } from '../actions';


// Todo: set id's for each message in state so can look up via state rather than own props
const mapStateToProps = (state, ownProps) => ({
  options: ownProps.message.radioButtonOptions,
  hasSelectedAnswers: ownProps.message.hasSelectedAnswers,
  selectedOptions: ownProps.message.radioButtonOptions.filter((option) => option.selected === true),
  selectedOptionsText: ownProps.message.radioButtonOptions
    .filter((option) => option.selected === true)
    .map((option) => option.text),
  hasBeenAnswered: ownProps.message.hasBeenAnswered,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  inputHandler: (data) => {
    const updatedMessage = ownProps.message;
    updatedMessage.hasBeenAnswered = true;
    dispatch(updateBotMessage(updatedMessage));
    ownProps.inputHandler(data);
  },
  radioButtonSelector: (selectedOptionText) => {
    const selectedOption = ownProps.message.radioButtonOptions
      .filter((option) => option.text === selectedOptionText)[0];

    selectedOption.selected = !selectedOption.selected;

    const updatedMessage = ownProps.message;

    if (updatedMessage.radioButtonOptions
      .filter((option) => option.selected === true).length > 0) {
      updatedMessage.hasSelectedAnswers = true;
    } else {
      updatedMessage.hasSelectedAnswers = false;
    }

    dispatch(updateBotMessage(updatedMessage));
  },
});

const RadioButtonOptionsContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(RadioButtonOptions);

export default RadioButtonOptionsContainer;
