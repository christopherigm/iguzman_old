#!/bin/bash

ready=0;

while true; do
  while IFS= read -r line; do
    IFS=" " read -r -a deployments <<< "${line}";
    name="${deployments[1]}";
    available="${deployments[4]}";
    if [[ $name == $1 && $available -eq $2 ]]; then
      ready=1;
      break;
    fi
  done <<< "$(kubectl get deployment --all-namespaces)"
  if [[ $ready -eq 1 ]]; then
    break;
  else
    printf ".";
    sleep 2s;
  fi
done

printf "\n\nDone!\n\n";
