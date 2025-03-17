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
                git branch: 'main', url: 'https://github.com/ganeshtamil2003/CypressDemoProject'
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
        script {
            def reportExists = bat(script: 'if exist cypress\\reports\\mochareports\\report.html (echo 1) else (echo 0)', returnStdout: true).trim()
            if (reportExists == '1') {
                archiveArtifacts artifacts: 'cypress/reports/mochareports/**/*', fingerprint: true

                publishHTML(target: [
                    allowMissing: true,  // Prevents failure if reports are missing
                    alwaysLinkToLastBuild: true,
                    keepAll: true,
                    reportDir: "${MOCHAWESOME_REPORT_DIR}",
                    reportFiles: 'report.html',
                    reportName: "Cypress Test Report"
                ])
            } else {
                echo "No HTML report found, skipping archive and publishing."
            }
        }
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
