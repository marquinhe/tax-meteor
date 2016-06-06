
Template.home.created = function() {
	Template.instance().uploading = new ReactiveVar( false );
};


Template.home.helpers({ 
    uploading :  function () {
                    return Template.instance().uploading.get();
                }
});


Template.home.events({
  'change [name="uploadCSV"]': function( event, template ) {
    event.preventDefault();
    console.log('Start payslip');
    template.uploading.set( true );

    Papa.parse( event.target.files[0], {
      header: false,
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