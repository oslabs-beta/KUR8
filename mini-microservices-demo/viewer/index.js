const express = require('express');
const app = express();
app.use(express.json());

const k8s = require('@kubernetes/client-node');
const kc = new k8s.KubeConfig();
kc.loadFromDefault();
const k8sApi = kc.makeApiClient(k8s.CoreV1Api);

const k8sApi2 = kc.makeApiClient(k8s.ExtensionsV1beta1Api);

const getPodList = async (req, res, next) => {
  const data = await k8s.topNodes(k8sApi);
  // console.log(JSON.stringify(data));
  res.locals.podList = data[0];
  return next();

  // k8sApi
  //   .listNamespacedPod('default')
  //   .then(data => {
  //     res.locals.podList = data.body
  //     return next()
  //   })
  //   .catch(err => {
  //     res.status(500).send('error found in get request to /podList', err);
  //   });
};

app.get('/podList', getPodList, (req, res) => {
  res.status(201).send(JSON.parse(res.locals.podList));
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
  k8sApi
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

app.get('/', (req, res) => {
  res.send('hello world');
});

app.listen(5000, () => {
  console.log('Listening on 5000');
});
