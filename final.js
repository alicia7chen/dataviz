category = '';
function onCategoryChanged(selected) {
  category = selected;
  update(category)
  updateChart(category)
}
var svg = d3.select('.temperature');

var svgWidth = +svg.attr('width');
var svgHeight = +svg.attr('height');

var padding = {t: 50, r: 100, b: 50, l: 100};
var cellPadding = 10;

var chartG = svg.append('g')
    .attr('transform', 'translate(50,50)')
    .attr('class','lineChart');
var cellWidth = (svgWidth - padding.l - padding.r) / 2;
var cellHeight = (svgHeight - padding.t - padding.b) / 2;

var xScale = d3.scaleTime().range([0, svgWidth-100]);
var yScale = d3.scaleLinear().range([cellHeight - cellPadding, 0]);
var parseTime = d3.timeParse("%Y-%m-%e");
var formartTime = d3.timeFormat("%Y-%m-%e");
xAxis = xScale.domain([parseTime('2015-3-1'),parseTime('2015-6-30')]);
yAxis = yScale.domain([0,10]);

var xAxis = d3.axisBottom(xScale)
    chartG.append('g').attr('class','x axis').call(xAxis).attr('transform', function(){
        return 'translate(0,'+ cellHeight + ')';
    }).selectAll("text")
    .style("text-anchor", "end")
var yAxis = d3.axisLeft(yScale)
    chartG.append('g').attr('class','y axis').call(yAxis)


var svg = d3.select("#vis")
    .select('svg')

d3.csv('KHOU.csv',rows).then(function(dataset) {
  hou = dataset
  linePlot(dataset)
});

d3.csv('KNYC.csv',rows).then(function(dataset) {
  nyc = dataset
});

d3.csv('CLT.csv',rows).then(function(dataset) {
  clt = dataset
});

d3.csv('CQT.csv',rows).then(function(dataset) {
  cqt = dataset
});

d3.csv('IND.csv',rows).then(function(dataset) {
  ind = dataset
});

d3.csv('JAX.csv',rows).then(function(dataset) {
  jax = dataset
});

d3.csv('MDW.csv',rows).then(function(dataset) {
  mdw = dataset
});
d3.csv('PHL.csv',rows).then(function(dataset) {
  phl = dataset
});

d3.csv('PHX.csv',rows).then(function(dataset) {
  phx = dataset
});
d3.csv('KSEA.csv',rows).then(function(dataset) {
  sea = dataset
});

function prepare(d) {
  d.id = d.id;
  d.date = parseDate(d.date);
  return d;
}

function updateChart(city) {
  var selectedCity = []
  if (city == 'Houston') {
    selectedCity = hou;
  } else if (city == 'New York') {
    selectedCity = nyc;
  } else if (city == 'Seattle') {
    selectedCity = sea;
  } else if (city == 'Charlotte') {
    selectedCity = clt;
  } else if (city == 'Los Angeles') {
    selectedCity = cqt;
  } else if (city == 'Indianapolis') {
  selectedCity = ind;
  } else if (city == 'Jacksonville') {
  selectedCity = jax;
  } else if (city == 'Chicago') {
  selectedCity = mdw;
  } else if (city == 'Philadelphia') {
  selectedCity = phl;
  } else if (city == 'Pheonix') {
  selectedCity = phx;
  }
  linePlot(selectedCity)
  
}

function linePlot(data) {
  chartG.select('.linearea').remove()
  d3.select('.countDays').remove()
  linearea = chartG.append('g').attr('class','linearea')

  //draw actual data
    var actualLine = d3.line()
    .x(function(d) { return xScale(parseTime(d.date)); })
    .y(function(d) { return yScale(d.actual_precipitation); })
    .curve(d3.curveCatmullRom.alpha(0.5));
    var averageLine = d3.line()
    .x(function(d) { return xScale(parseTime(d.date)); })
    .y(function(d) { return yScale(d.average_precipitation); })
    .curve(d3.curveCatmullRom.alpha(0.5));
    
  var recordLine = d3.line()
    .x(function(d) { return xScale(parseTime(d.date)); })
    .y(function(d) { return yScale(d.record_precipitation); })
    .curve(d3.curveCatmullRom.alpha(0.5));

  //Data join for paths
  linearea.append("path")
  .datum(data)
  
  .style("stroke", "darkblue")
  .attr("class", "actualLine")
  .attr("d", actualLine)


  //Data join for paths
  linearea.append("path")
  .datum(data)
  
  .style("stroke", "skyblue")
  .attr("class", "averageLine")
  .attr("d", averageLine)

  linearea.append("path")
  .datum(data)
  .style("fill", "none")
  .style("stroke", "blue")
  .attr("class", "recordLine")
  .attr("d", recordLine)
}
function actual(data) {
    chartG.select('.linearea').remove()
    d3.select('.countDays').remove()
    linearea = chartG.append('g').attr('class','linearea')
  
    //draw actual data
      var actualLine = d3.line()
      .x(function(d) { return xScale(parseTime(d.date)); })
      .y(function(d) { return yScale(d.actual_precipitation); })
      .curve(d3.curveCatmullRom.alpha(0.5));
      
    //Data join for paths
    linearea.append("path")
    .datum(data)
    
    .style("stroke", "darkblue")
    .attr("class", "actualLine")
    .attr("d", actualLine)
  
  
    //Data join for paths
    linearea.append("path")
    .datum(data)
    
    .style("stroke", "skyblue")
    .attr("class", "averageLine")
    .attr("d", averageLine)
  
    linearea.append("path")
    .datum(data)
    .style("fill", "none")
    .style("stroke", "blue")
    .attr("class", "recordLine")
    .attr("d", recordLine)
  }
function update(city) {
  var selectedCity = []
  if (city == 'Houston') {
    selectedCity = hou;
  } else if (city == 'New York') {
    selectedCity = nyc;
  } else if (city == 'Seattle') {
    selectedCity = sea;
  } else if (city == 'Charlotte') {
    selectedCity = clt;
  } else if (city == 'Los Angeles') {
    selectedCity = cqt;
  } else if (city == 'Indianapolis') {
  selectedCity = ind;
  } else if (city == 'Jacksonville') {
  selectedCity = jax;
  } else if (city == 'Chicago') {
  selectedCity = mdw;
  } else if (city == 'Philadelphia') {
  selectedCity = phl;
  } else if (city == 'Pheonix') {
  selectedCity = phx;
  }
  linePlot(newData)
}

function rows(row) {
  return {
      'date': row['date'],
      'actual_mean_temp': +row['actual_mean_temp'],
      'actual_min_temp': +row['actual_min_temp'],
      'actual_max_temp': +row['actual_max_temp'],
      'average_min_temp': +row['average_min_temp'],
      'average_max_temp': +row['average_max_temp'],
      'record_min_temp': +row['record_min_temp'],
      'record_max_temp': +row['record_max_temp'],
      'record_min_temp_year': +row['record_min_temp_year'],
      'record_max_temp_year': +row['record_max_temp_year'],
      'actual_precipitation': +row['actual_precipitation'],
      'average_precipitation': +row['average_precipitation'],
      'record_precipitation': +row['record_precipitation']
  };
}
// code on switching datasets from d3 graph gallery
var data1 = [
  {ser1: 0.3, ser2: 4},
  {ser1: 2, ser2: 16},
  {ser1: 3, ser2: 8}
];

var data2 = [
  {ser1: 1, ser2: 7},
  {ser1: 4, ser2: 1},
  {ser1: 6, ser2: 8}
];

// set the dimensions and margins of the graph
var margin = {top: 10, right: 30, bottom: 30, left: 50},
   width = 460 - margin.left - margin.right,
   height = 400 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#my_dataviz")
 .append("svg")
   .attr("width", width + margin.left + margin.right)
   .attr("height", height + margin.top + margin.bottom)
 .append("g")
   .attr("transform",
         "translate(" + margin.left + "," + margin.top + ")");

// Initialise a X axis:
var x = d3.scaleLinear().range([0,width]);
var xAxis = d3.axisBottom().scale(x);
svg.append("g")
 .attr("transform", "translate(0," + height + ")")
 .attr("class","myXaxis")

// Initialize an Y axis
var y = d3.scaleLinear().range([height, 0]);
var yAxis = d3.axisLeft().scale(y);
svg.append("g")
 .attr("class","myYaxis")

// Create a function that takes a dataset as input and update the plot:
function update(data) {

 // Create the X axis:
 x.domain([0, d3.max(data, function(d) { return d.ser1 }) ]);
 svg.selectAll(".myXaxis").transition()
   .duration(3000)
   .call(xAxis);

 // create the Y axis
 y.domain([0, d3.max(data, function(d) { return d.ser2  }) ]);
 svg.selectAll(".myYaxis")
   .transition()
   .duration(3000)
   .call(yAxis);

 // Create a update selection: bind to the new data
 var u = svg.selectAll(".lineTest")
   .data([data], function(d){ return d.ser1 });

 // Updata the line
 u
   .enter()
   .append("path")
   .attr("class","lineTest")
   .merge(u)
   .transition()
   .duration(3000)
   .attr("d", d3.line()
     .x(function(d) { return x(d.ser1); })
     .y(function(d) { return y(d.ser2); }))
     .attr("fill", "none")
     .attr("stroke", "steelblue")
     .attr("stroke-width", 2.5)
}
// At the beginning, I run the update function on the first dataset:
update(data1)
