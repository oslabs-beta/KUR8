<<<<<<< HEAD
const path = require('path');
const express = require('express');
const app = express();
app.use(express.json());

const k8s = require('@kubernetes/client-node');
const kc = new k8s.KubeConfig();
kc.loadFromDefault();
const k8sApi = kc.makeApiClient(k8s.CoreV1Api);
// app.use(express.static(path.join(__dirname, '../infra/k8s')));

app.get('/', (req, res) => {
  res.send('hello world');
});

app.get('/podList', (req, res) => {
  k8sApi
    .listNamespacedPod('default')
    .then(data => res.send(data.body))
    .catch(err => {
      res.send(`error found in get request to /podList', ${err}`);
    });
});

app.get('/serviceList', (req, res) => {
  k8sApi
    .listNamespacedService('default')
    .then(data => res.send(data.body))
    .catch(err => {
      res.send(`error found in get request to /serviceList, ${err}`);
    });
});

app.get('/ingressList', (req, res) => {
  k8sApi
    .listNamespacedIngress('default')
    .then(data => res.send(data.body))
    .catch(err => {
      res.send(`error found in get request to /ingressList, ${err}`);
    });
});

app.get('/deploymentList', (req, res) => {
  k8sApi
    .listNamespacedDeployment('default')
    .then(data => res.send(data.body))
    .catch(err => {
      res.send(`error found in get request to /deploymentList, ${err}`);
    });
});

app.listen(5000, () => {
  console.log('Listening on 5000');
});
=======
<<<<<<<< HEAD:mini-microservices-demo/viewer/index.js
const express = require('express');
const app = express();
app.use(express.json());
========
// import express, {Application, Request, Response, NextFunction} from 'express';
// const app: express.Application = express();
// app.use(express.json());
>>>>>>>> c85fbd3362e2d44eec6d80e2c5486b0b8ff2b217:mini-microservices-demo/viewer/index1.ts

// const k8s = require('@kubernetes/client-node');
// const kc = new k8s.KubeConfig();
// kc.loadFromDefault();
// const k8sApi = kc.makeApiClient(k8s.CoreV1Api);

// const k8sApi2 = kc.makeApiClient(k8s.ExtensionsV1beta1Api);

// const getPodList = async (req, res, next) => {
//   const data = await k8s.topNodes(k8sApi);
//   // console.log(JSON.stringify(data));
//   res.locals.podList = data[0];
//   return next();

//   // k8sApi
//   //   .listNamespacedPod('default')
//   //   .then(data => {
//   //     res.locals.podList = data.body
//   //     return next()
//   //   })
//   //   .catch(err => {
//   //     res.status(500).send('error found in get request to /podList', err);
//   //   });
// };

// app.get('/podList', getPodList, (req, res) => {
//   res.status(201).send(JSON.parse(res.locals.podList));
// });

// console.log('jj');

<<<<<<<< HEAD:mini-microservices-demo/viewer/index.js
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
========
// const getServiceList = (req: Request, res: Response, next: NextFunction) => {
//   k8sApi
//     .listNamespacedService('default')
//     .then(data => {
//       res.locals.serviceList = data.body;
//       return next();
//     })
//     .catch(err => {
//       res.status(500).send(`error found in get request to /serviceList, ${err}`);
//     });
// };
>>>>>>>> c85fbd3362e2d44eec6d80e2c5486b0b8ff2b217:mini-microservices-demo/viewer/index1.ts

// app.get('/serviceList', getServiceList, (req, res) => {
//   res.status(201).send(res.locals.serviceList);
// });

<<<<<<<< HEAD:mini-microservices-demo/viewer/index.js
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
========
// const getIngressList = (req, res, next) => {
//   k8sApi2
//     .listNamespacedIngress('default')
//     .then(data => {
//       res.locals.ingressList = data.body;
//       return next();
//     })
//     .catch(err => {
//       res.status(500).send(`error found in get request to /ingressList, ${err}`);
//     });
// };
>>>>>>>> c85fbd3362e2d44eec6d80e2c5486b0b8ff2b217:mini-microservices-demo/viewer/index1.ts

// app.get('/ingressList', getIngressList, (req, res) => {
//   res.status(201).send(res.locals.ingressList);
// });

<<<<<<<< HEAD:mini-microservices-demo/viewer/index.js
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
========
// const getDeploymentList = (req, res, next) => {
//   k8sApi
//     .listNamespacedDeployment('default')
//     .then(data => {
//       res.locals.deploymentList = data.body;
//       return next();
//     })
//     .catch(err => {
//       res
//         .status(500)
//         .send('error found in get request to /deploymentList', err);
//     });
// };
>>>>>>>> c85fbd3362e2d44eec6d80e2c5486b0b8ff2b217:mini-microservices-demo/viewer/index1.ts

// app.get('/deploymentList', getDeploymentList, (req, res) => {
//   res.status(201).send(res.locals.deploymentList);
// });

// app.get('/', (req, res) => {
//   res.send('hello world');
// });

// app.listen(5000, () => {
//   console.log('Listening on 5000');
// });
>>>>>>> c85fbd3362e2d44eec6d80e2c5486b0b8ff2b217
