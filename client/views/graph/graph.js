Template.graph.helpers({
	'githubLinks': function() {
		console.log(Session.get("repos"));
		return Session.get("repos");
	}

});

Template.graph.onRendered(function() {

	function createGraph(data) {

		var parseDate = d3.time.format("%m-%d-%Y").parse;

		data.forEach(function(d) {
	    	d.date = parseDate(d.date);
	    	d.number = +d.number;
	    });

		var margin = {top: 5, right: 0, bottom: 60, left: 25},
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

	function createPieChart(dataset) {


		var width = 360;
        var height = 360;
        var radius = Math.min(width, height) / 2;
        var donutWidth = 75;
        var legendRectSize = 18;
        var legendSpacing = 4;
        var color = d3.scale.category20b();
        var svg = d3.select('.d3PieChart')
          .append('svg')
          .attr('width', width)
          .attr('height', height)
          .append('g')
          .attr('transform', 'translate(' + (width / 2) + 
            ',' + (height / 2) + ')');
        var arc = d3.svg.arc()
          .innerRadius(radius - donutWidth)
          .outerRadius(radius);
        var pie = d3.layout.pie()
          .value(function(d) { return d.commits; })
          .sort(null);
        var tooltip = d3.select('.d3PieChart')                               // NEW
          .append('div')                                                // NEW
          .attr('class', 'pieTooltip');                                    // NEW
                      
        tooltip.append('div')                                           // NEW
          .attr('class', 'label');                                      // NEW
        tooltip.append('div')                                           // NEW
          .attr('class', 'commits');                                      // NEW
        // tooltip.append('div')                                           // NEW
        //   .attr('class', 'percent');                                    // NEW

          var path = svg.selectAll('path')
            .data(pie(dataset))
            .enter()
            .append('path')
            .attr('d', arc)
            .attr('fill', function(d, i) { 
              return color(d.data.commits); 
            });
          path.on('mouseover', function(d) {                            // NEW
            // var total = d3.sum(dataset.map(function(d) {                // NEW
            //   return d.commits;                                           // NEW
            // }));                                                        // NEW
            //var percent = Math.round(1000 * d.commits / total) / 10; // NEW
            tooltip.select('.label').html(d.data.name);                // NEW
            tooltip.select('.commits').html(d.data.commits + "Commits");                // NEW             // NEW
            tooltip.style('display', 'block');                          // NEW
          });                                                           // NEW
          
          path.on('mouseout', function() {                              // NEW
            tooltip.style('display', 'none');                           // NEW
          });                                                           // NEW

          path.on('mousemove', function(d) {                            // NEW
            tooltip.style('top', (d3.event.layerY + 10) + 'px')         // NEW
              .style('left', (d3.event.layerX + 10) + 'px');            // NEW
          });                                                           // NEW
          
            
          // var legend = svg.selectAll('.legend')
          //   .data(color.domain())
          //   .enter()
          //   .append('g')
          //   .attr('class', 'legend')
          //   .attr('transform', function(d, i) {
          //     var height = legendRectSize + legendSpacing;
          //     var offset =  height * color.domain().length / 2;
          //     var horz = -2 * legendRectSize;
          //     var vert = i * height - offset;
          //     return 'translate(' + horz + ',' + vert + ')';
          //   });
          // legend.append('rect')
          //   .attr('width', legendRectSize)
          //   .attr('height', legendRectSize)                                   
          //   .style('fill', color)
          //   .style('stroke', color);
            
          // legend.append('text')
          //   .attr('x', legendRectSize + legendSpacing)
          //   .attr('y', legendRectSize - legendSpacing)
          //   .text(function(d) { return d; });

	}

	this.autorun(function() {
		if (Session.get("commits") != undefined) {
			var data = Session.get("commits");
			var pieChartData = Session.get("pieChartData");
			//console.log(["data", JSON.stringify(data)]);
			createGraph(data.commits);
			createPieChart(pieChartData);
		}
	});
});