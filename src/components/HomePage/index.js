import React, { Component } from 'react';

import { Link } from "react-router-dom";

import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';

// card
import {Card, CardContent, CardActions} from '@material-ui/core/';
import {List, ListItem, ListItemIcon, ListItemText, ListSubheader} from '@material-ui/core/';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';

import PersonIcon from '@material-ui/icons/Person';
import CodeIcon from '@material-ui/icons/Code';
import LocalPhoneIcon from '@material-ui/icons/LocalPhone';


const useStyles = makeStyles({
  avatar: {
    marginBottom: 20,
    width: 70,
    height: 70,
  },
  card: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const capitalize = (s) => {
  if (typeof s !== 'string') return ''
  return s.charAt(0).toUpperCase() + s.slice(1)
}

export function HomePage(props) {
  const classes = useStyles();
  return(
      <Grid container justify="center" alignItems="center" spacing={5}>
        <Grid item xs={11}>
          <Typography  variant="h4" component="h2">
            {'Hello, '+ props.user_meta.firstname + ' ' + props.user_meta.lastname}
          </Typography>
          <Typography  variant="p" component="p">
            {"Welcome to NoService Account. You can manage your personal infomation in this account page."}
          </Typography>
        </Grid>
        <Grid item xs={11}>
          <Card className={classes.homeCard}>
            <CardContent>
              <Typography  variant="h5" component="h2">
                {capitalize(props.localize.quick_access)}
              </Typography>
              <List className={classes.root}>
                <ListItem>
                  <ListItemIcon>
                    <PersonIcon />
                  </ListItemIcon>
                  <ListItemText primary={'Identity'} secondary={'your identities are displayed below.'}/>
                  <Link to="/personal-settings"><Button  color="primary">Edit</Button></Link>
                </ListItem>
                <Divider component="li" />
                <ListItem>
                  <ListItemText primary={props.localize.username} secondary={props.user_meta.username}/>
                </ListItem>
                <ListItem>
                  <ListItemText primary={props.localize.firstname} secondary={props.user_meta.firstname}/>
                </ListItem>
                <ListItem>
                  <ListItemText primary={props.localize.lastname} secondary={props.user_meta.lastname}/>
                </ListItem>
                <ListItem>
                  <ListItemText primary={props.localize.userid} secondary={props.user_meta.userid}/>
                </ListItem>

                <Divider component="li" />
                <ListItem>
                  <ListItemIcon>
                    <LocalPhoneIcon />
                  </ListItemIcon>
                  <ListItemText primary={'Contact method'} secondary={'how do people keep in touch with you?'}/>
                  <Button  color="primary">Edit</Button>
                </ListItem>
                <Divider component="li" />


                <ListItem>
                  <ListItemText primary={props.localize.phone_number} secondary={props.user_meta.phonenumber}/>
                </ListItem>
                <ListItem>
                  <ListItemText primary={props.localize.email} secondary={props.user_meta.email}/>
                </ListItem>
                <Divider component="li" />

                <ListItem>
                  <ListItemIcon>
                    <CodeIcon />
                  </ListItemIcon>
                  <ListItemText primary={'Developer options'} secondary={'manage noservice with below options.'}/>
                </ListItem>
                <Divider component="li" />
                <ListItem>
                  <ListItemText primary={props.localize.noshell} secondary={'NOOXY shell'}/>
                </ListItem>
                <Divider component="li" />
              </List>
            </CardContent>
            <CardActions>

            </CardActions>
          </Card>
        </Grid>
      </Grid>
  )
};
