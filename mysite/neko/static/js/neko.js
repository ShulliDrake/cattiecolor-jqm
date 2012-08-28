//
NK = {}; //Neko namespace

NK.models = {}; // Backbone models
NK.views = {}; // Backbone views


$(function(){

    var tabs = new NK.views.tabs({
        el: $('.colors'),
        model: new NK.models.tabsModel
    });

    var cats = new NK.views.catPhoto({
        el: $('.cat'),
        model: new NK.models.tabsModel
    });

}); //document ready


NK.models.tabsModel = Backbone.Model.extend({

    defaults: {
        currentTab: 'tab1',  // tab1 or tab2
        currentCat: null
    },

    initialize: function() {
    },

    setCurrentTab: function(id) {
        this.set('currentTab', id);
    },

    setCat: function(catNum) {
        this.set('currentCat', catNum)
    }

});

NK.views.catPhoto = Backbone.View.extend({

    events: {
        'click .dropdown-menu li': 'switchPhoto'
    },

    initialize: function() {
        this.model.bind('change:currentCat', this.render, this);
    },

    render: function() {
        // remove all classes and add new class to a photo container
        this.$('#catphoto span').removeClass();
        this.$('#catphoto span').addClass(this.model.get('currentCat'));
    },

    switchPhoto: function(e) {
        e.preventDefault();
        //dropdown menu clicked, switch cat photo
        if (e && e.target) {
            var catNum = $(e.target).attr('href');
            catNum = catNum.substring(1);
            this.model.setCat(catNum);
        }
    }

});

NK.views.tabs = Backbone.View.extend({

    events: {
        'click .tabs li': 'switchTab'
    },

    initialize: function() {
        this.model.bind('change:currentTab', this.switchTabContent, this);

        var colorTable = new NK.views.ColorTable({
            el: $('.tabcontent'),
            model: new NK.models.colorModel
        });
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
        $('#catphoto span').css('background-color', this.model.get('previewColor'));
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
        $('#catphoto span').css('background-color', this.model.get('currentColor'));
    }

});
