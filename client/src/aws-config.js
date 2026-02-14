import { Amplify } from "aws-amplify";

Amplify.configure({
  Auth: {
    region: "us-east-1",
    userPoolId: "us-east-1_wawCwyOWP",
    userPoolWebClientId: "R6uv11erjpck9vp1kod1sop43ft",
    oauth: {
      domain: "us-east-1wawcwyowp.auth.us-east-1.amazoncognito.com",
      scope: ["openid", "email", "profile"],
      redirectSignIn: "https://d25xskr4z4a6ct.cloudfront.net",
      redirectSignOut: "https://work-dna.netlify.app/",
      responseType: "code"
    }
  }
});
