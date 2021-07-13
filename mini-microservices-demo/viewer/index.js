const express = require('express');

const app = express();

const k8s = require('@kubernetes/client-node');

const kc = new k8s.KubeConfig();
kc.loadFromDefault();

const k8sApi = kc.makeApiClient(k8s.CoreV1Api);



app.get('/podList', (req, res) => {
  k8sApi2.listNamespacedPod('default')
  .then(res => {
    return res.status(201).send(JSON.stringify(res.body, null, 2));
  }).catch(err => {
      res.send("error found in get request to /podList", err)
  })
});



app.get('/serviceList', (req, res) => {
  k8sApi2.listNamespacedService('default')
  .then(res => {
    return res.status(201).send(JSON.stringify(res.body, null, 2));
  }).catch(err => {
      res.send("error found in get request to /serviceList", err)
  })
});



app.get('/ingressList', (req, res) => {
  k8sApi2.listNamespacedIngress('default')
  .then(res => {
    return res.status(201).send(JSON.stringify(res.body, null, 2));
  }).catch(err => {
      res.send("error found in get request to /ingressList", err)
  })
});



app.get('/deploymentList', (req, res) => {
  k8sApi2.listNamespacedDeployment('default')
  .then(res => {
    return res.status(201).send(JSON.stringify(res.body, null, 2));
  }).catch(err => {
      res.send("error found in get request to /deploymentList", err)
  })
});



app.listen(5000, () => {
  console.log('Listening on 5000');
});
