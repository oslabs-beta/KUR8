const express = require('express');

const app = express();

const k8s = require('@kubernetes/client-node');

const kc = new k8s.KubeConfig();
kc.loadFromDefault();

const k8sApi = kc.makeApiClient(k8s.CoreV1Api);

k8sApi.listNamespacedPod('default').then((res) => {
  console.log(JSON.stringify(res.body, null, 2));
});

app.listen(5000, () => {
  console.log('Listening on 5000');
});
