import React, { useRef, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { useParams, useHistory } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    alignItems: 'center',
    wordSpacing: '0.4em',
    fontFamily: 'sans-serif',
  },

  paper: {
    display: 'flex',
    flexDirection: 'column',
    margin: theme.spacing(1),
    width: '635px',
    height: '705px',
    alignItems: 'center',
    margin: '30px',
    fontSize: '20px',
    padding: '30px',
  },
  title: {
    textAlign: 'center',
    fontWeight: '500',
  },
  button: {
    color: 'black',
    backgroundColor: 'white',
    textAlign: 'center',
    width: '60px',
    height: '35px',
  },

  codeBlock: {
    backgroundColor: 'black',
    color: 'white',
  },
}));

export default function GetStartedPage() {
  const classes = useStyles();

  const [copySuccess, setCopySuccess] = useState('');
  const history = useHistory();

  const switchPage = () => {
    history.push('/structure');
  };

  return (
    <div className={classes.root}>
      <Paper elevation={3} className={classes.paper}>
        <Typography variant="h6" component="h1">
          <center>
            <strong>Getting Started</strong>
          </center>
        </Typography>
        <Typography variant="body1">Deploying Prometheus</Typography>
        <ol>
          <li>
            If you don't have your instance of Prometheus installed begin by:
            <br></br>
            In KUR8 directory run:{' '}
            <code className={classes.codeBlock}>
              kubectl create -f infra/manifests/setup
            </code>
            <button
              className={classes.button}
              onClick={() =>
                navigator.clipboard.writeText(
                  'kubectl create -f infra/manifests/setup'
                )
              }>
              <i className="far fa-copy"></i>
            </button>
          </li>

          <br></br>
          <li>
            Once setup is complete run:{' '}
            <code className={classes.codeBlock}>
              kubectl create -f infra/manifests/
            </code>
            <button
              className={classes.button}
              onClick={() =>
                navigator.clipboard.writeText(
                  'kubectl create -f infra/manifests/'
                )
              }>
              <i className="far fa-copy"></i>
            </button>
          </li>

          <br></br>
          <li>
            If you want to open up Prometheus UI run:{' '}
            <code className={classes.codeBlock}>
              kubectl --namespace monitoring port-forward svc/prometheus-k8s
              9090
            </code>
            <button
              className={classes.button}
              onClick={() =>
                navigator.clipboard.writeText(
                  'kubectl --namespace monitoring port-forward svc/prometheus-k8s 9090'
                )
              }>
              <i className="far fa-copy"></i>
            </button>
          </li>

          <br></br>
          <li>
            Now open up localhost:9090 in your browser
            <br></br>
            You may also view the Prometheus tab in KUR8 localhost:8080 to view
            and create your custom dashboard.
          </li>
        </ol>
        <button className={classes.button} onClick={switchPage}>
          Done
        </button>
      </Paper>
    </div>
  );
}
