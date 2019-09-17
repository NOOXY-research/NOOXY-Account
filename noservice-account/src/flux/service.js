// /src/flux/service.js
// Description:
// "service.js"
// Copyright 2018-2020 NOOXY. All Rights Reserved.
import Constants from './constants.json';
import Localizes from './data/localizes.json';

function Service(NoService, Dispatcher) {
  let Services = {
    NoTalk: null,
    gotoandPlay: null
  };

  let setupOnline = ()=> {
    try {
      NoService.createActivitySocket('NoUser', (err, NoTalk)=> {
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
    }
  };

  this.start = (next)=> {
    this.Actions.updateLang('en');
    this.Actions.updateLocalizes(Localizes);
    setupOnline();
  }
}

export default Service;
