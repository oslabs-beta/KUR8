import express from 'express';
import cors from 'cors';
import path from 'path';

const PORT = process.env.PORT || 3000;
const app = express();

// Kubernetes API
import k8s from '@kubernetes/client-node';
const kc = new k8s.KubeConfig();
kc.loadFromDefault();
const k8sApi = kc.makeApiClient(k8s.CoreV1Api);
const k8sApi2 = kc.makeApiClient(k8s.ExtensionsV1beta1Api);
const k8sApi3 = kc.makeApiClient(k8s.AppsV1Api);

app.use(cors());
app.use(express.json());
const moduleURL = new URL(import.meta.url);
const __dirname = path.dirname(moduleURL.pathname);
// WEBPACK
// app.use('/build', express.static(path.resolve(__dirname, '../client/build')));

// Kubernetes API data endpoint and middleware
const getPodList = (req, res, next) => {
  k8sApi
    .listNamespacedPod('default')
    .then(data => {
      res.locals.podList = data.body
      return next()
    })
    .catch(err => {
      res.status(500).send('error found in get request to /podList', err);
    });
};

app.get('/podList', getPodList, (req, res) => {
  res.status(201).send(res.locals.podList);
});

console.log('jj');
const getServiceList = (req, res, next) => {
  k8sApi
    .listNamespacedService('default')
    .then((data) => {
      res.locals.serviceList = data.body;
      return next();
    })
    .catch((err) => {
      res
        .status(500)
        .send(`error found in get request to /serviceList, ${err}`);
    });
};

app.get('/serviceList', getServiceList, (req, res) => {
  res.status(201).send(res.locals.serviceList);
});

const getIngressList = (req, res, next) => {
  k8sApi2
    .listNamespacedIngress('default')
    .then((data) => {
      res.locals.ingressList = data.body;
      return next();
    })
    .catch((err) => {
      res
        .status(500)
        .send(`error found in get request to /ingressList, ${err}`);
    });
};

app.get('/ingressList', getIngressList, (req, res) => {
  res.status(201).send(res.locals.ingressList);
});

const getDeploymentList = (req, res, next) => {
  k8sApi3
    .listNamespacedDeployment('default')
    .then((data) => {
      res.locals.deploymentList = data.body;
      return next();
    })
    .catch((err) => {
      res
        .status(500)
        .send('error found in get request to /deploymentList', err);
    });
};

app.get('/deploymentList', getDeploymentList, (req, res) => {
  res.status(201).send(res.locals.deploymentList);
});

const getNodeList = (req, res, next) => {
  k8sApi
    .listNode('default')
    .then((data) => {
      res.locals.nodeList = data;
      return next();
    })
    .catch((err) => {
      res
        .status(500)
        .send(`error found in get request to /nodeList, ${err}`);
    });
};

app.get('/nodeList', getNodeList, (req, res) => {
  res.status(201).send(res.locals.nodeList);
});

app.get('/', (req, res) => {
  return res
    .status(200)
    .sendFile(path.join(__dirname, '../client/public/index.html'));
});

// GLOBAL ERROR HANDLER
app.use((err, req, res, next) => {
  console.log(`err`, err);
  const defaultErr = {
    log: 'Default global error handler triggered',
    status: 400,
    error: { err: 'An error occurred processing your request.' },
  };
  const errObj = { ...defaultErr, ...err };
  res.status(400).send(errObj.error);
});

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
