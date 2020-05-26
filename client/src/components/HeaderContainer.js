import { connect } from 'react-redux';
import Header from './Header';
import {
  refreshConversation, setMinimiseState, startNewConversation,
} from '../actions';

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
    dispatch(startNewConversation());
  },
});

const HeaderContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Header);

export default HeaderContainer;
