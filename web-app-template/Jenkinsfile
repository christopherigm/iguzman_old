pipeline {
    agent any
    options {
        skipStagesAfterUnstable()
    }
    environment {
        APP_NAME = "web-app"
        REPLICAS = sh(script: "echo ${REPLICAS}", , returnStdout: true).trim()
        BRANCH = sh(script: "echo ${BRANCH}", , returnStdout: true).trim()
    }
    stages {
        stage("Deploying") {
            steps {
                sh "chmod 777 deploy-helm-chart.sh"
                sh "./deploy-helm-chart.sh $APP_NAME $BRANCH $REPLICAS"
            }
        }
        stage("Waiting for ready") {
            steps {
                sh "chmod 777 deployment-check.sh"
                sh "./deployment-check.sh $APP_NAME $REPLICAS"
            }
        }
    }
}
