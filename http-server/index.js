const http = require("http");
const fs = require("fs");

const args = require("minimist")(process.argv.slice(2));
let homeContent = "";
let projectContent = "";
let registrationContent = "";

fs.readFile("my-home.html", (err, home) => {
  if (err) {
    throw err;
  }
  homeContent = home;
});

fs.readFile("my-project.html", (err, project) => {
  if (err) {
    throw err;
  }
  projectContent = project;
});

fs.readFile("user-registration.html", (err, registration) => {
  if (err) {
    throw err;
  }
  registrationContent = registration;
});

http
  .createServer((request, response) => {
    let url = request.url;
    console.log("Requested URL: ", url);
    response.writeHeader(200, { "Content-Type": "text/html" });

    switch (url) {
      case "/my-project":
        response.write(projectContent);
        response.end();
        break;
      case "/user-registration":
        response.write(registrationContent);
        response.end();
        break;
      default:
        response.write(homeContent);
        response.end();
        break;
    }
  })
  .listen(args["port"]);

console.log(`Server is now live on port ${args["port"]}`);
