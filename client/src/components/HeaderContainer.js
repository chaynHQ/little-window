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
  minimiseHandler: (minimised) => {
    dispatch(setMinimiseState());
    window.parent.postMessage(minimised, '*');
  },
  refreshHandler: () => {
    dispatch(refreshConversation());

    const conversationId = uuidv4();
    dispatch(updateConversation({ conversationId }));
    dispatch(fetchBotResponse({
      speech: 'SETUP-NEWCONVERSATION',
      lang: 'en',
      conversationId,
    }));
  },
});

const HeaderContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Header);

export default HeaderContainer;
