(function() {
  var waypoint1 = new Waypoint({
    element: $(".section-main"),
    handler: function(direction) {
      if (direction == "down") {
        $(".menu-list").addClass("fixed-top menu-fixed");
      } else {
        $(".menu-list").removeClass("fixed-top menu-fixed");
      }
    }
  });
})();
