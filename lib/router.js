Router.configure({
	layoutTemplate: 'layout',
  	loadingTemplate: 'loading',
  	notFoundTemplate: 'notFound'
});

Router.route('home', {
	path: '/',
	template: 'home'
});