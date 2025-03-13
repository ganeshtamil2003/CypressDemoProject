pipeline {
    agent any

    tools {
        nodejs "nodejs20.11.0"  // Ensure Node.js is installed via Jenkins Tools
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/your-repo.git' // Replace with your repo URL
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Run E2E Tests') {
            steps {
                sh 'npm run cy-test' // Ensure this command exists in package.json scripts
            }
        }
    }
}
