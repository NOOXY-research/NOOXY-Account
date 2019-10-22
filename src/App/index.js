import React, { Component } from 'react';
import './App.css';

import { BrowserRouter as Router, Route, Link, Redirect, Switch } from "react-router-dom";

// Css
import CssBaseline from "@material-ui/core/CssBaseline";

// Flux
import Flux from '../flux'
import Localizes from '../flux/data/localizes.json'

import {HomePage} from '../components/HomePage';
import ContactPage from '../components/ContactPage';
import PersonalPage from '../components/PersonalPage';
import SecurityPage from '../components/SecurityPage';
import {SignInPage, PasswordPage} from '../components/AuthPages';

import { withStyles } from '@material-ui/core/styles';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';
import Hidden from '@material-ui/core/Hidden';

import Grid from '@material-ui/core/Grid';
// card
import {Card, CardContent, CardActions} from '@material-ui/core/';

// color
import blue from '@material-ui/core/colors/blue';

// list
import {List, ListItem, ListItemIcon, ListItemText, ListItemAvatar} from '@material-ui/core/';

// icons
import MenuIcon from '@material-ui/icons/Menu';
import AccountIcon from '@material-ui/icons/AccountCircle';
import CodeIcon from '@material-ui/icons/Code';
import HomeIcon from '@material-ui/icons/Home';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import LocalPhoneIcon from '@material-ui/icons/LocalPhone';
import LockIcon from '@material-ui/icons/Lock';
import InvertColorsIcon from '@material-ui/icons/InvertColors';


//
import MuiSwitch from '@material-ui/core/Switch';


const CONSTANTS = require('../flux/constants.json');
const ROOT_PATH = CONSTANTS.settings.root_path;


const styles = theme=> ({
  root: {
    display: 'flex',
    minHeight: '100%',
    minWidth: '100%'
  },
  headerBar: {
    backgroundColor: "rgba(0, 0, 0, 0)",
    boxShadow: "none"
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: 250,
      flexShrink: 0,
    },
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  title: {
    display: 'block',
    color: 'black'
  },

  drawerList: {
    width: 250,
  },

  homeCard: {
    width: "100%",
    display: "inline-block",
    marginTop: 5,
    marginBottom: 15,
    verticalAlign: "top",
  },

  homeCardWrapper: {
    columnCount: 2,
    columnGap: 20,
    padding: "0 20px",
    [theme.breakpoints.down('sm')]: {
     columnCount: 1,
   },
   toolbar: theme.mixins.toolbar,
  }
})

const theme = createMuiTheme({
  palette: {
    primary: { main: blue[500] }, // Purple and green play nicely together.
    secondary: { main: '#11cb5f' }, // This is just green.A700 as hex.
  },

  typography: { useNextVariants: true },

  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  }

});

const dark_theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: { main: blue[500] }, // Purple and green play nicely together.
    secondary: { main: '#11cb5f' }, // This is just green.A700 as hex.
  },

  typography: { useNextVariants: true },

  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  }

});

class App extends Component {
  constructor(props) {
    super(props);
    this.controller = new Flux(this.setState.bind(this));
    this.actions = this.controller.Actions;
    this.state= {
      lang: 'en',
      localizes: Localizes,
      DrawerOpened: false,
      UserMeta: {},
      DarkTheme: false
    }
  }

  componentDidMount() {
    this.controller.NoService.getImplementationModule((err, NSimplementation)=>{
      this.actions.log('NoService', 'Connecting to NOOXY service.');
      NSimplementation.setImplement('signin', (connprofile, data, data_sender)=>{
        this.actions.log('NoService Auth', 'NOOXY service signin emitted.');
        this.history.push('/noservice/signin');
      });
      NSimplementation.setImplement('AuthbyPassword', (connprofile, data, data_sender) => {
        this.actions.log('NoService Auth', 'NOOXY service Authby Password emitted.');
        this.history.push('/noservice/password?authtoken='+data.d.t);
      });
      this.controller.start(()=> {
        console.log('background started.');
      });
    });
  }

  toggleDrawer = (bool)=> ()=> {
    this.setState({DrawerOpened: bool});
  }

  render() {
    const {classes} = this.props;

    const sideList = (
      <List className={classes.drawerList}>
        <ListItem button>
          <ListItemText secondary={'NoService '+this.state.localizes[this.state.lang].account}/>
        </ListItem>
        <Link to="/home/">
          <ListItem button>
            <ListItemAvatar><Avatar>M</Avatar></ListItemAvatar>
            <ListItemText primary={this.state.UserMeta.firstname} secondary={this.state.UserMeta.username} />
          </ListItem>
        </Link>
        <Divider />
        <Link to="/home/">
          <ListItem button>
            <ListItemIcon><HomeIcon/></ListItemIcon>
            <ListItemText primary={this.state.localizes[this.state.lang].home} />
          </ListItem>
        </Link>
        <Link to="/personal-settings/">
          <ListItem button>
            <ListItemIcon><AccountIcon/></ListItemIcon>
            <ListItemText primary={this.state.localizes[this.state.lang].personal_settings} />
          </ListItem>
        </Link>
        <Link to="/contact-settings/">
          <ListItem button>
            <ListItemIcon><LocalPhoneIcon/></ListItemIcon>
            <ListItemText primary={this.state.localizes[this.state.lang].contact_settings} />
          </ListItem>
        </Link>
        <Link to="/security-settings/">
          <ListItem button>
            <ListItemIcon><LockIcon/></ListItemIcon>
            <ListItemText primary={this.state.localizes[this.state.lang].security_settings} />
          </ListItem>
        </Link>
        <Divider />
        <ListItem button onClick={()=> {
          this.actions.updateDarktheme(!this.state.DarkTheme);
        }}>
          <ListItemIcon><InvertColorsIcon/></ListItemIcon>
          <ListItemText primary={this.state.localizes[this.state.lang].dark_theme} />
          <MuiSwitch color="primary" checked={this.state.DarkTheme} />
        </ListItem>
        <ListItem button>
          <ListItemIcon><CodeIcon/></ListItemIcon>
          <ListItemText primary={this.state.localizes[this.state.lang].noshell} />
        </ListItem>
        <ListItem button onClick={()=> {
          this.actions.logout();
        }}>
          <ListItemIcon><ExitToAppIcon/></ListItemIcon>
          <ListItemText primary={this.state.localizes[this.state.lang].logout} />
        </ListItem>
        <Divider />
      </List>
    )

    return (
      <Router basename={ROOT_PATH}>
        <MuiThemeProvider theme={this.state.DarkTheme?dark_theme:theme}>
        <CssBaseline />
        <Route exact path={':url(.*)'} render={(props)=>{
          this.history = props.history;
          return(
            <div className={classes.root}>
              <Switch>
                <Route exact path='/noservice/signin' render={(props)=>{
                  return(
                    <SignInPage SignupURL={""} NSc={this.controller.NoService} onFinish={()=>{window.location.replace(ROOT_PATH);}}/>
                  );
                }}/>
                <Route exact path='/noservice/password' render={(props)=>{
                  return(
                    <PasswordPage NSc={this.controller.NoService} onFinish={props.history.goBack}/>
                  );
                }}/>
                <Route exact path={':url(.*)'} render={(props)=>{
                  return(
                    [
                      <Hidden smUp implementation="css">
                        <AppBar className={classes.headerBar} position="fixed">
                          <Toolbar>
                            <IconButton className={classes.menuButton} aria-label="Open drawer" onClick={this.toggleDrawer(true)}>
                              <MenuIcon />
                            </IconButton>
                          </Toolbar>
                        </AppBar>
                      </Hidden>
                      ,
                      <nav className={classes.drawer} aria-label="mailbox folders">
                        <Hidden smUp implementation="css">
                          <SwipeableDrawer
                           open={this.state.DrawerOpened}
                           onClose={this.toggleDrawer(false)}
                           onOpen={this.toggleDrawer(true)}
                           variant="temporary"
                          >
                             {sideList}
                          </SwipeableDrawer>
                        </Hidden>
                        <Hidden xsDown implementation="css">
                          <SwipeableDrawer
                            variant="permanent"
                            open
                          >
                             {sideList}
                          </SwipeableDrawer>
                        </Hidden>
                      </nav>
                      ,
                      <main className={classes.content}>
                        <div style= {{minHeight: '40px'}}/>
                        <Switch>
                          <Route exact path="/" render={() => {
                            return(<Redirect to="/home/"/>)
                          }}/>
                          <Route exact path="/home/" render={(props)=>{
                            return(
                              <HomePage user_meta={this.state.UserMeta} localize={this.state.localizes[this.state.lang]}/>
                            );
                          }}/>
                          <Route exact path="/personal-settings/" render={(props)=>{
                            return(
                              <PersonalPage user_meta={this.state.UserMeta} localize={this.state.localizes[this.state.lang]}/>
                            );
                          }}/>
                          <Route exact path="/contact-settings/" render={(props)=>{
                            return(
                              <ContactPage user_meta={this.state.UserMeta} localize={this.state.localizes[this.state.lang]}/>
                            );
                          }}/>
                          <Route exact path="/security-settings/" render={(props)=>{
                            return(
                              <SecurityPage user_meta={this.state.UserMeta} localize={this.state.localizes[this.state.lang]}/>
                            );
                          }}/>
                        </Switch>
                      </main>
                    ]
                  );
                }}/>
              </Switch>
            </div>
          );
        }}/>

        </MuiThemeProvider>
      </Router>
    );
  }
}

export default withStyles(styles)(App);
