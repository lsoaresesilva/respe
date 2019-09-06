/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
/*
import React, { Fragment } from 'react';

const App = () => {
  return (
    <Login></Login>
  );
};

export default App;
*/

import {createAppContainer} from 'react-navigation';

import MainNavigator from './src/rotas';

const App = createAppContainer(MainNavigator);

export default App;