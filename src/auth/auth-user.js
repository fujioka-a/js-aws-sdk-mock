require('dotenv').config();
const AWS = require('aws-sdk');
const CognitoIdentityServiceProvider = AWS.CognitoIdentityServiceProvider;

const client = new CognitoIdentityServiceProvider({region: process.env.AWS_REGION}); // あなたのリージョン


async function getIdToken(email, password) {
  const params = {
    AuthFlow: 'USER_PASSWORD_AUTH', 
    ClientId: process.env.POOL_CLIENT_ID, // あなたのCognito User PoolのClient ID
    AuthParameters: {
      'USERNAME': email,
      'PASSWORD': password  
    }
  };

  try {
    const data = await client.initiateAuth(params).promise();
    return data.AuthenticationResult.IdToken;
  } catch (err) {
    console.error(err);
  }
}

getIdToken('メールアドレス', 'パスワード')
  .then(idToken => console.log('IDトークン: ' + idToken));