import React from 'react';
import '../styles/App.css';
import styles from '../styles/app.module.css';

import Header from './Header';
import Conversation from './Conversation';
import TextInput from './TextInput';

const App = () => (
      <div className={styles.container}>
        <Header />
        <Conversation />
        <TextInput />
      </div>
);

export default App;
