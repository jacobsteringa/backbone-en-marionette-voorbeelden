var EmployeeRowView = Marionette.ItemView.extend({
    tagName: 'li',
    template: '#employee-row-template',

    modelEvents: {
        'change': 'render'
    }
});

var EmployeeListView = Marionette.CollectionView.extend({
    tagName: 'ul',

    childView: EmployeeRowView // voorheen itemView
});

var employees = new EmployeeCollection(fixtures['employees']);

var employeeListView = new EmployeeListView({
    collection: employees
});

$('#app').html(employeeListView.render().el);
