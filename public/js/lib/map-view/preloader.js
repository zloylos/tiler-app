modules.define('map-view-preloader', [
    'inherit',
    'jquery',
    'ymaps',
    'ymaps-map',
    'ymaps-control-centered',
    'ymaps-layout-preloader'
], function (provide, inherit, jQuery, ymaps, map, centeredControl, PreloaderLayout) {

    var PreloaderMapView = inherit({
        __constructor: function () {
            this.events = jQuery({});
        },
        render: function (data) {
            this._control = this._getTunedControl(data);
            this.show();
            return this;
        },
        clear: function () {
            this.hide();
            return this;
        },
        show: function () {
            this._control.options.set('visible', true);

            return this;
        },
        hide: function () {
            this._control.options.set('visible', false);

            return this;
        },
        _getTunedControl: function (data, options) {
            data = data || {},
            options = options || {};

            centeredControl.data.set(data);
            centeredControl.options
                .set(options)
                .set('contentBodyLayout', PreloaderLayout);

            return centeredControl;
        },
    });

    provide(PreloaderMapView);
});
