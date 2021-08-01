import { useParams, useHistory } from 'react-router-dom';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import FileCopyIcon from '@material-ui/icons/FileCopy';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  actionsContainer: {
    marginBottom: theme.spacing(2),
  },
  resetContainer: {
    padding: theme.spacing(3),
  },
  chip: {
    color: 'black',
    backgroundColor: 'white',
    textAlign: 'center',
  },

  codeBlock: {
    backgroundColor: '#3B3B3B',
    color: 'white',
  },
}));

export default function VerticalLinearStepper() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();
  const history = useHistory();

  function getSteps() {
    return ['If you don\'t have your instance of Prometheus installed begin by:', 'Once setup is complete run:', 'If you want to open up Prometheus UI run:', 'Now open up localhost:9090 in your browser.'];
  }
  
  function getStepContent(step) {
    switch (step) {
      case 0:
        return <div>
          <code className={classes.codeBlock}>
                 kubectl create -f infra/manifests/setup
          </code>
          <Chip className={classes.chip}
            size="small"
            icon={<FileCopyIcon />}
            label="Copy"
            onClick={() =>
              navigator.clipboard.writeText(
                'kubectl create -f infra/manifests/setup'
              )
            }
            color="black"
          />
        </div>;
      case 1:
        return <div>
        <code className={classes.codeBlock}>
              kubectl create -f infra/manifests/
        </code>
        <Chip
          size="small"
          icon={<FileCopyIcon />}
          label="Copy"
          onClick={() =>
            navigator.clipboard.writeText(
              'kubectl create -f infra/manifests/'
            )
          }
          color="black"
        />
        </div>;
      case 2:
        return <div>
          <code className={classes.codeBlock}>
            kubectl --namespace monitoring port-forward svc/prometheus-k8s 9090
          </code>
          <Chip
            size="small"
            icon={<FileCopyIcon />}
            label="Copy"
            onClick={() =>
              navigator.clipboard.writeText(
                'kubectl --namespace monitoring port-forward svc/prometheus-k8s 9090'
              )
            }
            color="black"
          />
          </div>;
      case 3: 
        return `You may also view the Prometheus tab in KUR8 localhost:8080 to view and create your custom dashboard.`
      default:
        return 'Unknown step';
    }
  }

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleDone = () => {
    history.push('/structure');
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <div className={classes.root}>
      <Typography variant="h6" component="h1">
           <center>
             <strong>Getting Started</strong>
           </center>
         </Typography>
         <Typography variant="body1"><center>Deploying Prometheus</center></Typography>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
            <StepContent>
              {getStepContent(index)}
              <div className={classes.actionsContainer}>
                <div>
                  <Button
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    className={classes.button}
                  >
                    Back
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    className={classes.button}
                  >
                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                  </Button>
                </div>
              </div>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <Paper square elevation={0} className={classes.resetContainer}>
          <Typography></Typography>
          <Button onClick={handleDone} className={classes.button}>
            Main Page
          </Button>
          <Button color="primary" variant="contained" onClick={handleReset} className={classes.button}>
            Reset
          </Button>
        </Paper>
      )}
    </div>
  );
}