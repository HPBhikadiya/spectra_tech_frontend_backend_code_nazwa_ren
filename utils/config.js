// set ur config here or in .env file
const config = {
  mongoDB: "mongodb://127.0.0.1:27017/spectra_db",
  token_key: "jwt_ubereats",
  bucketName: "xxxxx",
  bucketRegion: "us-east-2",
  awsAccessKey: "xxxxxxxx",
  awsSecretKey: "xxxxxxxxx",
  twilioSID: "AC2ca4b3790edd496af34047608ebdc973",
  twilioAuthToken: "6de01d1195513ecddb0a3769fdc089c7",
  twilioPhoneNumber: "+12256865869",
  sendGridAPI:
    "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",
  fromMail: "spectratechcorp@gmail.com",
  stripeSecretKey:
    "sk_test_51PD8wPGEpr3f403gWH7pshof2l5NaWjH8G8qfKoHyFPpvoFyMeIBgh4hHt3YRSLdEkNZSaavLHwAlgSlxJ4CYyPF00wBYkHRdj",
  stripeEmail: "ren@spectradiscount.ca",
};

export default config;
