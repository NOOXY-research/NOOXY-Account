import React, { Component } from 'react';
import './App.css';

// Flux
import Flux from '../flux'
import Localizes from '../flux/data/localizes.json'

import {HomePage} from '../components/HomePage';

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

// card
import {Card, CardContent, CardActions} from '@material-ui/core/';

// color
import blue from '@material-ui/core/colors/blue';

// list
import {List, ListItem, ListItemIcon, ListItemText} from '@material-ui/core/';

// icons
import MenuIcon from '@material-ui/icons/Menu';
import AccountIcon from '@material-ui/icons/AccountCircle';
import CodeIcon from '@material-ui/icons/Code';
import HomeIcon from '@material-ui/icons/Home';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';



const styles = theme=> ({
  root: {
    flexGrow: 1,
  },
  headerBar: {
    backgroundColor: "white",
    boxShadow: "none"
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  title: {
    display: 'block'
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

class App extends Component {
  constructor(props) {
    super(props);
    this.controller = new Flux(this.setState.bind(this));
    this.state= {
      lang: 'en',
      localizes: Localizes,
      DrawerOpened: false
    }
  }

  componentDidMount() {
    this.controller.start(()=> {
      console.log('background started.');
    });
  }

  toggleDrawer = (bool)=> ()=> {
    this.setState({DrawerOpened: bool});
  }

  render() {
    const {classes} = this.props;

    const sideList = (
      <div className={classes.drawerList}>
        <ListItem button>
          <ListItemText primary={'NoService '+this.state.localizes[this.state.lang].account}/>
        </ListItem>
        <ListItem button>
          <Avatar>M</Avatar>
          <ListItemText primary={"Mr. Robot"} />
        </ListItem>
        <Divider />
        <ListItem button>
          <ListItemIcon><HomeIcon/></ListItemIcon>
          <ListItemText primary={this.state.localizes[this.state.lang].home} />
        </ListItem>
        <ListItem button>
          <ListItemIcon><AccountIcon/></ListItemIcon>
          <ListItemText primary={this.state.localizes[this.state.lang].edit_my_account} />
        </ListItem>
        <ListItem button>
          <ListItemIcon><ExitToAppIcon/></ListItemIcon>
          <ListItemText primary={this.state.localizes[this.state.lang].sign_out} />
        </ListItem>
        <Divider />
        <List>
          <ListItem button>
            <ListItemIcon><CodeIcon/></ListItemIcon>
            <ListItemText primary={this.state.localizes[this.state.lang].noshell} />
          </ListItem>
        </List>
      </div>
    )

    return (
      <MuiThemeProvider theme={theme}>
        <div className={classes.root}>
          <AppBar className={classes.headerBar} position="static">
            <Toolbar>
              <IconButton className={classes.menuButton} aria-label="Open drawer" onClick={this.toggleDrawer(true)}>
                <MenuIcon />
              </IconButton>
              <Typography className={classes.title} variant="h6" component="h1" noWrap>
                {'NoService '+this.state.localizes[this.state.lang].account}
              </Typography>
            </Toolbar>
          </AppBar>
          <SwipeableDrawer
           open={this.state.DrawerOpened}
           onClose={this.toggleDrawer(false)}
           onOpen={this.toggleDrawer(true)}
          >
             {sideList}
          </SwipeableDrawer>
          <HomePage classes={classes} langs={this.state.localizes[this.state.lang]}/>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default withStyles(styles)(App);
