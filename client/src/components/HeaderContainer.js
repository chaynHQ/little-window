import { connect } from 'react-redux';
import Header from './Header';


const mapStateToProps = (state) => ({
  lang: state.language,
});

// const mapDispatchToProps = (dispatch) => ({
//   // initialBotMessageHandler: (data) => {
//   //   dispatch(fetchBotResponse({ ...data, uniqueConversationId }));
//   // },
//   // inputHandler: (data, lang) => {
//   //   if (data.lang) {
//   //     dispatch(setLanguage(data.lang));
//   //   } else {
//   //     dispatch(fetchBotResponse({ speech: data.postback, lang, uniqueConversationId }));
//   //   }
//   //   dispatch(addUserInputToStack(data.text));
//   // },
// });

const HeaderContainer = connect(
  mapStateToProps,
  null,
)(Header);

export default HeaderContainer;
