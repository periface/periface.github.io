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
    strings: [
      "Runner",
      "Clean code defender",
      "Roman legionary wannabe",
      "Old school gamer"
    ],
    typeSpeed: 100,
    backDelay: 1000,
    startDelay: 1000,
    loop: true,
    fadeOut: true
  });
  var waypoint1 = new Waypoint({
    element: $(".hero-header"),
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
  // var waypoint2 = new Waypoint({
  //   element: $(".section-main"),
  //   handler: function(direction) {
  //     if (direction == "down") {
  //       $(".menu-list").addClass("menu-fixed-left");
  //     } else {
  //       $(".menu-list").removeClass("menu-fixed-left ");
  //     }
  //   }
  // });

  var waypointC = new Waypoint({
    element: $(".feature-c"),
    handler: function(direction) {
      if (direction == "down") {
        $(".menu-list").addClass("bg-c");
      } else {
        $(".menu-list").removeClass("bg-c");
      }
    },
    offset: 30
  });

  var waypointJ = new Waypoint({
    element: $(".feature-j"),
    handler: function(direction) {
      if (direction == "down") {
        $(".menu-list").addClass("bg-j");
      } else {
        $(".menu-list").removeClass("bg-j");
      }
    },
    offset: 30
  });
  var waypoint3 = new Waypoint({
    element: $(".videogamer"),
    handler: function(direction) {
      if (direction == "down") {
        $(".videogamer img").addClass("fixed-top octo");
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

  $(".js-gist-c").click(function() {
    $("#gist-c").fadeIn();
    $("#feature-c").fadeOut();
    $(this).fadeOut();
    $(".js-gist-c-toggle").fadeIn();
  });
  $(".js-gist-c-toggle").click(function() {
    $("#gist-c").fadeOut();
    $("#feature-c").fadeIn();
    $(".js-gist-c").fadeIn();
    $(this).fadeOut();
  });
})();
