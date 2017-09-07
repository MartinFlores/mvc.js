var profileController = {
	index: function(){
		setTitle('Perfil');
		setFooter('footer-profile');
		$('#app').showView('profile/profile');
	},

	onLoad: function() {
		showDesign('profile-view');
	},
}