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
    },

    remove: function() {
        _.each(this._rows, function(row) {
            row.remove();
        });

        this.$el.remove();
        this.stopListening();

        return this;
    }
});

var EmployeeDetailView = Backbone.View.extend({
    tagName: 'table',

    template: _.template($('#employee-detail-template').html()),

    render: function() {
        this.$el.html(this.template(this.model.toJSON()));

        return this;
    }
});

var AppRouter = Backbone.Router.extend({
    routes: {
        '': 'employeeList',
        ':id': 'employeeDetail'
    },

    initialize: function(options) {
        this.$container = options.container;
        this.employees = options.employees;
        this._currentView = null;
    },

    employeeList: function() {
        var employeeListView = new EmployeeListView({
            collection: this.employees
        });

        this._showView(employeeListView);
    },

    employeeDetail: function(id) {
        var employee = this.employees.findWhere({
            id: parseInt(id)
        });

        var employeeDetailView = new EmployeeDetailView({
            model: employee
        });

        this._showView(employeeDetailView);
    },

    _showView: function(view) {
        // als er al een view is, dan moeten we deze eerst verwijderen
        if (this._currentView) {
            this._currentView.remove();
        }

        this._currentView = view;

        this.$container.html(view.render().el);
    }
})

var employees = new EmployeeCollection(fixtures['employees']);

var router = new AppRouter({
    container: $('#app'),
    employees: employees
});

Backbone.history.start();
