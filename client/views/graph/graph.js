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
          .attr('class', 'tooltip');                                    // NEW
                      
        tooltip.append('div')                                           // NEW
          .attr('class', 'label');                                      // NEW
             
        tooltip.append('div')                                           // NEW
          .attr('class', 'count');                                      // NEW
        tooltip.append('div')                                           // NEW
          .attr('class', 'percent');                                    // NEW

          var path = svg.selectAll('path')
            .data(pie(dataset))
            .enter()
            .append('path')
            .attr('d', arc)
            .attr('fill', function(d, i) { 
              return color(d.name); 
            });
          path.on('mouseover', function(d) {                            // NEW
            var total = d3.sum(dataset.map(function(d) {                // NEW
              return d.commits;                                           // NEW
            }));                                                        // NEW
            var percent = Math.round(1000 * d.commits / total) / 10; // NEW
            tooltip.select('.label').html(d.name);                // NEW
            tooltip.select('.count').html(d.commits);                // NEW
            tooltip.select('.percent').html(percent + '%');             // NEW
            tooltip.style('display', 'block');                          // NEW
          });                                                           // NEW
          
          path.on('mouseout', function() {                              // NEW
            tooltip.style('display', 'none');                           // NEW
          });                                                           // NEW
          /* OPTIONAL 
          path.on('mousemove', function(d) {                            // NEW
            tooltip.style('top', (d3.event.layerY + 10) + 'px')         // NEW
              .style('left', (d3.event.layerX + 10) + 'px');            // NEW
          });                                                           // NEW
          */
            
          var legend = svg.selectAll('.legend')
            .data(color.domain())
            .enter()
            .append('g')
            .attr('class', 'legend')
            .attr('transform', function(d, i) {
              var height = legendRectSize + legendSpacing;
              var offset =  height * color.domain().length / 2;
              var horz = -2 * legendRectSize;
              var vert = i * height - offset;
              return 'translate(' + horz + ',' + vert + ')';
            });
          legend.append('rect')
            .attr('width', legendRectSize)
            .attr('height', legendRectSize)                                   
            .style('fill', color)
            .style('stroke', color);
            
          legend.append('text')
            .attr('x', legendRectSize + legendSpacing)
            .attr('y', legendRectSize - legendSpacing)
            .text(function(d) { return d; });



		

	// var canvasWidth = 800, //width
 //      canvasHeight = 800,   //height
 //      outerRadius = 300,   //radius
 //      color = d3.scale.category20(); //builtin range of colors
    
 //    var vis = d3.select(".d3PieChart")
 //      .append("svg:svg") //create the SVG element inside the <body>
 //        .data([dataSet]) //associate our data with the document
 //        .attr("width", canvasWidth) //set the width of the canvas
 //        .attr("height", canvasHeight) //set the height of the canvas
 //        .append("svg:g") //make a group to hold our pie chart
 //          .attr("transform", "translate(" + 1.5*outerRadius + "," + 1.5*outerRadius + ")") // relocate center of pie to 'outerRadius,outerRadius'
          
 //    // This will create <path> elements for us using arc data...
 //    var arc = d3.svg.arc()
 //      .outerRadius(outerRadius);

 //    var pie = d3.layout.pie() //this will create arc data for us given a list of values
 //      .value(function(d) { return d.commits; }) // Binding each value to the pie
 //      .sort( function(d) { return null; } );

 //    var div = d3.select(".d3PieChart").append("div")   
 //    .attr("class", "tooltip")               
 //    .style("opacity", 0);

 //    // Select all <g> elements with class slice (there aren't any yet)
 //    var arcs = vis.selectAll("g.slice")
 //      // Associate the generated pie data (an array of arcs, each having startAngle,
 //      // endAngle and value properties) 
 //      .data(pie)
 //      // This will create <g> elements for every "extra" data element that should be associated
 //      // with a selection. The result is creating a <g> for every object in the data array
 //      .enter()
 //      // Create a group to hold each slice (we will have a <path> and a <text>
 //      // element associated with each slice)
 //      .append("svg:g")
 //      .attr("class", "slice")



 //    arcs.append("svg:path")
 //      //set the color for each slice to be chosen from the color function defined above
 //      .attr("fill", function(d, i) { return color(i); } )
 //      //this creates the actual SVG path using the associated data (pie) with the arc drawing function
 //      .attr("d", arc);

 //  //     /* Initialize tooltip */
	// 	// tip = d3.tip().attr('class', 'd3-tip').html(function(d) { return d; });

	// 	// /* Invoke the tip in the context of your visualization */
	// 	// vis.call(tip)

	// 	// arcs.selectAll('g.slice')
	// 	//   .data(dataSet)
	// 	// .enter().append('rect')
	// 	//   .attr('width', function() { return x.rangeBand() })
	// 	//   .attr('height', function(d) { return h - y(d) })
	// 	//   .attr('y', function(d) { return y(d) })
	// 	//   .attr('x', function(d, i) { return x(i) })
	// 	//   .on('mouseover', tip.show)
	// 	//   .on('mouseout', tip.hide);

 //    // Add a legendLabel to each arc slice...
 //    arcs.append("svg:text")
 //      .attr("transform", function(d) { //set the label's origin to the center of the arc
 //        //we have to make sure to set these before calling arc.centroid
 //        d.outerRadius = outerRadius + 50; // Set Outer Coordinate
 //        d.innerRadius = outerRadius + 45; // Set Inner Coordinate
 //        return "translate(" + arc.centroid(d) + ")";
 //      })
 //      .attr("text-anchor", "middle") //center the text on it's origin
 //      .style("fill", "Purple")
 //      .style("font", "bold 12px Arial")
 //      .text(function(d, i) { return dataSet[i].name; }); //get the label from our original data array

 //    // Add a magnitude value to the larger arcs, translated to the arc centroid and rotated.
 //    arcs.filter(function(d) { return d.endAngle - d.startAngle > .2; }).append("svg:text")
 //      .attr("dy", ".35em")
 //      .attr("text-anchor", "middle")
 //      //.attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")rotate(" + angle(d) + ")"; })
 //      .attr("transform", function(d) { //set the label's origin to the center of the arc
 //        //we have to make sure to set these before calling arc.centroid
 //        d.outerRadius = outerRadius; // Set Outer Coordinate
 //        d.innerRadius = outerRadius/2; // Set Inner Coordinate
 //        return "translate(" + arc.centroid(d) + ")rotate(" + angle(d) + ")";
 //      })
 //      .style("fill", "White")
 //      .style("font", "bold 12px Arial")
 //      .text(function(d) { return d.data.commits; });

 //    // Computes the angle of an arc, converting from radians to degrees.
 //    function angle(d) {
 //      var a = (d.startAngle + d.endAngle) * 90 / Math.PI - 90;
 //      return a > 90 ? a - 180 : a;
 //    }

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