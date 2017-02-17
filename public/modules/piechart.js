function piechart(){
  var _innerRadius,_outerRadius,
  _m={t:50, l:50, r:50, b:50},
  _h,_w;

  var _accessor = function(d){return d.userType};
  var exports = function(selection){
    _w =_w || selection.node().clientWidth-_m.l-_m.r;
    _h = _h || selection.node().clientHeight-_m.t-_m.b;
    _outerRadius = Math.min(_w, _h)/2;
    	var colorRam = ['red','yellow','blue','gray'];

    var arr=selection.datum() || [];
    var nestedArr =d3.nest()
        .key(function(d){return d.userType})
        .rollup(function(d){return d.length})
        .entries(arr);
    console.log('Piechart:');
    console.log(arr);

    var pie=d3.pie()
        .value(function(d){return d.value});

    var pieData = pie(nestedArr);
    console.log(pieData);

    var arc = d3.arc()
        .innerRadius(_innerRadius)
        .outerRadius(_outerRadius);

    var svg = selection.selectAll('svg')
        .data([1]);
    var svgEnter = svg.enter()
        .append('svg')
        .attr('width', _w+_m.l+_m.r)
        .attr('height',_h+_m.t+_m.b);
    var chartEnter = svgEnter.append('g').attr('class','pie-chart')
        .attr('transform','translate('+(_m.l+_w/2)+','+(_m.t+_h/2) +')');

    var slices = svgEnter.merge(svg).select('.pie-chart')
        .selectAll('.slice')
        .data(pieData);

    var slicesEnter= slices.enter()
        .append('g').attr('class','slice');

        slicesEnter.append('path');
        slicesEnter.append('text');
        slicesEnter.append('line');

    slicesEnter.merge(slices).select('path')
        .transition()
        .attr('d',arc)
        .fill('');

    slicesEnter.merge(slices).select('text')
        .text(function(d){return d.data.key})
        .attr('transform',function(d){
          var angle = (d.startAngle+d.endAngle)*180/Math.PI/2 - 90;
          return 'rotate('+angle+')translate('+(_outerRadius+20)+')';
        });

    slicesEnter.merge(slices).select('line')
        .attr('x1',(_innerRadius+_outerRadius)/2)
        .attr('x2',(_outerRadius+10))
        .attr('transform',function(d){
          var angle = (d.startAngle+d.endAngle)*180/Math.PI/2 - 90;
          return 'rotate('+angle+')translate('+(_outerRadius+20)+')';
        }
        .style('stroke','black');

      exports.value = function(_){
        if(!arguments.length) return _accessor;  // arr of invoke function
        _accessor = _;
        return this;
      }

  }
  return exports;
}
