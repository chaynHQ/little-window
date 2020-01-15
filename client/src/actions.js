/*
 * action types
 */
export const ADD_USER_INPUT = 'ADD_USER_INPUT';
export const ADD_BOT_MESSAGE = 'ADD_BOT_MESSAGE';
export const FETCH_PRODUCTS_SUCCESS =
  "FETCH_PRODUCTS_SUCCESS";
export const FETCH_PRODUCTS_FAILURE =
  "FETCH_PRODUCTS_FAILURE";

/*
 * action creators
 */
export function addUserInputToStack(text) {
  return { type: ADD_USER_INPUT, text };
}

export const fetchBotResponseSuccess = data => ({
  type: ADD_BOT_MESSAGE,
  data
});

// TODO: What to do in failure case
export const fetchBotResponseFailure = error => ({
  type: FETCH_PRODUCTS_FAILURE,
  error
});

export function fetchBotResponse(data) {
  return dispatch => {
    return sendToServer(data)
      .then(json => {
        dispatch(fetchBotResponseSuccess(json));
        return json;
      })
      .catch(error =>
        dispatch(fetchBotResponseFailure(error))
      );
  };
}


/*
 * action functions
 */
 function sendToServer(data) {
   return fetch('/usermessage', {
      method: 'POST',
      headers: new Headers({ 'Content-Type': 'application/json' }),
      credentials: 'same-origin',
      body: JSON.stringify(data),
     })
     .then(handleErrors)
     .then(res => res.json());
 }

function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}

const sendMessageToBot = (data) => {
  // const { store } = this.props;
  // const { lang, timedelay } = this.state;

      // TODO: Create reducer that adds resData to the state and therefore starts getting pushed to the front end.

  //     if (uniqueConversationId === data.uniqueConversationId) {
  //       if (resData.GDPROptOut) {
  //         this.refresh();
  //         this.minimiseFunc();
  //       } else {
  //         if (resData.refresh) {
  //           this.setState({ delayDisabled: resData.refresh });
  //         }
  //         this.setState({
  //           refreshDisabled: true,
  //           timedelay: speed[resData.timedelay],
  //         });
  //         if (resData.lang && resData.retrigger) {
  //           this.setState({ lang: resData.lang });
  //           setTimeout(() => {
  //             this.sendMessage({
  //               speech: resData.retrigger,
  //               uniqueConversationId,
  //               lang,
  //             });
  //           }, timedelay);
  //         }
  //         if (resData.retrigger) {
  //           setTimeout(() => {
  //             this.sendMessage({
  //               speech: resData.retrigger,
  //               uniqueConversationId,
  //               lang,
  //             });
  //           }, timedelay);
  //         }
  //
  //         if (resData.options.length === 0) {
  //           this.setState({ inputStatus: false });
  //         } else {
  //           this.setState({
  //             inputStatus: true,
  //             inputMessage: optionsLang(lang),
  //           });
  //         }
  //
  //         // create copy of resData to avoid mutating it
  //         const newMessage = { ...resData, uniqueMessageId: uniqueIdGenerator() };
  //
  //         newMessage.isUser = false;
  //         this.setState({
  //           inputStatus: true,
  //           inputMessage: typingMessageLang(lang),
  //         });
  //         // Add dots
  //         this.addMessage({
  //           speech: '',
  //           isUser: false,
  //           isDot: true,
  //           uniqueMessageId: uniqueIdGenerator(),
  //         });
  //
  //         this.addMessage(newMessage);
  //       }
      // }
    // });
};
