pipeline {
    agent any;

    stages {
        stage('Prepare') {
            steps {
                checkout scm
                sh """
                    npm install
                    npm run lint
                """
            }
        }

        stage('Unit Tests') {
            steps {
                sh 'npm run test:ci'

                publishHTML target: [
                    allowMissing: false,
                    alwaysLinkToLastBuild: false,
                    keepAll: true,
                    reportDir: 'coverage',
                    reportFiles: 'index.html',
                    reportName: 'Coverage Report'
                ]
            }
        }

        stage ('Build Dev') {
            steps {
                sh '''
                    npm run build:debug
                '''
            }
        }

        stage ('Build Release') {
            steps {
                sh '''
                    npm run build:prod
                '''
            }
        }
    }
}
