var optionsObject = {
	paging:   false,
	info: false,
    columns: [{
        title: 'Name',
		 data: 'name'
    }, {
        title: 'Gross Annual',
		data: 'annual',
		
    }, {
        title: 'Gross Income',
		data: 'gross',
		
    }, {
	    title: 'Income Tax',
		data: 'incomeTax',
		
	}, {
	    title: 'Net Income',
		data: 'net',
	}, {
		title: 'Super',
		data: 'super',
		}, {
	    title: 'Period',
	    data: 'period',
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
      header: false,
	  meta: {
		  fields: ["Column 1", "Column 2", "Column 3", "Column 4", "Column 5"]
	  },	
      complete: function( results, file ) {
  		Meteor.call('parseUpload', results.data, function (error, response) {
               if ( error ) {
                 console.log( error.reason );
				  sAlert.error('Error:' + error.message);
               } else {
                 template.uploading.set( false );
				 sAlert.success('Upload complete!');
               }
  		    });
      }
    });
	
	
  },
  
  'click .login': function() {
    Meteor.loginWithTwitter();
  }, 
  'click .again': function(){
	  Meteor.call('remove');
  }
});