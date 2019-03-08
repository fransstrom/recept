const { google } = require("googleapis");
var OAuth2 = google.auth.OAuth2;

const googleConfig = {
  clientId: process.env.GOOGLE_CLIENT_ID, // e.g. asdfghjkljhgfdsghjk.apps.googleusercontent.com
  clientSecret: process.env.GOOGLE_CLIENT_SECRET, // e.g. _ASDFA%DFASDFASDFASD#FAD-
  redirect: ["http://localhost", "http://localhost:3006"] // this must match your google api settings
};

/**
 * Create the google auth object which gives us access to talk to google's apis.
 */
function createConnection() {
  return new google.auth.OAuth2(
    googleConfig.clientId,
    googleConfig.clientSecret,
    googleConfig.redirect
  );
}

/**
 * This scope tells google what information we want to request.
 */
const defaultScope = ["https://www.googleapis.com/auth/userinfo.email"];

/**
 * Get a url which will open the google sign-in page and request access to the scope provided (such as calendar events).
 */
function getConnectionUrl(auth) {
  return auth.generateAuthUrl({
    access_type: "offline",
    prompt: "consent", // access type and approval prompt will force a new refresh token to be made each time signs in
    scope: defaultScope
  });
}

function urlGoogle() {
  const auth = createConnection(); // this is from previous step
  const url = getConnectionUrl(auth);
  return url;
}

async function getGoogleAccountFromCode(code) {
  const oauth2Client = new OAuth2(
    "943135891490-35beekcmehg06dgj5254js8ftatbgh7m.apps.googleusercontent.com",
    "_a6i0HOMiBrKKux16PTXWueR",
    "http://localhost:3006"
  );
  console.log(code);
  oauth2Client.getToken(code, function(err, tokens) {
    // Now tokens contains an access_token and an optional refresh_token. Save them.
    if (!err) {
      oauth2Client.setCredentials(tokens);
      console.log(tokens);
      console.log(oauth2Client.use);

      console.log(oauth2Client);
      var oauth2 = google.oauth2({
        auth: oauth2Client,
        version: "v2"
      });

      oauth2.userinfo.get(function(err, res) {
        if (err) {
          console.log(err);
        } else {
          console.log("MIN INFORMATION!!\n");
          console.log(res.data);
        }
      });
      //   var calendar = google.calendar("v3");
      //   calendar.calendarList.list({ auth: oauth2Client }, function(err, resp) {
      //     resp.data.items.forEach(function(cal) {
      //       console.log(cal.summary + " - " + cal.id);
      //     });
      //   });
    } else {
      console.log("there was an error");
    }
  });
}

module.exports.getGoogleAccountFromCode = getGoogleAccountFromCode;
