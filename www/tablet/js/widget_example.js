
// widget implementation starts here
// change 'Modul_example' to 'Modul_mywidgetname', 'depends_example' to 'depends_mywidgetname'
// and 'widgetname:"example",' to 'widgetname:"mywidgetname",'
// usage: <div data-type="example" data-device="dummy1" data-get="volume"></div>

function depends_example (){
    var deps = [];
    /* e.g.
    if (!$.fn.datetimepicker){
        $('head').append('<link rel="stylesheet" href="'+ ftui.config.dir + '/../lib/jquery.datetimepicker.css" type="text/css" />');
        deps.push("lib/jquery.datetimepicker.js");
    }
    if(typeof Module_label == 'undefined'){
        deps.push('label');
    }
    */
    return deps;
};

var Modul_example = function () {

    // privat sub function
    function doSomething (elem) {

        if (elem.hasClass('colorfull')){
            elem.css({
                backgroundColor: '#aa44ff',
            });
        }
    };

    // mandatory function, get called on start up
    function init () {
        var me = this;
        this.elements = $('div[data-type="'+this.widgetname+'"]',this.area);
        this.elements.each(function(index) {

            var elem = $(this);
            elem.initData('get'  ,'STATE');
            elem.initData('color' ,'#aa6633');

            // subscripe my readings for updating
            me.addReading(elem,'get');
            me.addReading(elem,'color');

            // call sub function for each instance of this widget
            doSomething(elem);
        });
    };

    // mandatory function, get called after start up once and on every FHEM poll response
    // here the widget get updated
    function update (dev,par) {
        // do updates from reading for content
        this.elements.filterDeviceReading('get',dev,par)
        .each(function(index) {
            var elem = $(this);
            var value = elem.getReading('get').val;
            if (value){
                elem.html(value);
            }
        });

        // do updates from reading for color
        this.elements.filterDeviceReading('color',dev,par)
        .each(function(idx) {
            var elem = $(this);
            var val = elem.getReading('color').val;
            if(val) {
                val = '#'+val.replace('#','');
                elem.css( "color", val );
            }
        });
    };

    // public
    // inherit all public members from base class
    return $.extend(new Modul_widget(), {
        //override or own public members
        widgetname: 'example',
        init: init,
        update: update,
    });
};
