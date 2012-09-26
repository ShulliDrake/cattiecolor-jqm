//
NK = {}; //Neko namespace

NK.models = {}; // Backbone models
NK.views = {}; // Backbone views


$(function(){

    $('.carousel').carousel('pause');
    var colors = new NK.views.colorTable({
        el: $('.colors'),
        model: new NK.models.tabsModel
    });

    /* Cat selector drop-down is disabled for now.
    var cats = new NK.views.catPhoto({
        el: $('.cat'),
        model: new NK.models.tabsModel
    });
    */
}); //document ready


NK.models.tabsModel = Backbone.Model.extend({

    defaults: {
        currentTab: 'shirt',  // shirt or tie
        currentCat: null,
        shirtColor: '#000',
        shirtColorName: 'Black',
        tieColor: '#fff',
        tieColorName: 'White',
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

    setColor: function(newColor, newColorName) {
        // TODO
        if (this.get('currentTab') == 'shirt') {
            this.set('shirtColor', newColor);
            this.set('shirtColorName', newColorName);
        } else {
            this.set('tieColor', newColor);
            this.set('tieColorName', newColorName);
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
        'click .tabcontent li span': 'setCurrentColor',
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

    // shirt color is clicked
    updateShirtColor: function() {
        var newColor = this.model.get('shirtColor');
        var bgSelector = this.model.get('catSelector');
        $(bgSelector.shirt, '.color_label').text(this.model.get('previewColorName'));


        $('.cat_bg').css('background', '-webkit-gradient(linear, 50% 0%, 50% 100%, from(#ffffff), to('+ newColor +'))');
        $('.cat_bg').css('background-color', newColor); //fallback
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
        $(bgSelector[currentTab], '.cat .color_label').text(this.model.get('previewColorName'));

        if (currentTab == 'tie') {
            // change tie color
            $('#tie_block .tie_top, #tie_block .tie_bottom').css('border-color', this.model.get('previewColor') + ' transparent transparent transparent')
            $('#tie_block .tie_center').css('border-color', 'transparent transparent ' + this.model.get('previewColor') + ' transparent')
        } else {
            $('.cat_bg').css('background', '-webkit-gradient(linear, 50% 0%, 50% 100%, from(#ffffff), to('+ this.model.get('previewColor') +'))');
            $('.cat_bg').css('background-color', this.model.get('previewColor')); //fallback
        }
    },

    // event handlers
    setCurrentColor: function(e) {
        if (e && e.target) {

//            if (!e.target.id) {
//                e.target = e.target.parentNode;
//            }
//            if (e.target.id) {
                // TODO - both shirt and tie may pick same color
                var currentTab = this.model.get('currentTab');
                this.$('.tabcontent .' + currentTab).parent().removeClass('selected');
                this.$('.tabcontent .' + currentTab).removeClass(currentTab);
                $(e.target).parent('li').addClass('selected');;
                $(e.target).addClass(currentTab);
                this.model.setColor(e.target.parentNode.id, $(e.target.parentNode).data('name'));
//            }
        }
    },

    changeColor: function(e) {
        if (e && e.target) {
            if (!e.target.id) {
                e.target = e.target.parentNode;
            }
            if (e.target.id) {
                this.model.setPreviewColor(e.target.id, $(e.target).data('name'));
            }
        }
    },

    resetColor: function() {
        // mouseleave tabcontent
        //TODO
        var bgSelector = this.model.get('catSelector');

//TODO: update color label
        $(bgSelector.shirt, '.color_label').text(this.model.get('shirtColorName'));
        $(bgSelector.tie, '.color_label').text(this.model.get('tieColorName'));

        // reset shirt color
        $('.cat_bg').css('background', '-webkit-gradient(linear, 50% 0%, 50% 100%, from(#ffffff), to('+ this.model.get('shirtColor') +'))');
        $('.cat_bg').css('background-color', this.model.get('shirtColor')); //fallback

        // reset tie color
        $('#tie_block .tie_top, #tie_block .tie_bottom').css('border-color', this.model.get('tieColor') + ' transparent transparent')
        $('#tie_block .tie_center').css('border-color', 'transparent transparent ' + this.model.get('tieColor') + ' transparent')
    }

});

/* Cat selector drop-down is currently disabled.
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
*/