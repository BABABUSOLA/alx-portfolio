const { SecretManagerServiceClient } = require('@google-cloud/secret-manager');

const client = new SecretManagerServiceClient();

async function accessSecret() {
    const [version] = await client.accessSecretVersion({
        name: 'projects/alx-portfolio-image-to-pdf/secrets/cloud-storage-secret-key/versions/latest',
    });

    const payload = version.payload.data.toString('utf8');
    return JSON.parse(payload);
}


module.exports = accessSecret;