import React from 'react';
import '../styles/App.css';
import styles from '../styles/app.module.css';

import HeaderContainer from './HeaderContainer';
import ConversationContainer from './ConversationContainer';

const App = () => (
  <div className={styles.container}>
    <HeaderContainer />
    <ConversationContainer />
  </div>
);

export default App;
