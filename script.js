// initialize app
var app = new Soj({
  el: "#myapp",
  data: {
    message: "my first app",
    name: "sojeb",
  },
})

  //routing
  .config(function () {
    app
      .route("/", {
        templateUrl: "template/index.html",
      })
      .route("/contact", {
        templateUrl: "template/contact.html",
        controller: "contactController",
      })
      .route("/about", {
        templateUrl: "template/about.html",
      });

    //controller
    app.controller("contactController", function () {
      console.log("Controller executed");
    });
  });
