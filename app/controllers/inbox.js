var inboxController = {
	index: function(){
		var data = {
			name: 'Inbox',
			msgs: [
			{
				name: 'Martin',
				msg: 'sd',
				date: 'Ayer'
			},
			{
				name: 'Martin',
				msg: 'HAY Q PESADO',
				date: 'Antier'
			},
			{
				name: 'David',
				msg: 'Esta muy elegante we',
				date: 'Hoy'
			}]
		}
		$('#app').showView('inbox/inbox', data);
	},

	send: function() {
		var data = {
			name: 'Envia tu mensaje',
			contacts: [
			{
				name: 'Martin',
				phoneNumber: 'xx xx xx xx xx'
			},
			{
				name: 'Sergio',
				phoneNumber: 'xx xx xx xx xx',
			},
			{
				name: 'David',
				phoneNumber: 'xx xx xx xx xx',
			}]
		}
		$('#app').showView('inbox/send', data);
	}
}