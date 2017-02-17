function stationList(){
  var exports= function(menu){
    var stations = menu.datum();
    var menuItems = menu.selectAll('.item')
        .data(stations);
    menuItems.enter().append('li').attr('class','item')
      .append('a')
      .attr('href','#')
      .html(function(d){return d.name})
      .on('click',function(d){
        console.log(d.id);


      });

    exports.on = function(type, callback){
      return this;
    }
  }
}
