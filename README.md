<p align="center">
  <img src="https://user-images.githubusercontent.com/83550543/128243086-db9ad69c-3db0-479c-b554-473011aca325.jpg"/>
</p>

<p align="center">
  <img src="https://travis-ci.com/oslabs-beta/Kur8.svg?branch=dev"/>
  <img src="https://img.shields.io/docker/pulls/kur8/dashboard"/>
  <img src="https://img.shields.io/github/license/oslabs-beta/Kur8" /> 
</p>

<p align="center">
 A visual overview of Kubernetes architecture and Prometheus metrics.
</p>

---

## Structure

Navigate through the structures page to easily see your control planes and worker nodes with all their pods inside. Click on the components to see more details about its metadata, status, and specifications. Easily find information regarding the image IDs or IP addresses of anything from containers to ingresses.

![kur8-structure-demo-gif](https://github.com/oslabs-beta/Kur8/blob/dev/demo-gifs/kur8-structures-demo.gif)
     
## Metrics

Get the state of your cluster at a glance with our curated metrics dashboard.

![kur8-alerts-demo-gif](https://github.com/oslabs-beta/Kur8/blob/dev/demo-gifs/kur8-metrics-demo.gif)

## Custom Metrics

Use our custom metrics page to use our PROMQL autocomplete feature to query any metrics you want.

![kur8-alerts-demo-gif](https://github.com/oslabs-beta/Kur8/blob/dev/demo-gifs/kur8-custom-demo.gif)

## Alerts

All of your Prometheus alerts including your custom ones are displayed here in the Alerts tab. Find out if any alerts are firing and which rule groups they fall under.

![kur8-alerts-demo-gif](https://github.com/oslabs-beta/Kur8/blob/dev/demo-gifs/kur8-alerts-demo.gif)
---

# Getting started

## Deploying KUR8

Kur8 requires your Kubernetes cluster to be up and running

An image of the application has been pushed to [Docker Hub](https://hub.docker.com/repository/docker/kur8/dashboard) for those who would like to build the image directly from the public repository.

We recommend deploying Kur8 directly to your Kubernetes cluster through kubectl using our config file [kur8-depl.yaml](https://github.com/oslabs-beta/Kur8/blob/dev/infra/k8s/kur8-depl.yaml).

```
kubectl apply -f kur8-depl.yaml
```

```
kubectl port-forward deployment/kur8-depl 3068:3068
```

In addition, in order to allow reading resources of the API, you must configure a set of permissions. We have set up a YAML file using RBAC authorization which you can apply directly to your Kubernetes cluster using the command line: [fabric8-rbac.yaml](https://github.com/oslabs-beta/Kur8/blob/dev/infra/k8s/fabric8-rbac.yaml)

```
kubectl apply -f fabric8-rbac.yaml
```

Then, open your web browser to http://localhost:3068.

The structures tab on the left will query your Kubernetes API to view the cluster's architecture.

---

## Deploying Prometheus

<br/>

If you don't have your instance of Prometheus installed begin by cloning this repo:

<br/>

In KUR8 directory run: 
```
kubectl create -f infra/manifests/setup
```

Once setup is complete run: 
```
kubectl create -f infra/manifests/
```

If you want to connect Kur8 to Prometheus open up the port by: 
```
kubectl --namespace monitoring port-forward svc/prometheus-k8s 9090
```

You may also view the Prometheus tab in KUR8 
```
localhost:8080
``` 
to view and create your custom dashboard.

---

## Contributors

[![Linkedin](https://i.stack.imgur.com/gVE0j.png) Jimmy Ngo](https://www.linkedin.com/in/jimmycngo/) • [<img src="https://github.githubassets.com/favicons/favicon-dark.png" width="15" height="15"> jimmycngo](https://github.com/jimmycngo)

[![Linkedin](https://i.stack.imgur.com/gVE0j.png) Ivy Yu](https://www.linkedin.com/in/ivy-yu-746a5b132/) • [<img src="https://github.githubassets.com/favicons/favicon-dark.png" width="15" height="15"> ivy118](https://github.com/ivy118)

[![Linkedin](https://i.stack.imgur.com/gVE0j.png) Steven Del Rosario](https://www.linkedin.com/in/stevendelro/) • [<img src="https://github.githubassets.com/favicons/favicon-dark.png" width="15" height="15"> stevendelro](https://github.com/stevendelro)
