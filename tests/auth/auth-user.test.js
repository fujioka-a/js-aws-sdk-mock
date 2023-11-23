const { CognitoIdentityServiceProvider } = require("aws-sdk");
const { mockClient } = require("aws-sdk-client-mock");

// CognitoIdentityServiceProviderクライアントをモック化
const cognitoMock = mockClient(CognitoIdentityServiceProvider);

it("should mock Cognito initiateAuth", async () => {
  // initiateAuthメソッドの戻り値をモック化
  cognitoMock.on(CognitoIdentityServiceProvider.prototype.initiateAuth).resolves({
    AuthenticationResult: {
      IdToken: "mockIdToken",
    },
  });

  const idToken = await getIdToken("test@example.com", "password");

  expect(idToken).toEqual("mockIdToken");
});

// テスト終了後にモックをリセット
afterEach(() => {
  cognitoMock.restore();
});
