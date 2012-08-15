//
NK = {}; //Neko namespace

NK.models = {}; // Backbone models
NK.views = {}; // Backbone views


$(function(){

    var tabs = new NK.views.tabs({
        el: $('.colors'),
        model: new NK.models.tabsModel
    });

}); //document ready


NK.models.tabsModel = Backbone.Model.extend({

    defaults: {
        currentTab: 'tab1'
    },

    initialize: function() {
    },

    setCurrentTab: function(id) {
        this.set('currentTab', id);
    }

});


NK.views.tabs = Backbone.View.extend({

    events: {
        'click .tabs li': 'switchTab'
    },

    initialize: function() {
        this.model.bind('change:currentTab', this.switchTabContent, this);

        var tabsArray = ['shirt', 'tie'];

        for (var i = 0; i < tabsArray.length; i++){
            var colorTable = new NK.views.ColorTable({
		el: $('#tab'+i+'content'),
                model: new NK.models.colorModel
            });
        }
    },

    switchTab: function(e) {
        if (e && e.target) {
            $(e.target).addClass('current');
            $(e.target).siblings().removeClass('current');

            this.model.setCurrentTab(e.target.id);
        }
    },

    switchTabContent: function() {
        /*** TODO ***/
        var tabId = this.model.get('currentTab');
        $('#tab1content').toggleClass('current');
        $('#tab2content').toggleClass('current');
    }

});


NK.models.colorModel = Backbone.Model.extend({

    defaults:{
        currentColor: '#fff',
        previewColor: '#fff'
    },

    setColor: function(newColor) {
        this.set('currentColor', newColor);
    },

    setPreviewColor: function(previewColor, previewColorName) {
        this.set('previewColor', previewColor);
        this.set('previewColorName', previewColorName);
    }

});

NK.views.ColorTable = Backbone.View.extend({

    events: {
        'click': 'updateCurrentColor',
        'mouseover': 'changeColor',
        'mouseleave': 'resetColor'
    },

    initialize: function(){
        this.model.bind('change:previewColor', this.updateColor, this);
    },

    updateColor: function() {
        //TODO
        $('#catphoto').css('background-color', this.model.get('previewColor'));
        $('.cat .color_label').html(this.model.get('previewColorName'));
    },

    // event handlers
    updateCurrentColor: function(e) {
        if (e && e.target) this.model.setColor(e.target.id);
    },

    changeColor: function(e) {
        if (e && e.target) this.model.setPreviewColor(e.target.id, $(e.target).text());
    },

    resetColor: function() {
        //TODO
        $('#catphoto').css('background-color', this.model.get('currentColor'));
    }

});
