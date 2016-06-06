Meteor.methods({
  'Items.insert': function (params) {
    Items.insert(params);
  },
  'parseUpload': function (data) {
	    check( data, Array );
    for ( i = 0; i < data.length; i++ ) {
		 item   = data[ i ]; 
		console.log(item);
	}
  }
});
