pipeline {
    agent any

    environment {
        // Change this to your real Docker Hub username/repo, e.g. "rafi3215987/portfolio"
        IMAGE_NAME        = "MahbuburRahmanRafi/portfolio"
        IMAGE_TAG         = "${env.BUILD_NUMBER}"
        // ID of the "Username with password" credential you create in Jenkins
        DOCKERHUB_CREDS   = credentials('dockerhub-creds')
    }

    options {
        // Keep the last 10 builds' console output; discard older ones
        buildDiscarder(logRotator(numToKeepStr: '10'))
        disableConcurrentBuilds()
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
                sh 'echo "Checked out commit: $(git rev-parse --short HEAD)"'
            }
        }

        stage('Build') {
            steps {
                sh "docker build -t ${IMAGE_NAME}:${IMAGE_TAG} ."
            }
        }

        stage('Tag') {
            steps {
                sh "docker tag ${IMAGE_NAME}:${IMAGE_TAG} ${IMAGE_NAME}:latest"
            }
        }

        stage('Docker Hub Login') {
            steps {
                sh 'echo "$DOCKERHUB_CREDS_PSW" | docker login -u "$DOCKERHUB_CREDS_USR" --password-stdin'
            }
        }

        stage('Push') {
            steps {
                sh "docker push ${IMAGE_NAME}:${IMAGE_TAG}"
                sh "docker push ${IMAGE_NAME}:latest"
            }
        }
    }

    post {
        always {
            // Always log out and drop local copies of the tags built this run,
            // so credentials and images don't linger on the Jenkins agent.
            sh 'docker logout || true'
            sh "docker rmi ${IMAGE_NAME}:${IMAGE_TAG} ${IMAGE_NAME}:latest || true"
        }
        success {
            echo "Pushed ${IMAGE_NAME}:${IMAGE_TAG} and ${IMAGE_NAME}:latest to Docker Hub."
            echo "Deployment is manual for this lab — Jenkins stops here on purpose."
        }
        failure {
            echo "Pipeline failed — check the stage view above for which step broke."
        }
    }
}
