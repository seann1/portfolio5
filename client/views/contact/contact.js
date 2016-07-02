Template.layout.events({
	'click .linkedinLink': function(e, template) {
		var win = window.open('http://www.linkedin.com/in/seanniesen', '_blank');
		if (win) {
		    //Browser has allowed it to be opened
		    win.focus();
		} else {
		    //Browser has blocked it
		    alert('Please allow popups for this website');
		}
	},
	'click .githubcontactLink': function(e, template) {
		var win = window.open('http://github.com/seann1', '_blank');
		if (win) {
		    //Browser has allowed it to be opened
		    win.focus();
		} else {
		    //Browser has blocked it
		    alert('Please allow popups for this website');
		}
	}
});