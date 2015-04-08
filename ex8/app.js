var EmployeeRowView = Marionette.ItemView.extend({
    tagName: 'tr',

    template: '#employee-row-template',

    modelEvents: {
        'change': 'render'
    },

    ui: {
        removeButton: 'button[data-action="remove"]'
    },

    events: {
        'click @ui.removeButton': 'onClickRemove'
    },

    onClickRemove: function(e) {
        this.model.destroy();
    }
});

var EmployeeListView = Marionette.CompositeView.extend({
    tagName: 'table',

    template: '#employee-list-template',

    childView: EmployeeRowView, // voorheen itemView

    childViewContainer: 'tbody'
});

var EmployeeFormView = Marionette.ItemView.extend({
    tagName: 'form',

    template: '#employee-form-template',

    ui: {
        firstNameField: 'input[name="firstName"]',
        lastNameField: 'input[name="lastName"]'
    },

    events: {
        'submit': 'onSubmit'
    },

    onSubmit: function(e) {
        e.preventDefault();

        var firstName = this.ui.firstNameField.val();
        var lastName = this.ui.lastNameField.val();

        this.ui.firstNameField.val('');
        this.ui.lastNameField.val('');

        this.ui.firstNameField.focus();

        this.trigger('submit', {
            firstName: firstName,
            lastName: lastName
        });

        return false;
    }
});

var AppLayout = Marionette.LayoutView.extend({
    el: '#app',

    regions: {
        form: 'div[data-region="form"]',
        list: 'div[data-region="list"]'
    }
});

var employees = new EmployeeCollection(
    _.map(fixtures['employees'], function(employee) {
        return _.omit(employee, 'id');
    })
);

var layout = new AppLayout();

var employeeFormView = new EmployeeFormView();

employeeFormView.on('submit', function(employee) {
    employees.add(employee);
});

var employeeListView = new EmployeeListView({
    collection: employees
});

layout.getRegion('form').show(employeeFormView);
layout.getRegion('list').show(employeeListView);
