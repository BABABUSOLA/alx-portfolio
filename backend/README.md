#Set up the environment

#Create a google cloud storage account and generate a service account key

#Use the service account key created and downloaded and rename to key.json

#Install node.js on your environment

-Clone the application
-run `npm i` to install all the dependencies
-run `npm run start



## -----------------------------------------------------------------------

## Initial Deployment to Google Cloud Run

Sure, I can guide you through the process of deploying your Node.js Express app to Google Cloud. Here are the steps:

1. **Create a Google Cloud Project**: Sign in to your Google Cloud account. If you're new to Google Cloud, create an account to evaluate how the products perform in real-world scenarios⁴.

2. **Enable Billing**: Make sure that billing is enabled for your Google Cloud project⁴.

3. **Install the Google Cloud CLI**: You can download it from the official Google Cloud SDK page¹. After installation, initialize the gcloud CLI by running the command: `gcloud init`⁴.

4. **Set the Default Project**: To set the default project for your Cloud Run service, run the command: `gcloud config set project PROJECT_ID`. Replace `PROJECT_ID` with the name of the project you created⁴.

5. **Write the Sample Service**: Create a new directory named `helloworld` and change directory into it. Create a `package.json` file and an `index.js` file with the necessary contents⁴.

6. **Deploy to Cloud Run from Source**: In your source code directory, deploy from source using the following command: `gcloud run deploy`. If prompted to enable the API, reply `y` to enable⁴.

Please replace the placeholders with your actual project details. Also, make sure to check the official Google Cloud documentation for any updates or changes⁴.

Let me know if you need further assistance! 😊

## ---------------------------------------------------------------------------------------------
## Continuos deployment with docker
# Stage all changes
git add .

# Commit changes
git commit -m "Your commit message"

# Build the container image
gcloud builds submit --tag gcr.io/PROJECT-ID/SERVICE-NAME

# Deploy the image to Cloud Run
gcloud run deploy SERVICE-NAME --image gcr.io/PROJECT-ID/SERVICE-NAME --region REGION

## -------------------------------------------------------------------------------------------
## Continues deployment with git bash

# Stage all changes
git add .

# Commit changes
git commit -m "Your commit message"

# Build the container image
gcloud builds submit --pack image=gcr.io/PROJECT-ID/SERVICE-NAME

# Deploy the image to Cloud Run
gcloud run deploy SERVICE-NAME --image gcr.io/PROJECT-ID/SERVICE-NAME --region REGION


## -----------------------------------------------------

For the env: key.json, get from the secret key of the project
On you local, run  `export GOOGLE_APPLICATION_CREDENTIAL=key.json`
Then run you npm run start