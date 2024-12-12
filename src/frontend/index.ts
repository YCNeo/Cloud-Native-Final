import { registerRootComponent } from 'expo';

import App from './App.tsx';
import login from './app/loginPage/login.tsx';
import welcome from './app/loginPage/welcome.tsx';

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(welcome);




// Abandoned!
