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
        currentTab: 'shirt',  // shirt or tie
        currentCat: null,
        shirtColor: '#fff',
        tieColor: '#fff',
        previewColor: '#fff',
        previewColorName: '',
        catSelector: {
            shirt:'.shirt',  //selector
            tie:'.tie'  //selector
        }
    },

    setCurrentTab: function(id) {
        this.set('currentTab', id);
    },

    setCat: function(catNum) {
        this.set('currentCat', catNum)
    },

    setColor: function(newColor) {
        // TODO
        if (this.get('currentTab') == 'shirt') {
            this.set('shirtColor', newColor);
        } else {
            this.set('tieColor', newColor);
        }
    },

    setPreviewColor: function(previewColor, previewColorName) {
        this.set('previewColor', previewColor);
        this.set('previewColorName', previewColorName);
        this.trigger('ColorChanged');
    }

});

NK.views.colorTable = Backbone.View.extend({

    events: {
        'click .tabs li': 'switchTab',
        'click .tabcontent li': 'setCurrentColor',
        'mouseover .tabcontent li': 'changeColor',
        'mouseleave .tabcontent': 'resetColor'
    },

    initialize: function(){
        this.model.bind('ColorChanged', this.updatePreviewColor, this);
        this.model.bind('change:shirtColor', this.updateShirtColor, this);
        this.model.bind('change:tieColor', this.updateTieColor, this);
    },

    switchTab: function(e) {
        if (e && e.target) {
            $(e.target).addClass('current');
            $(e.target).siblings().removeClass('current');
            this.model.setCurrentTab(e.target.id);
        }
    },

    updateShirtColor: function() {
        var newColor = this.model.get('shirtColor');
        var bgSelector = this.model.get('catSelector');
        $(bgSelector.shirt, '#catphoto').css('background-color', newColor);
        $(bgSelector.shirt, '.color_label').text(this.model.get('previewColorName'));
    },

    updateTieColor: function() {
        var newColor = this.model.get('tieColor');
        // update tie color
        $('#tie_block .tie_top, #tie_block .tie_bottom').css('border-color', newColor + ' transparent transparent')
        $('#tie_block .tie_center').css('border-color', 'transparent transparent ' + newColor + ' transparent')

    },

    updatePreviewColor: function() {
        var currentTab = this.model.get('currentTab');
        var bgSelector = this.model.get('catSelector');

        //TODO
        $(bgSelector[currentTab], '#catphoto').css('background-color', this.model.get('previewColor'));
        $(bgSelector[currentTab], '.cat .color_label').html(this.model.get('previewColorName'));

        if (currentTab == 'tie') {
            // change tie color
            $('#tie_block .tie_top, #tie_block .tie_bottom').css('border-color', this.model.get('previewColor') + ' transparent transparent transparent')
            $('#tie_block .tie_center').css('border-color', 'transparent transparent ' + this.model.get('previewColor') + ' transparent')
        }
    },

    // event handlers
    setCurrentColor: function(e) {
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
        var bgSelector = this.model.get('catSelector');

        $('#catphoto span.shirt').css('background-color', this.model.get('shirtColor'));
//        $(bgSelector.shirt, '.color_label').html('');
//        $(bgSelector.shirt, '.color_label').html(this.model.get('previewColorName'));
//        $(bgSelector.tie, '.color_label').html('');
        // reset tie color
        $('#tie_block .tie_top, #tie_block .tie_bottom').css('border-color', this.model.get('tieColor') + ' transparent transparent')
        $('#tie_block .tie_center').css('border-color', 'transparent transparent ' + this.model.get('tieColor') + ' transparent')
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
        this.$('#catphoto span.shirt').removeClass(this.model.previous('currentCat'));
        this.$('#catphoto span.shirt').addClass(this.model.get('currentCat'));
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
