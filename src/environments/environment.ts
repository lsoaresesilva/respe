// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  //URL: 'http://35.208.64.26:8000/',
  URL_SERVIDOR:'http://localhost:4200/',
  URL_CHAT:'http://localhost:3001',
  URL_SERVIDOR_DOC:'ws://127.0.0.1:8080',
   URL: 'http://localhost:8000/',
  /* firebase: {
    apiKey: 'AIzaSyDKVWx2BMepi_gMdtv-jRz1xnBCDn7jK5A',
    authDomain: 'letscode-3fd06.firebaseapp.com',
    databaseURL: 'https://letscode-3fd06.firebaseio.com',
    projectId: 'letscode-3fd06',
    storageBucket: 'letscode-3fd06.appspot.com',
    messagingSenderId: '463436922175',
    appId: '1:463436922175:web:458c70eaa99285e2',
  }, */
  firebase: {
    apiKey: 'AIzaSyDQ6iOddJoIKtSQhXe-JYPNbyZFAFIIiHM',
    authDomain: 'letscode-producao.firebaseapp.com',
    databaseURL: 'https://letscode-producao.firebaseio.com',
    projectId: 'letscode-producao',
    storageBucket: 'letscode-producao.appspot.com',
    messagingSenderId: '634494761220',
    appId: '1:634494761220:web:08f409b7d6370966cf7851',
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
