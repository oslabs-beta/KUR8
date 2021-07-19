# FTRI2-Crows-Nest
A visual overview of Kubernetes architecture and Prometheus metrics

---

# Getting started

<br/>

## Deploying KUR8

<br/>

Assuming you already have a Kubernetes cluster running, you can get started by:

<br/>

In KUR8 directory run:  `skaffold dev`

Once deployed open up port to KUR8 app: `kubectl port-forward deployment/kur8-depl 8080:8080`

Now open up `localhost:8080` in your browser

The structures tab on the left will query your Kubernetes API to view the cluster's architecture.

---

## Deploying Prometheus

<br/>

If you don't have your instance of Prometheus installed begin by:

<br/>

In KUR8 directory run: `kubectl create -f infra/manifests/setup`

Once setup is complete run: `kubectl create -f infra/manifests/`

If you want to open up Prometheus  UI run: `kubectl --namespace monitoring port-forward svc/prometheus-k8s 9090`

Now open up `localhost:9090` in your browser

You may also view the Prometheus tab in KUR8 `localhost:8080` to view and create your custom dashboard.
