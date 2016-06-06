HomeController = AppController.extend({
    waitOn: function() {
      return this.subscribe('payslip');
    },
    data: {
      Payslip: Payslip.find({})
    },
    onAfterAction: function () {
      Meta.setTitle('Calculate');
    }
});
