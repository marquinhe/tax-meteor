var optionsObject = {
	paging:   false,
	info: false,
    columns: [{
        title: 'Name',
		 data: 'name'
    }, {
        title: 'Gross Monthly Income',
		data: 'monthly-salary',
		
    }, {
	    title: 'Income Tax',
		data: 'super-rate',
		
	}, {
	    title: 'Net Income',
		data: 'super-rate',
	}, {
		title: 'Super',
		data: 'super-rate',
		}, {
	    title: 'Period',
	    data: 'super-rate',
	}
]
};


Template.home.created = function() {
	Template.instance().uploading = new ReactiveVar( false );
	this.subscribe('payslip');
};


dataTableData = function () {
    return Payslip.find().fetch(); // or .map()
};

Template.home.helpers({ 
    uploading :  function () {
                    return Template.instance().uploading.get();
                },
    reactiveDataFunction: function () {
        return dataTableData;
    },
	optionsObject: function () {
        return optionsObject;
    }, 
	noData: function() {
		return Payslip.find().fetch().length == 0; 
	}
});


Template.home.events({
  'change [name="uploadCSV"]': function( event, template ) {
    event.preventDefault();
    console.log('Start payslip');
    template.uploading.set( true );

    Papa.parse( event.target.files[0], {
      header: true,
      complete: function( results, file ) {
  		Meteor.call('parseUpload', results.data, function (error, response) {
               if ( error ) {
                 console.log( error.reason );
               } else {
                 template.uploading.set( false );
                 Bert.alert( 'Upload complete!', 'success', 'growl-top-right' );
               }
  		    });
      }
    });
	
	
  },
  
  'click .login': function() {
    Meteor.loginWithTwitter();
  }
});