import { connect } from 'react-redux';
import Header from './Header';


const mapStateToProps = (state) => ({
  lang: state.language,
});

// const mapDispatchToProps = (dispatch) => ({
//   // initialBotMessageHandler: (data) => {
//   //   dispatch(fetchBotResponse({ ...data, uniqueConversationId }));
//   // },
// });

const HeaderContainer = connect(
  mapStateToProps,
  null,
)(Header);

export default HeaderContainer;
