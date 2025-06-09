# K8S Shared Agent

## About

Example of how you can set up a **GitLab CI/CD pipeline** to deploy an application using a **shared Kubernetes Agent**:

### **1. Configure the Kubernetes Agent**

In your **agent configuration project**, update the `.gitlab/agents/<agent-name>/config.yml` file to allow access to multiple projects:

```yaml
user_access:
  access_as:
    agent: {}
    user: {}
  projects:
    - id: my-group/my-project
    - id: my-group/another-project
```

### **2. Define the CI/CD Pipeline**

In your **application repository**, create a `.gitlab-ci.yml` file with the following structure:

```yaml
stages:
  - build
  - deploy

variables:
  KUBE_CONTEXT: my-agent@my-group/my-project

build:
  stage: build
  script:
    - docker build -t my-app:latest .
    - docker push my-app:latest

deploy:
  stage: deploy
  script:
    - kubectl config use-context $KUBE_CONTEXT
    - kubectl apply -f k8s/deployment.yaml
```

### **3. Run the Pipeline**

Once you push your changes, GitLab CI/CD will:

1. **Build** the Docker image and push it to the registry.
2. **Deploy** the application to the Kubernetes cluster using the shared agent.
