var EmployeeRowView = Backbone.View.extend({
    tagName: 'tr',

    template: _.template($('#employee-row-template').html()),

    events: {
        'click [data-action="remove"]': 'onClickRemove'
    },

    initialize: function(options) {
        this.listenTo(this.model, 'change', this.render);
    },

    render: function() {
        this.$el.html(this.template(this.model.toJSON()));

        return this;
    },

    onClickRemove: function(e) {
        this.model.destroy();
    }
});

var EmployeeListView = Backbone.View.extend({
    tagName: 'table',

    template: _.template($('#employee-list-template').html()),

    initialize: function(options) {
        this._rows = {};

        this.listenTo(this.collection, 'add', this.addRow);
        this.listenTo(this.collection, 'remove', this.removeRow);
        this.listenTo(this.collection, 'reset', this.render);
    },

    render: function() {
        var _this = this;

        this.$el.html(this.template());

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

        this.$('tbody').append(employeeView.render().el);
    },

    removeRow: function(employee) {
        var employeeView = this._rows[employee.cid];

        employeeView.remove();
    }
});

var EmployeeFormView = Backbone.View.extend({
    tagName: 'form',

    template: _.template($('#employee-form-template').html()),

    events: {
        'submit': 'onSubmit'
    },

    render: function() {
        this.$el.html(this.template());

        return this;
    },

    onSubmit: function(e) {
        e.preventDefault(); // browser submit voorkomen

        // referentie naar velden opslaan
        var $firstNameField = this.$('input[name="firstName"]');
        var $lastNameField = this.$('input[name="lastName"]');

        var firstName = $firstNameField.val();
        var lastName = $lastNameField.val();

        this.collection.add({
            firstName: firstName,
            lastName: lastName
        });

        // velden leegmaken
        $firstNameField.val('');
        $lastNameField.val('');

        $firstNameField.focus();

        return false;
    }
});

var employees = new EmployeeCollection(
    _.map(fixtures['employees'], function(employee) {
        return _.omit(employee, 'id');
    })
);

var employeeFormView = new EmployeeFormView({
    collection: employees
});

var employeeListView = new EmployeeListView({
    collection: employees
});

$('#app').append(employeeFormView.render().el);
$('#app').append(employeeListView.render().el);
