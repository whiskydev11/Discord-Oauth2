const express = require("express");
const app = express();
const passport = require("passport");
const { Strategy } = require("passport-discord");
const session = require("express-session");

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});


let strategy = new Strategy({
  clientID: "client ıd",
  clientSecret: "secret key",
  callbackURL: "callback link",
  scope: ["guilds", "identify"]
}, (accessToken, refreshToken, profile, done) => {
  process.nextTick(() => done(null, profile));
});

passport.use(strategy);

app.use(session({
  secret: "secret",
  resave: false,
  saveUnitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

app.get("/giris", passport.authenticate("discord", {
  scope: ["guilds", "identify"]
}));

app.get("/callback", passport.authenticate("discord", {
  failureRedirect: "/hata"
}), (req, res) => {
  res.redirect("/");
});

const listener = app.listen(8000, (err) => {
  
  if (err) throw err;
  console.log("Site 8000 portu ile açıldı.")
});