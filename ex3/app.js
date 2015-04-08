var EmployeeRowView = Backbone.View.extend({
    tagName: 'li',

    template: _.template($('#employee-row-template').html()),

    initialize: function(options) {
        this.listenTo(this.model, 'change', this.render);
    },

    render: function() {
        this.$el.html(this.template(this.model.toJSON()));

        return this;
    }
});

var EmployeeListView = Backbone.View.extend({
    tagName: 'ul',

    initialize: function(options) {
        this._rows = {};

        this.listenTo(this.collection, 'reset', this.render);
    },

    render: function() {
        var _this = this;

        this.collection.each(function(employee) {
            _this.addRow(employee);
        });

        return this;
    },

    addRow: function(employee) {
        var employeeView = new EmployeeRowView({
            model: employee
        });

        this._rows[employee.cid] = employeeView;

        this.$el.append(employeeView.render().el);
    }
});

var employees = new EmployeeCollection(fixtures['employees']);

var employeeListView = new EmployeeListView({
    collection: employees
});

$('#app').html(employeeListView.render().el);
