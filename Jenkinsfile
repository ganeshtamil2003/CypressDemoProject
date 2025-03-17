pipeline {
    agent any

    tools {
        nodejs "NodeJS 20.11.0"  // Ensure Node.js is installed via Jenkins Tools
    }

    environment {
        MOCHAWESOME_REPORT_DIR = "cypress/reports/mochareports"
        MOCHAWESOME_REPORT = "${MOCHAWESOME_REPORT_DIR}/report.html"
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/ganeshtamil2003/CypressDemoProject' // Replace with your repo URL
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'npm install'
                bat 'npx cypress install'
            }
        }

        stage('Run E2E Tests') {
            steps {
                bat 'npm run test'  // Runs Cypress tests and generates JSON reports
            }
        }

        stage('Generate HTML Report') {
            steps {
                bat 'npm run posttest'  // Merges JSON reports & generates the HTML report
            }
        }

        stage('Archive Test Reports') {
            steps {
                archiveArtifacts artifacts: 'cypress/reports/mochareports/**/*', fingerprint: true
                publishHTML(target: [
                    allowMissing: false,
                    alwaysLinkToLastBuild: true,
                    keepAll: true,
                    reportDir: "${MOCHAWESOME_REPORT_DIR}",
                    reportFiles: 'report.html',
                    reportName: "Cypress Test Report"
                ])
            }
        }
    }

    post {
        success {
            emailext subject: "✅ Jenkins Build #${env.BUILD_NUMBER} Succeeded",
                     body: """
                           The Jenkins pipeline build was successful. 🎉  
                           Check details: ${env.BUILD_URL}
                           Test Report: ${env.BUILD_URL}/artifact/${MOCHAWESOME_REPORT}
                           """,
                     to: "sajeev.arumugam@finsurge.tech, rock49918@gmail.com",
                     from: "ganesh28062003@gmail.com",
                     attachLog: true,
                     attachmentsPattern: "${MOCHAWESOME_REPORT}"
        }

        failure {
            emailext subject: "❌ Jenkins Build #${env.BUILD_NUMBER} Failed",
                     body: """
                           The Jenkins pipeline build has failed. ❌  
                           Check logs: ${env.BUILD_URL}
                           """,
                     to: "sajeev.arumugam@finsurge.tech, rock49918@gmail.com",
                     from: "ganesh28062003@gmail.com",
                     attachLog: true,
                     attachmentsPattern: "${MOCHAWESOME_REPORT}"
        }
    }
}
