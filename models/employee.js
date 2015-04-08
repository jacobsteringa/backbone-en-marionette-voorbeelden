var Employee = Backbone.Model.extend({
    defaults: {
        firstName: '',
        lastName: '',
        occupation: ''
    }
});

var EmployeeCollection = Backbone.Collection.extend({
    model: Employee,
    url: '/employees'
});
