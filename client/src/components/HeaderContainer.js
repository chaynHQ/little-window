import { connect } from 'react-redux';
import Header from './Header';
import { refreshConversation, updateConversation, fetchBotResponse } from '../actions';

const uuidv4 = require('uuid/v4');

const mapStateToProps = (state) => ({
  minimise: state.conversation.minimise,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  minimiseHandler: () => {

  },
  refreshHandler: () => {
    dispatch(refreshConversation());

    const uniqueConversationId = uuidv4();
    dispatch(updateConversation({ conversationId: uniqueConversationId }));
    dispatch(fetchBotResponse({
      speech: 'Little Window language selection',
      lang: 'en',
      uniqueConversationId,
    }));
  },
});

const HeaderContainer = connect(
  null,
  mapDispatchToProps,
)(Header);

export default HeaderContainer;
