#!/bin/bash

deployed=0;

while IFS= read -r line; do
  IFS=" " read -r -a deployments <<< "${line}";
  name="${deployments[1]}";
  available="${deployments[4]}"
  if [[ $name == $1 && $available=="1" ]]; then
    deployed=1;
    break;
  fi
done <<< "$(kubectl get deployment --all-namespaces)"

if [[ $deployed -eq 1 ]]; then
  printf "Already deployed, upgrading\n\n"
  helm delete $1;
  helm install $1 deployment --set branch=$2 --set tag=$2 --set replicas=$3;
else
  printf "Deploying\n\n";
  helm install $1 deployment --set branch=$2 --set tag=$2 --set replicas=$3;
fi

printf "\n\nDone!\n\n";
