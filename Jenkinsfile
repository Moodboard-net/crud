pipeline {
    agent any
    environment{
        SCANNER_HOME= tool "sonar-scanner"
    }
    stages {
        stage('Clone Repository') {
            steps {
                echo 'Cloning source code from GitHub...'
                git branch: 'main',
                credentialsId: 'Github-Moodboard', 
                url: 'git@github.com:Moodboard-net/crud.git'
            }
        }
        stage('Sonar Analysis') {
            steps {
                sh '''
                    $SCANNER_HOME/bin/sonar-scanner -Dsonar.host.url=http://192.168.100.16:9000/ -Dsonar.login=squ_49fd6e3ec6a7e27a84174df6dfd64f36d28ae479 -Dsonar.projectName=crud -Dsonar.projectKey=crud -Dsonar.sources=.
                '''
            }
        }
        stage('Test Build') {
            steps {
                echo 'Building Docker image...'
                sh "docker build -t moodboard/crud:latest ."
            }
        }
        stage('Deploy to Target Server') {
            steps {
                echo 'Deploying to remote server...'
                sshPublisher(
                    publishers: [
                        sshPublisherDesc(
                            configName: 'docker',
                            transfers: [
                                sshTransfer(
                                    sourceFiles: 'docker-compose.yml,Dockerfile',
                                    remoteDirectory: 'crud',
                                    execCommand: '''
                                        cd /home/docker/crud
                                        docker-compose -f docker-compose.yml down || true
                                        docker-compose -f docker-compose.yml up -d
                                    '''
                                )
                            ],
                            failOnError: true,
                            verbose: true
                        )
                    ]
                )
            }
        }
    }
    
    post {
        always {
            echo 'Cleaning up local Docker image...'
            sh "docker rmi moodboard/crud:latest || true"
        }
        success {
            echo 'CI/CD pipeline completed successfully!'
        }
        failure {
            echo 'CI/CD pipeline failed.'
        }
    }
}