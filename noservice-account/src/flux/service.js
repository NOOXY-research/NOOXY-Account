// /src/flux/service.js
// Description:
// "service.js"
// Copyright 2018-2020 NOOXY. All Rights Reserved.
import Constants from './constants.json';
import Localizes from './data/localizes.json';

function Service(NoService, Dispatcher) {
  let Services = {
    NoUser: null
  };

  let setupOnline = ()=> {
    try {
      NoService.createActivitySocket('NoUser', (err, NoUser)=> {
        Services.NoUser = NoUser;
        NoUser.call('returnUserMeta', null, (err, meta)=> {
          this.Actions.updateUserMeta(meta);
          console.log(JSON.stringify(meta));
        });
      });
    }
    catch (e) {
      console.log(e);
      setTimeout(setupOnline, 15*1000);
    }
  };

  this.Actions = {
    updateLang: (lang)=> {
      Dispatcher.dispatch({type: 'updateLang', data: lang});
    },
    updateLocalizes: (data)=> {
      Dispatcher.dispatch({type: 'updateLocalizes', data: data});
    },
    updateUserMeta: (data)=> {
      Dispatcher.dispatch({type: 'updateUserMeta', data: data});
    },
    log: (data)=> {console.log(data)},
    logout: ()=> {
      NoService.logout();
    }
  };

  this.start = (next)=> {
    this.Actions.updateLang('en');
    this.Actions.updateLocalizes(Localizes);
    setupOnline();
  }
}

export default Service;
