import React from 'react';
import '../styles/App.css';
import styles from '../styles/app.module.css';

import Header from './Header';
import VisibleConversation from './VisibleConversation';

const App = () => (
  <div className={styles.container}>
    <Header />
    <VisibleConversation />
  </div>
);

export default App;
