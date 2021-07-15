const express = require('express');
const app = express();
app.use(express.json());
const k8s = require('@kubernetes/client-node');
const kc = new k8s.KubeConfig();
kc.loadFromDefault();
const k8sApi = kc.makeApiClient(k8s.CoreV1Api);

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
  res.send(res.locals.podList)
});


app.get('/serviceList', (req, res) => {
  k8sApi
    .listNamespacedService('default')
    .then(data => res.send(data.body))
    .catch(err => {
      res.send('error found in get request to /serviceList', err);
    });
});

app.get('/ingressList', (req, res) => {
  k8sApi
    .listNamespacedIngress('default')
    .then(data => res.send(data.body))
    .catch(err => {
      res.send('error found in get request to /ingressList', err);
    });
});

app.get('/deploymentList', (req, res) => {
  k8sApi
    .listNamespacedDeployment('default')
    .then(data => res.send(data.body))
    .catch(err => {
      res.send('error found in get request to /deploymentList', err);
    });
});

app.get('/', (req, res) => {
  res.send('hello world');
});

app.listen(5000, () => {
  console.log('Listening on 5000');
});
