var routes = {
  // Default route ==>> localhost/#/
  '': function () {
    nx.importController('index', function() {
      indexController.index();
    });
  },

  //==>> localhost/#/inbox
  'inbox': function () {
    nx.importController('inbox', function() {
      inboxController.index();
    });
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

