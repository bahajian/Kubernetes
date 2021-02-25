# Kubernetes

## line 2

### line 3

#### line 4

##### line 5


## Table of contents
* [General info](#general-info)
* [Technologies](#technologies)
* [Setup](#setup)



* A `build.yaml` file at the root is the source of truth for listing all the
targets and files needed to build grpc and its tests, as well as a basic system
for dependency description.













## technologies

### 01- Create EKS Cluster using eksctl:

```
eksctl create cluster --name=node-server \
                      --region=us-east-1 \
                      --zones=us-east-1a,us-east-1b \
                      --without-nodegroup 
```
Getting the cluster list:

```
eksctl get clusters
eksctl delete cluster node-server
```

### 02- Create & Associate IAM OIDC Provider for the EKS Cluster:

```
eksctl utils associate-iam-oidc-provider \
    --region us-east-1 \
    --cluster node-server\
    --approve
```

### 03- Create Node Group with additional Add-Ons in Public Subnets:

```
eksctl create nodegroup --cluster=node-server \
                       --region=us-east-1 \
                       --name=node-server-ng-public1 \
                       --node-type=t3.medium \
                       --nodes=2 \
                       --nodes-min=2 \
                       --nodes-max=4 \
                       --node-volume-size=20 \
                       --ssh-access \
                       --ssh-public-key=kube-demo \
                       --managed \
                       --asg-access \
                       --external-dns-access \
                       --full-ecr-access \
                       --appmesh-access \
                       --alb-ingress-access 
```
Get Worker Nodes Status and other actions:

```bash
kubectl get nodes -o wide
kubectl describe pod my-first-pod 
kutectl delete nodegroup 

```

### 04- Create a POD:

```
kubectl run <desired-pod-name> --image <Container-Image> --generator=run-pod/v1

Interact With a Pod:

kubectl get po : Get pod name
kubectl logs <POD_NAME>: dump pod logs
kubectl logs -f POD_NAME: -f option to stream pod logs
kubectl describe pod <Pod-Name>    "good for trouble shooting"
kubectl delete pod <Pod-Name>

Connection into the POD container:

kubectl exec -it POD_NAME -- /bin/bash

Get YAML output of POD and Service:

kubectl get pod POD_NAME -o yaml
```
  

### 05- Expose Pod as a Service:
```python
import alaki
import dolaki
kubectl expose pod <Pod-Name>  --type=NodePort --port=80 --name=<Service-Name>

kubectl get service SERVICE_NAME -o yaml
```
if the container is listening on a port different than 80 we need to define it in the command using the target node.

## setup
## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)



