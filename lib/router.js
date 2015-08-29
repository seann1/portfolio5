Router.configure({
	layoutTemplate: 'layout',
  	loadingTemplate: 'loading',
  	notFoundTemplate: 'notFound'
});

Router.route('home', {
	path: '/',
	template: 'home'
});

Router.route('/portfolio', function() {
	this.render('portfolio');
	console.log("hi");
}, {
	name: 'portfolio',
	template: 'portfolio'

});