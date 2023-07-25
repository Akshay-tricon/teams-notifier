const axios = require('axios');

const clientId = 'CLIENT_ID';
const clientSecret = 'CLIENT_SECRET';
const tenantId = 'TENANT_ID';


async function getAccessToken() {
  const url = `https://login.microsoftonline.com/${tenantId}/oauth2/token`;
  const data = `grant_type=client_credentials&client_id=${clientId}&client_secret=${clientSecret}&resource=https://graph.microsoft.com`;

  try {
    const response = await axios.post(url, data, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });

    return response.data.access_token;
  } catch (error) {
    console.error('Error getting access token:', error.message);
    return null;
  }
}

// Function to post the file to the Teams channel
async function sendFileToChannel(accessToken, teamId, channelId, fileUrl, fileName) {
  const apiUrl = `https://graph.microsoft.com/v1.0/teams/${teamId}/channels/${channelId}/messages`;
  const headers = {
    Authorization: `Bearer ${accessToken}`,
    'Content-Type': 'application/json',
  };

  const body = {
    subject: 'File attachment', // Subject of the message
    body: {
      content: 'requested file.', // Body of the message
    },
    attachments: [
      {
        '@odata.type': '#microsoft.graph.fileAttachment',
        contentUrl: fileUrl, // URL of the file you want to send
        name: fileName, // Name of the file
      },
    ],
  };

  try {
    const response = await axios.post(apiUrl, body, { headers });
    console.log('File sent successfully:', response.data);
  } catch (error) {
    console.error('Error sending file:', error.message);
  }
}

// Example usage
async function main() {
  const accessToken = await getAccessToken();
  if (!accessToken) return;

  const teamId = 'TEAM_ID';
  const channelId = 'CHANNEL_ID';
  const fileUrl = 'URL_TO_FILE';
  const fileName = 'FILENAME';

  sendFileToChannel(accessToken, teamId, channelId, fileUrl, fileName);
}

main();
