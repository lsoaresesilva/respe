
import {createStackNavigator} from 'react-navigation';

import {Login} from './pages/login/app-login-component'
import {Principal} from './pages/assunto/principal/app-principal-component';
import {VisualizarAssunto} from './pages/assunto/visualizar-assunto/app-visualizar-assunto-component';

const MainNavigator = createStackNavigator({
    Principal: {screen: Principal},
    Login: {screen: Login},
    VisualizarAssunto:{screen: VisualizarAssunto}
  });

export default MainNavigator;