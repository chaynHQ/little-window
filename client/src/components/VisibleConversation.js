import { connect } from 'react-redux';
import Conversation from './Conversation';

// Pieces of data we want to pass to Conversation
const mapStateToProps = (state) => ({
  messages: state.messages,
});

// Functions we want to pass to Conversation
// const mapDispatchToProps = dispatch => {
//   return {
//     onTodoClick: id => {
//       dispatch(toggleTodo(id))
//     }
//   }
// }
const VisibleConversation = connect(
  mapStateToProps,
  null,
)(Conversation);

export default VisibleConversation;
