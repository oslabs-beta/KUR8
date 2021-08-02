import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import React, { useState } from 'react';
import Step from '@material-ui/core/Step';
import StepContent from '@material-ui/core/StepContent';
import StepLabel from '@material-ui/core/StepLabel';
import Stepper from '@material-ui/core/Stepper';
import Tooltip from '@material-ui/core/Tooltip';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  backButton: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  nextButton: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
    boxShadow: theme.shadows[3],
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
    padding: '6px 12px',
    borderRadius: '1px',
    backgroundColor: '#3B3B3B',
    color: 'white',
  },
  copyButton: {
    padding: '0px',
    marginLeft: '12px',
  },
  buttonGroup: {
    marginTop: '9px',
    '& button.MuiButton-containedPrimary:hover': {
      color: theme.palette.common.white,
      backgroundColor: theme.palette.grey[700],
    },
  },
  step: {
    '& > span > span > svg.MuiStepIcon-root': {
      color: theme.palette.grey[700],
    },
    '& > span > span > svg > text': {
      fill: theme.palette.common.white,
    },
    '& > span > span > svg.Mui-disabled': {
      color: 'red',
    },
  },
}));

function Instructions({ closeModal }) {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const history = useHistory();
  const steps = [
    "If you don't have your instance of Prometheus installed begin by:",
    'Once setup is complete run:',
    'If you want to open up Prometheus UI run:',
    'Now open up localhost:9090 in your browser.',
  ];

  function getStepContent(step) {
    const instructions = [
      'kubectl create -f infra/manifests/setup',
      'kubectl create -f infra/manifests/',
      'kubectl --namespace monitoring port-forward svc/prometheus-k8s 9090',
      'kubectl --namespace monitoring port-forward svc/prometheus-k8s 9090',
    ];
    const makeInstruction = index => (
      <div>
        <code className={classes.codeBlock}>{instructions[step]}</code>
        <Tooltip disableFocusListener placement="right" title="Copy">
          <IconButton
            aria-label="close"
            className={classes.copyButton}
            onClick={() => navigator.clipboard.writeText(instructions[index])}>
            <FileCopyIcon fontSize="small" color="secondary" />
          </IconButton>
        </Tooltip>
      </div>
    );

    switch (step) {
      case 0:
        return makeInstruction(step);
      case 1:
        return makeInstruction(step);
      case 2:
        return makeInstruction(step);
      case 3:
        return `You may also view the Prometheus tab in KUR8 localhost:8080 to view and create your custom dashboard.`;
      default:
        return 'Unknown step';
    }
  }

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const cookies = new UniversalCookie();
  const handleDone = () => {
    cookies.set('hasSeenGetStartedPage', 'yesYouHave', { path: '/' });
    history.push('/structure');
  };

  return (
    <Stepper activeStep={activeStep} orientation="vertical">
      {steps.map((label, index) => (
        <Step key={label} className={classes.step}>
          <StepLabel>{label}</StepLabel>
          <StepContent>
            <Grid
              container
              direction="column"
              justifyContent="space-between"
              alignItems="flex-start">
              {getStepContent(index)}
              <div className={classes.actionsContainer}>
                <div className={classes.buttonGroup}>
                  <Button
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    className={classes.backButton}>
                    Back
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={
                      activeStep === steps.length - 1
                        ? closeModal && handleDone
                        : handleNext
                    }
                    className={classes.nextButton}>
                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                  </Button>
                </div>
              </div>
            </Grid>
          </StepContent>
        </Step>
      ))}
    </Stepper>
  );
}

export default Instructions;
