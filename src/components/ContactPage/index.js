import React, { Component } from 'react';

import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';

// card
import {Card, CardContent, CardActions} from '@material-ui/core/';
import {List, ListItem, ListItemIcon, ListItemText, ListSubheader} from '@material-ui/core/';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';

import CodeIcon from '@material-ui/icons/Code';


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

export default function Page(props) {
  const classes = useStyles();
  return(
    <Grid container justify="center" alignItems="center" spacing={5}>
      <Grid item xs={11}>
        <Typography  variant="h4" component="h1">
          {capitalize(props.localize.contact_settings)}
        </Typography>

        <Typography  variant="p" component="p">
          {"You can manage your personal infomation in this page."}
        </Typography>
      </Grid>
      <Grid item xs={11}>
        <Card className={classes.homeCard}>
          <CardContent>
            <Typography  variant="h5" component="h2">
              {capitalize('Contact method')}
            </Typography>
            <List className={classes.root}>
              <ListItem>
                <ListItemText primary={'Phone'} secondary={props.user_meta.phonenumber}/>
              </ListItem>
              <Divider component="li" />
            </List>
            <List className={classes.root}>
              <ListItem>
                <ListItemText primary={'Email'} secondary={props.user_meta.email}/>
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
