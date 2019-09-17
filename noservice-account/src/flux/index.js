// /src/flux/index.js
// Description:
// "index.js"
// Copyright 2018-2020 NOOXY. All Rights Reserved.

import Constants from './constants.json';
import Dispatcher from './dispatcher';
import Service from './service';
import NSClient from './NSc.js';

const debug = Constants.DEBUG;
const nsport = null;

const NoService = new NSClient(Constants.settings.noservice.host, Constants.settings.noservice.conn);

function Flux(setState) {
  let _noservice_client;

  this.Dispatcher = Dispatcher.generateDispatcher(setState);
  this.NoService = NoService;
  this.Service = new Service(NoService, this.Dispatcher);
  this.Service.enqueueSnackbar = this.enqueueSnackbar;
  this.Actions = this.Service.Actions;

  this.start = (next)=> {
    this.Service.start(next);
  };
};

export default Flux;
