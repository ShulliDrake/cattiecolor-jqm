//
NK = {}; //Neko namespace

NK.models = {}; // Backbone models
NK.views = {}; // Backbone views


$(function(){

    var colors = new NK.views.colorTable({
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
        currentCat: null,
        currentColor: '#fff',
        currentTieColor: '#fff',
        previewColor: '#fff',
        previewColorName: ''
    },

    setCurrentTab: function(id) {
        this.set('currentTab', id);
    },

    setCat: function(catNum) {
        this.set('currentCat', catNum)
    },

    setColor: function(newColor) {
        // TODO
        if (this.get('currentTab') == 'tab1') {
            this.set('currentColor', newColor);
        } else {
            this.set('currentTieColor', newColor);
        }
    },

    setPreviewColor: function(previewColor, previewColorName) {
        this.set('previewColor', previewColor);
        this.set('previewColorName', previewColorName);
        this.trigger('ColorChanged');
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


NK.views.colorTable = Backbone.View.extend({

    events: {
        'click .tabs li': 'switchTab',
        'click .tabcontent li': 'updateCurrentColor',
        'mouseover .tabcontent li': 'changeColor',
        'mouseleave .tabcontent': 'resetColor'
    },

    initialize: function(){
        this.model.bind('ColorChanged', this.updateColor, this);
    },

    switchTab: function(e) {
        if (e && e.target) {
            $(e.target).addClass('current');
            $(e.target).siblings().removeClass('current');
            this.model.setCurrentTab(e.target.id);
        }
    },

    updateColor: function() {
        //TODO
        $('#catphoto span').css('background-color', this.model.get('previewColor'));
        $('.cat .color_label').html(this.model.get('previewColorName'));
    },

    // event handlers
    updateCurrentColor: function(e) {
        if (e && e.target) {

            if (!e.target.id) {
                e.target = e.target.parentNode;
            }
            if (e.target.id) {
                var currentTab = this.model.get('currentTab');
                this.$('.tabcontent .' + currentTab).removeClass();
                $(e.target).addClass('selected ' + currentTab);
                this.model.setColor(e.target.id);
            }
        }
    },

    changeColor: function(e) {
        if (e && e.target) {
            if (!e.target.id) {
                e.target = e.target.parentNode;
            }
            if (e.target.id) {
                this.model.setPreviewColor(e.target.id, $(e.target).text());
            }
        }
    },

    resetColor: function() {
        // mouseleave tabcontent
        //TODO
        $('#catphoto span').css('background-color', this.model.get('currentColor'));
        $('.cat .color_label').html('');
    }

});
