Meteor.methods({
  'Items.insert': function (params) {
    Items.insert(params);
  },
  'parseUpload': function (data) {
	    check( data, Array );
    for ( i = 0; i < data.length; i++ ) {
		 row   = data[ i ]; 
		//console.log(row);
		Payslip.insert( row );
	}
  },
  'remove': function () {
	  console.log("remove");
    Payslip.remove({});
  },
});
