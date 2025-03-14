pipeline {
    agent any

    tools {
        nodejs "NodeJS 20.11.0"  // Ensure Node.js is installed via Jenkins Tools
    }
    // environment {
    //     NO_COLOR = "1"
    // }

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
                bat 'npm run cy-test' // Ensure this command exists in package.json scripts
            }
        }
    }

    post {
    success {
        emailext subject: "✅ Jenkins Build #${env.BUILD_NUMBER} Succeeded",
                 body: """
                       The Jenkins pipeline build was successful. 🎉  
                       Check details: ${env.BUILD_URL}
                       """,
                 to: "ganesh28062003@gmail.com",
                 attachLog: true
    }

    failure {
        emailext subject: "❌ Jenkins Build #${env.BUILD_NUMBER} Failed",
                 body: """
                       The Jenkins pipeline build has failed. ❌  
                       Check logs: ${env.BUILD_URL}
                       """,
                 to: "ganesh28062003@gmail.com",
                 attachLog: true
    }
}
}
