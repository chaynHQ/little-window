import { connect } from 'react-redux';
import Header from './Header';
import {
  refreshConversation, updateConversation, fetchBotResponse, setMinimiseState,
} from '../actions';

const uuidv4 = require('uuid/v4');

const mapStateToProps = (state) => ({
  minimised: state.minimised,
});

const mapDispatchToProps = (dispatch) => ({
  minimiseHandler: () => {
    dispatch(setMinimiseState());
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
  mapStateToProps,
  mapDispatchToProps,
)(Header);

export default HeaderContainer;
