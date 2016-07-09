PieChartData = new Meteor.Collection('pieChartData', {});

Meteor.methods({
	setupPieChartData: function() {
        var data = PieChartData.find({}).fetch();

        return data; 
    }
});