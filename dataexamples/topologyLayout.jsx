<node>
  <masternode>
    <apiservice/>
    <etcd/>
    <kubecm/>
    <kubescheduler/>
    {...workernode}
  </masternode>
  <workernode>
    <kubelet/>
    <kube-proxy/>
    <pods/>
    <pods/>
    <pods/>
    <pods/>
    <pods/>
    <pods/>
    {...pods}
  </workernode>
</node>


<pod>
  <clusterIPService/>
  <container/>
</pod>