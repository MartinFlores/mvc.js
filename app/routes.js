var routes = {
  // Default route ==>> localhost/#/
  '': function () {
    controller('index').run();
  },
};

var route = Rlite(notFound, routes);
