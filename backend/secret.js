// Imports the Secret Manager library
const { SecretManagerServiceClient } = require('@google-cloud/secret-manager');

// Instantiates a client
const client = new SecretManagerServiceClient();
// projects/483870948389/secrets/cloud-storage-secret-key/versions/1
async function accessSecret(secret_id, version_id = 'latest') {
    const project_id = "483870948389";
    const name = `projects/${project_id}/secrets/${secret_id}/versions/${version_id}`
    // console.log(name,'the name')
    const [version] = await client.accessSecretVersion({
        name: name,
    })
    // Extract the payload as a string.
    const payload = version.payload.data.toString();
    return payload;
}

const getSecrets = async () => {

    // from secret manager
    const cloud_storage_secret_key = await accessSecret('cloud-storage-secret-key');


    return {
        cloud_storage_secret_key,
    }

}

module.exports = {
    getSecrets,
    accessSecret
}