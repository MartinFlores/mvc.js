var routes = {
  // Default route ==>> localhost/#/
  '': function () {
    controller('index').run();
  },

  //==>> localhost/#/inbox
  'inbox': function () {
    controller('inbox').run();
  },

  //==>> localhost/#/inbox
  'inbox/send': function () {
    nx.importController('inbox', function() {
      inboxController.send();
    });
  },

  //==>> localhost/#/profile
  'profile': function () {
    nx.importController('profile', function() {
      profileController.index();
    });
  }
};

