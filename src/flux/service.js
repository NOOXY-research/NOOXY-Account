// /src/flux/service.js
// Description:
// "service.js"
// Copyright 2018-2020 NOOXY. All Rights Reserved.
import Constants from './constants.json';
import Localizes from './data/localizes.json';

function Service(NoService, Dispatcher) {
  const setCookie = (cname, cvalue, exdays)=> {
  console.log(cname, cvalue, exdays);
  let d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  let expires = "expires="+d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  };
  const getCookie = (cname)=> {
      let name = cname + "=";
      let ca = document.cookie.split(';');
      for(let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') {
          c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
          return c.substring(name.length, c.length);
        }
      }
      return "";
  };
  const eraseCookie = (name)=> {
    setCookie(name,"",-1);
  };

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
    updateDarktheme: (data)=> {
      Dispatcher.dispatch({type: 'updateDarktheme', data: data});
      setCookie('DarkTheme', data, 360);
    },
    log: (data)=> {console.log(data)},
    logout: ()=> {
      NoService.logout();
    },
    Service: {

    }
  };

  this.start = (next)=> {
    this.Actions.updateLang('en');
    this.Actions.updateLocalizes(Localizes);
    this.Actions.updateDarktheme(getCookie('DarkTheme'));
    setupOnline();
  }
}

export default Service;
