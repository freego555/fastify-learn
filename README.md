Add config.env with specified variables in the root:
```env
HOST = 'localhost'
PORT = '3001'

FIREBASE_PROJECT_ID = '<your-firebase-project-id>'
FIREBASE_SERVICE_ACCOUNT_PRIVATE_KEY = '{
  "_comment": "Generate new private key for your service account here https://console.firebase.google.com/u/0/project/your-project-id/settings/serviceaccounts/adminsdk",

  "type": "",
  "project_id": "",
  "private_key_id": "",
  "private_key": "",
  "client_email": "",
  "client_id": "",
  "auth_uri": "",
  "token_uri": "",
  "auth_provider_x509_cert_url": "",
  "client_x509_cert_url": "",
  "universe_domain": ""
}'

USERS = '[
  {
    "email": "user1@example.com"
  },
  {
    "email": "user2@example.com"
  }
]'
```

`npm start` to start backend server.
