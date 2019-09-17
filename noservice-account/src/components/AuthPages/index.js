import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'copyright©2017-'+new Date().getFullYear()+' NOOXY inc. '}
      <Link color="inherit" href="https://nooxy.org/">
        nooxy.org
      </Link>{' '}

      {'.'}
    </Typography>
  );
}

const getQueryVariable = (variable)=>
{
       let query = window.location.search.substring(1);
       let vars = query.split("&");
       for (let i=0;i<vars.length;i++) {
               let pair = vars[i].split("=");
               if(pair[0] === variable){return pair[1];}
       }
       return(false);
}

const setCookie = (cname, cvalue, exdays)=> {
  let d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  let expires = "expires="+d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export function SignInPage(props) {
  const classes = useStyles();
  const [username, setUsername] = React.useState();
  const [password, setPassword] = React.useState();
  const [status, setStatus] = React.useState('Please enter your username and password to access our service.');

  let updatePasswordInputValue = (evt)=> {
    setPassword(evt.target.value);
  }

  let updateUsernameInputValue = (evt)=> {
    setUsername(evt.target.value);
  }

  let signin = ()=> {
    try{
      props.NSc.getImplementationModule((err, implement_module)=>{
        implement_module.getDefaultClientConnProfile((err, connprofile) => {

          let _data = {
            u: username,
            p: password
          }
          implement_module.returnImplement('setUser')(false, _data.u);
          implement_module.setImplement('onToken', (err, token)=>{
            if(token) {
              setCookie('NSToken', token, 7);
              setTimeout(props.onFinish, 500);
            }
            else {
              setStatus('Wrong username or password!');
            }
          });
          implement_module.emitRequest(connprofile, 'GT', _data);

        });
      });
    }
    catch(e) {
      console.log(e);
    }

  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          NOOXY Service Login
        </Typography>
        <Typography component="p" variant="p">
          {status}
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            onChange={evt => updateUsernameInputValue(evt)}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
          />
          <TextField
            onChange={evt => updatePasswordInputValue(evt)}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            preventDefault
            onClick={signin}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}

export function PasswordPage(props) {
  const classes = useStyles();
  const [password, setPassword] = React.useState();
  const [status, setStatus] = React.useState('In order to access this service. You must enter your password of your account.');

  let updatePasswordInputValue = (evt)=> {
    setPassword(evt.target.value);
  }

  let signin = ()=> {
    props.NSc.getImplementationModule((err, implement_module)=>{
    implement_module.getDefaultClientConnProfile((err, connprofile) => {
      let _data = {
        m: 'PW',
        d: {
          t: getQueryVariable('authtoken'),
          v: password
        }
      }
      implement_module.sendRouterData(connprofile, 'AU', 'rs', new Uint8Array(new TextEncoder('utf-8').encode(JSON.stringify(_data))));
      setTimeout(props.onFinish, 500);
    });
  });

  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          NOOXY Service Login
        </Typography>
        <Typography component="p" variant="p">
          {status}
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            value={props.NSc.returnUsername()?props.NSc.returnUsername():'null'}
            InputProps={{
              readOnly: true,
            }}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
          />
          <TextField
            onChange={evt => updatePasswordInputValue(evt)}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            autoFocus
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            preventDefault
            onClick={signin}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
