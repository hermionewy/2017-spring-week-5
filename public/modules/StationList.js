function StationList(){
	var _dispatch = d3.dispatch('update');

	var exports = function(selection){
		var arr = selection.datum();

		var menuItem = selection.selectAll('li')
			.data(arr,function(d){return d.id});
		menuItem.enter().append('li')
			.append('a')
			.attr('href','#')
			.html(function(d){
				return d.name;
			})
			.on('click',function(d){
				d3.event.preventDefault();
				console.log('StationList:select:'+d.id);
				_dispatch.call('update',this,d.id);
			});
		menuItem.exit().remove();

		selection.insert('li','li')
			.datum(null)
			.append('a')
			.attr('href','#')
			.html('All stations')
			.on('click',function(d){
				d3.event.preventDefault();
				_dispatch.call('update',this,null);
			});
	}

	exports.on = function(){
		_dispatch.on.apply(_dispatch,arguments);
		return this;
	}

	return exports;
}