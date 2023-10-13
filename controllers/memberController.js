let memberController = module.exports;

memberController.home = (req, res) => {
  console.log("GET cont.home");
  res.send("Home sahifadasiz");
};

memberController.signup = (req, res) => {
  console.log("POST cont.signup");

  res.send("Sign Up sahifadasiz");
};

memberController.login = (req, res) => {
  console.log("POST cont.login");

  res.send("Log in sahifadasiz");
};

memberController.logout = (req, res) => {
  console.log("GET cont.logout");

  res.send("Log out sahifadasiz");
};
