var HomeView = Backbone.View.extend({
    el: $("#appPage"),
    template: function(data) {
        var tpl_page = Handlebars.compile(loadTemplate("home.tpl"));
        return tpl_page(data);
    },
    events: {
        "click #goDetails": "goDet"
    },
    render: function () {
        this.$el.html(this.template(null));

        return this;
    },
    goDet: function() {
        appGQM.navigate("!/detailsActivity", {trigger: true});
        return false;
    }

});
