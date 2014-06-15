var Views = {
    homeView: new HomeView(),
    detailsView: new DetailsView()
};

var Router = Backbone.Router.extend({
    routes: {
        "": "homeActivity",
        "!/": "homeActivity",
        "!/homeActivity": "homeActivity",
        "!/detailsActivity": "detailsActivity"
    },
    homeActivity: function () {
        if (Views.homeView != null) {
            Views.homeView.render();
        }
    },
    detailsActivity: function () {
        if (Views.detailsView != null) {
            Views.detailsView.render();
        }
    }
});
