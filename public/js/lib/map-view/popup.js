modules.define('map-view-popup', [
    'inherit',
    'jquery',
    'ymaps',
    'ymaps-map',
    'ymaps-control-centered',
    'ymaps-layout-popup'
], function (provide, inherit, jQuery, ymaps, map, centeredControl, PopupLayout) {

    var PopupMapView = inherit({
        __constructor: function () {
            this.events = jQuery({});
            this._timeoutId == null;
            this._data = null;
        },
        render: function (data) {
            this._control = this._getTunedControl(data);
            this.show();
            this._attachHandlers();

            this._timeoutId = window.setTimeout(function () {
                this._fireEvent('cancel');
                this.clear();
            }.bind(this), 3000);

            if(data) {
                this._data = data;
            }

            return this;
        },
        clear: function () {
            this.hide();
            this._detachHandlers();
            this._data = null;
            if(this._timeoutId) {
                window.clearTimeout(this._timeoutId);
                this._timeoutId = null;
            }

            return this;
        },
        getData: function () {
            return this._data;
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
                .set('contentBodyLayout', PopupLayout);

            return centeredControl;
        },
        _attachHandlers: function () {
            this._control.events
                .add('cancel', this._onCancel, this);
        },
        _detachHandlers: function () {
            this._control.events
                .remove('cancel', this._onCancel, this);
        },
        _onCancel: function (e) {
            this._fireEvent('cancel');
            this.clear();
        },
        _fireEvent: function (e, data) {
            this.events.trigger(jQuery.Event(e, data));
        }
    });

    provide(PopupMapView);
});
