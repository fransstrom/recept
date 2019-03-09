const { google } = require("googleapis");
var OAuth2 = google.auth.OAuth2;
require("dotenv").config();

const googleConfig = {
  clientId: process.env.GOOGLE_CLIENT_ID, // e.g. asdfghjkljhgfdsghjk.apps.googleusercontent.com
  clientSecret: process.env.GOOGLE_CLIENT_SECRET, // e.g. _ASDFA%DFASDFASDFASD#FAD-
  redirect: ["http://localhost", "http://localhost:3006"] // this must match your google api settings
};

/**
 * Create the google auth object which gives us access to talk to google's apis.
 */
function createConnection() {
  return new OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_CLIENT_REDIRECT_URI
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

function getGoogleAccountFromCode(code, callback) {
  console.log("STARTING GOOGLE METHOD");
  const oauth2Client = createConnection();

  oauth2Client.getToken(code, function(err, tokens) {
    if (!err) {
      oauth2Client.setCredentials(tokens);

      var oauth2 = google.oauth2({
        auth: oauth2Client,
        version: "v2"
      });
      oauth2.userinfo.get(function(err, res) {
        if (err) {
          console.log(err);
        } else {
          var userInfo = res.data;
          var user = {
            id: userInfo.id,
            email: userInfo.email,
            verified_email: userInfo.verified_email,
            name: userInfo.name,
            given_name: userInfo.given_name,
            family_name: userInfo.family_name,
            picture: userInfo.picture,
            locale: userInfo.locale,
            accessToken: tokens.access_token,
            refreshToken: tokens.refresh_token,
            tokenExpiryDate: tokens.expiry_date
          };

          return callback(user);
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
