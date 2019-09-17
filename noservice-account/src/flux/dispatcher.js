// /src/flux/dispatcher.js
// Description:
// "dispatcher.js"
// Copyright 2018-2020 NOOXY. All Rights Reserved.

import Dispatcher from './lib/dispatcher';

function generateDispatcher(setState) {
  let _dispatcher = new Dispatcher();
  let id1 = _dispatcher.register((payload)=> {
    if(payload.type === 'updateLang') {
      setState( { lang: payload.data } );
    }

    else if(payload.type === 'updateLocalizes') {
      setState( { localizes: payload.data } );
    }

  });

  return _dispatcher;
}

export default {generateDispatcher: generateDispatcher};
