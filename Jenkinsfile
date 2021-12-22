pipeline {

    stages {

        stage("docker build") {

            steps {
                echo 'building the docker image...'
                bat 'docker version'
                withCredentials([usernamePassword(credentialsId: 'docker-credentials', usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD')]) {
                    bat "docker login -u ${USERNAME} -p ${PASSWORD}"
                }
                bat 'docker build -t react-app .'
                bat 'docker tag react-app hardikjain2098/react-app:react-app'
                bat 'docker image list'
            }
        }

        stage("docker push") {

            steps {
                echo 'pushing the docker image to docker hub...'
                bat 'docker push hardikjain2098/react-app:react-app'
                bat 'docker rmi react-app'
                bat 'docker rmi hardikjain2098/react-app:react-app'
            }
        }

        stage("deploy") {

            steps {
                echo 'deploying the application...'
                withKubeConfig([credentialsId: 'minikube-certificate']) {
                    bat 'kubectl version'
                    bat 'kubectl delete deployment react-app --ignore-not-found=true'
                    bat 'kubectl delete service react-app-service --ignore-not-found=true'
                    bat 'kubectl apply -f deployment.yml'
                    bat 'kubectl get all'
                }
            }
        }
    }
}