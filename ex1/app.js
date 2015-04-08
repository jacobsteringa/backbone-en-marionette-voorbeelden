var Person = Backbone.Model.extend({
    defaults: {
        name: 'John Doe'
    }
});

var PersonView = Backbone.View.extend({
    className: 'person',

    template: _.template($('#person-template').html()),

    initialize: function() {
        this.listenTo(this.model, 'change', this.render);
    },

    render: function() {
        this.$el.html(
            this.template(
                this.model.toJSON()));

        return this;
    }
});

var FormView = Backbone.View.extend({
    className: 'form',

    template: _.template($('#form-template').html()),

    events: {
        'change input[name="name"]': 'onInputName'
    },

    render: function() {
        this.$el.html(this.template());

        return this;
    },

    onInputName: function(e) {
        this.model.set('name', this.$('input[name="name"]').val());
    }
});

var person = new Person();

var personView = new PersonView({
    model: person
});

var formView = new FormView({
    model: person
});

$('#app').append(personView.render().el);
$('#app').append(formView.render().el);
