# Kur8
[![Build Status](https://travis-ci.com/oslabs-beta/Kur8.svg?branch=dev)](https://travis-ci.com/oslabs-beta/Kur8)
![Docker Pulls](https://img.shields.io/docker/pulls/kur8/dashboard)
![GitHub](https://img.shields.io/github/license/oslabs-beta/Kur8)

A visual overview of Kubernetes architecture and Prometheus metrics.

![kur8-structure-demo-gif](https://github.com/oslabs-beta/Kur8/blob/dev/kur8-structures-demo.gif)
---

# Getting started

## Deploying KUR8

Kur8 requires your Kubernetes cluster to be up and running

An image of the application has been pushed to [Docker Hub](https://hub.docker.com/repository/docker/kur8/dashboard) for those who would like to build the image directly from the public repository.

We recommend deploying Kur8 directly to your Kubernetes cluster through kubectl using our config file [kur8-depl.yaml](https://github.com/oslabs-beta/Kur8/blob/dev/infra/k8s/kur8-depl.yaml).

`kubectl apply -f kur8-depl.yaml`

`kubectl port-forward deployment/kur8-depl 3068:3068`

In addition, in order to allow reading resources of the API, you must configure a set of permissions. We have set up a YAML file using RBAC authorization which you can apply directly to your Kubernetes cluster using the command line: [fabric8-rbac.yaml](https://github.com/oslabs-beta/Kur8/blob/dev/infra/k8s/fabric8-rbac.yaml)

`kubectl apply -f fabric8-rbac.yaml`

Then, open your web browser to http://localhost:3068.

The structures tab on the left will query your Kubernetes API to view the cluster's architecture.

---

## Deploying Prometheus

<br/>

If you don't have your instance of Prometheus installed begin by cloning this repo:

<br/>

In KUR8 directory run: `kubectl create -f infra/manifests/setup`

Once setup is complete run: `kubectl create -f infra/manifests/`

If you want to connect Kur8 to Prometheus open up the port by: `kubectl --namespace monitoring port-forward svc/prometheus-k8s 9090`

You may also view the Prometheus tab in KUR8 `localhost:8080` to view and create your custom dashboard.
