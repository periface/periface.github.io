(function() {
  var loadContributions = function() {
    $.get(
      "https://api.github.com/repos/CodefyMX/NorthLionAbpZero/stats/code_frequency",
      function(data) {
        console.log(data);
      }
    );
  };

  loadContributions();
  var typed = new Typed("#text", {
    strings: ["Runner", "Amante de la pizza", ""],
    typeSpeed: 100,
    backDelay: 1000,
    startDelay: 1000,
    loop: true,
    fadeOut: true
  });
  var waypoint = new Waypoint({
    element: $(".header-limit"),
    handler: function(direction) {
      if (direction == "down") {
        $(".menu-list").addClass("fixed-top menu-fixed");
        $(".menu-photo").fadeIn();
      } else {
        $(".menu-list").removeClass("fixed-top menu-fixed");
        $(".menu-photo").fadeOut();
      }
    }
  });

  var waypoint = new Waypoint({
    element: $(".videogamer"),
    handler: function(direction) {
      if (direction == "down") {
        $(".videogamer img").addClass("fixed-top");
      } else {
        $(".videogamer img").removeClass("fixed-top");
        $(".videogamer img").removeClass("fade-out");
        $(".videogamer img").removeClass("fade-in");
      }
    },
    offset: 30
  });

  var waypoint = new Waypoint({
    element: $("#portfolio"),
    handler: function(direction) {
      $(".videogamer img").addClass("fade-out");
      $(".videogamer img").removeClass("fade-in");
    }
  });
})();
