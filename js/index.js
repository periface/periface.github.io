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
      "Amante de la pizza",
      ""
    ],
    typeSpeed: 100,
    backDelay: 1000,
    startDelay: 1000,
    loop: true,
    fadeOut: true,
  });
})();
