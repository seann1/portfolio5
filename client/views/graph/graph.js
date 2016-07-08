Template.graph.onRendered(function() {

	function createGraph(data) {

		var parseDate = d3.time.format("%m-%d-%Y").parse;

		data.forEach(function(d) {
	    	d.date = parseDate(d.date);
	    	d.number = +d.number;
	    });

		var margin = {top: 5, right: 0, bottom: 60, left: 20},
	    width = $(".d3Vis").width() - margin.left - margin.right,
	    height = $(".d3Vis").height() - margin.top - margin.bottom;

	    var xMin = d3.min(data, function(d) {
	    	return Math.min(d.date);
	    });

	    var xMax = d3.max(data, function(d) {
	    	return Math.max(d.date);
	    });

		var x = d3.time.scale()
			.domain([xMin, xMax])
			.range([0, width]);

		var y = d3.scale.linear()
			.domain([0, d3.max(data, function(d) { return d.number; })])
		    .range([height, 0]);

		var xAxis = d3.svg.axis()
		    .scale(x)
		    .orient("bottom")
		    //.ticks(30)
			.tickSize(10, 0, 0);

		var yAxis = d3.svg.axis()
		    .scale(y)
		    .orient("left")
		    //.ticks(10);

		var svg = d3.select(".d3Vis").append("svg")
			.data(data)
		    .attr("width", width + margin.left + margin.right)
		    .attr("height", height + margin.top + margin.bottom)
		    .append("g")
		    .attr("width", width + margin.left + margin.right)
		    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

			//x.domain(data.map(function(d) { return d.date; }));
  			//y.domain([0, d3.max(data, function(d) { return d.number; })]);

	    svg.append("g")
	        .attr("class", "x axis white")
	        .attr("transform", "translate(0," + height + ")")
	        .call(xAxis)
	        .selectAll("text")
		    .attr("y", 15)
		    .attr("x", 7)
		    .attr("dy", ".20em")
		    .attr("transform", "rotate(45)")
		    .style("text-anchor", "start");

	    svg.append("g")
	        .attr("class", "y axis")
	        .call(yAxis)
	    	.append("text")
	    	.attr("width", width + margin.left + margin.right)
	        .attr("transform", "rotate(-90)")
	        .attr("y", 6)
	        .attr("dy", ".66em")
	        .style("text-anchor", "end")
	        .text("Commits");

	    var barWidth = width / data.length;

		svg.selectAll("bar")
		      .data(data)
		      .enter().append("rect")
		      .style("fill", "black")
		      //.attr("transform", function(d, i) { return "translate(" + (i * barWidth) + 2 + ",-2)"; })
		      .attr("x", function(d) { return x(d.date); })
		      .attr("width", barWidth)
		      .attr("y", function(d) { return y(d.number); })
		      .attr("height", function(d) { return height - y(d.number); });

	}

	this.autorun(function() {
		if (Session.get("commits") != undefined) {
			var data = Session.get("commits");
			console.log(["data", JSON.stringify(data)]);
			createGraph(data.commits);
		}
	});
});