import React, { Component } from 'react';

import Typography from '@material-ui/core/Typography';


import Button from '@material-ui/core/Button';

// card
import {Card, CardContent, CardActions} from '@material-ui/core/';
import {List, ListItem, ListItemIcon, ListItemText, ListSubheader} from '@material-ui/core/';

import PersonIcon from '@material-ui/icons/Person';


export class HomePage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {classes} = this.props;
    return(
      <div className={classes.homeCardWrapper}>
        <Card className={classes.homeCard}>
          <CardContent>
            <Typography  variant="h5" component="h2">
              {this.props.langs.about_you}
            </Typography>
            <List className={classes.root}>
              <ListItem>
                <ListItemIcon>
                  <PersonIcon />
                </ListItemIcon>
                <ListItemText primary="userid: userid" />
              </ListItem>
            </List>
          </CardContent>
          <CardActions>
            <Button  color="primary">Learn More</Button>
          </CardActions>
        </Card>

        <Card className={classes.homeCard}>
          <CardContent>
            <Typography  variant="h5" component="h2">
              {this.props.langs.edit_my_account}
            </Typography>
          </CardContent>
          <CardActions>
            <Button  color="primary">{this.props.langs.edit}</Button>
          </CardActions>
        </Card>

        <Card className={classes.homeCard}>
          <CardContent>
            <Typography  variant="h5" component="h2">
              {this.props.langs.noshell}
            </Typography>
          </CardContent>
          <CardActions>
            <Button color="primary">Learn More</Button>
          </CardActions>
        </Card>
      </div>
    )
  }
};
