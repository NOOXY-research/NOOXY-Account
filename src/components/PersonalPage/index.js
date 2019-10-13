import React, { Component } from 'react';

import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';

// card
import {Card, CardContent, CardActions} from '@material-ui/core/';
import {List, ListItem, ListItemIcon, ListItemText, ListSubheader, ListItemAvatar} from '@material-ui/core/';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';


// Dialog
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

//
import CodeIcon from '@material-ui/icons/Code';


const useStyles = makeStyles(theme=>{return({
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
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  pos: {
    marginBottom: 12,
  },
})});

const capitalize = (s) => {
  if (typeof s !== 'string') return ''
  return s.charAt(0).toUpperCase() + s.slice(1)
}

export default function Page(props) {
  const classes = useStyles();
  const [OpenedDialog, setOpenedDialog] = React.useState(null);
  return(
    <Grid container justify="center" alignItems="center" spacing={5}>
      <Grid item xs={11}>
        <Typography  variant="h4" component="h1">
          {capitalize(props.localize.personal_settings)}
        </Typography>

        <Typography  variant="p" component="p">
          {"You can manage your personal infomation in this page."}
        </Typography>
      </Grid>
      <Grid item xs={11}>
        <Card className={classes.homeCard}>
          <CardContent>
            <Typography  variant="h5" component="h2">
              {capitalize('Personal information')}
            </Typography>
            <List className={classes.root}>
              <ListItem button>
                <ListItemAvatar>
                  <Avatar>
                    M
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={'Profile photo'} secondary={'Description.'}/>
              </ListItem>
              <Divider component="li" />

              <ListItem button onClick={()=>{
                setOpenedDialog('displayname');
              }} >
                <ListItemText primary={'Display Name'} secondary={props.user_meta.displayname}/>
              </ListItem>
              <Dialog open={OpenedDialog==='displayname'} onClose={()=>{setOpenedDialog(null);}} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Display name</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    Your display name will be the primary name that be displayed on our services.
                  </DialogContentText>
                  <TextField
                    autoFocus
                    id="name"
                    label="Display name"
                    type="text"
                    fullWidth
                  />
                </DialogContent>
                <DialogActions>
                  <Button onClick={()=>{setOpenedDialog(null);}} color="primary">
                    Cancel
                  </Button>
                  <Button onClick={()=>{setOpenedDialog(null);}} color="primary">
                    Save
                  </Button>
                </DialogActions>
              </Dialog>
              <Divider component="li" />

              <ListItem button onClick={()=>{
                setOpenedDialog('name');
              }}>
                <ListItemText primary={'Name'} secondary={props.user_meta.firstname+ ' '+ props.user_meta.lastname}/>
              </ListItem>
              <Dialog open={OpenedDialog==='name'} onClose={()=>{setOpenedDialog(null);}} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Display name</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    Your display name will be the primary name that be displayed on our services.
                  </DialogContentText>
                  <TextField
                    className={classes.textField}
                    autoFocus
                    defaultValue={props.user_meta.firstname}
                    id="firstname"
                    label="First name"
                    type="text"
                    margin="normal"
                  />

                  <TextField
                    className={classes.textField}
                    defaultValue={props.user_meta.lastname}
                    id="lastname"
                    label="Last name"
                    margin="normal"
                    type="text"
                  />
                </DialogContent>
                <DialogActions>
                  <Button onClick={()=>{setOpenedDialog(null);}} color="primary">
                    Cancel
                  </Button>
                  <Button onClick={()=>{setOpenedDialog(null);}} color="primary">
                    Save
                  </Button>
                </DialogActions>
              </Dialog>
              <Divider component="li" />

              <ListItem>
                <ListItemText primary={'Gender'} secondary={props.user_meta.gender}/>
              </ListItem>
              <Divider component="li" />
              <ListItem>
                <ListItemText primary={'Birthday'} secondary={props.user_meta.birthday}/>
              </ListItem>
            </List>
          </CardContent>
          <CardActions>

          </CardActions>
        </Card>
      </Grid>

      <Grid item xs={11}>
        <Card className={classes.homeCard}>
          <CardContent>
            <Typography  variant="h5" component="h2">
              {capitalize('Region')}
            </Typography>
            <List className={classes.root}>
              <ListItem>
                <ListItemText primary={'Language'} secondary={props.user_meta.language}/>
              </ListItem>
              <Divider component="li" />
              <ListItem>
                <ListItemText primary={'Country'} secondary={props.user_meta.country}/>
              </ListItem>
              <Divider component="li" />
              <ListItem>
                <ListItemText primary={'Address'} secondary={props.user_meta.address}/>
              </ListItem>
            </List>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
};
