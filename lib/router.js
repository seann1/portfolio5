Router.configure({
	layoutTemplate: 'layout',
  	loadingTemplate: 'loading',
  	notFoundTemplate: 'notFound'
});

Router.route('home', {
	path: '/',
	template: 'home'
});

Router.route('/portfolio', {
	name: 'portfolio',
	template: 'portfolio'
});