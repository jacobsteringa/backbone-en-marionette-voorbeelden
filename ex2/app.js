var EmployeeListView = Backbone.View.extend({
    tagName: 'ul',

    template: _.template($('#employee-list-template').html()),

    render: function() {
        this.$el.html(this.template({
            employees: this.collection.toJSON()
        }));

        return this;
    }
});

var employees = new EmployeeCollection(fixtures['employees']);

var employeesListView = new EmployeeListView({
    collection: employees
});

$('#app').html(employeesListView.render().el);
