modules.define('ymaps-control-base', [
    'inherit',
    'ymaps'
], function (provide, inherit, ymaps) {

    /**
     * @class
     * @name BaseControl
     */
    var BaseControl = inherit({
        __constructor: function (parameters) {
            parameters = parameters || {};
            parameters.data = parameters.data || {};
            parameters.state = parameters.state || {};
            parameters.options = parameters.options || {};

            this.data = new ymaps.data.Manager(parameters.data);
            this.state = new ymaps.data.Manager(parameters.state);
            this.options = new ymaps.option.Manager(parameters.options);
            this.events = new ymaps.event.Manager();

            /**
             * Передаем в макет контрола данные о его опциях.
             * @see http://api.yandex.ru/maps/doc/jsapi/2.x/ref/reference/ILayout.xml#constructor-summary
             */
            this._layout = this._createLayout({ control: this, data: this.data, state: this.state, options: this.options });
            this._map = null;
            this._element = null;
        },
        /**
         * Устанавливает родительский объект.
         * @function
         * @name BaseControl.setParent
         * @param {IControlParent} parent Родительский объект.
         * @returns {BaseControl} Возвращает ссылку на себя.
         */
        setParent: function (parent) {
            this._destroy();
             
            var controlParent = this._parent;
            this._parent = parent;

            if (controlParent !== parent) {
                this.events.fire('parentchange', {
                    oldParent: controlParent,
                    newParent: parent
                });
            }

            if(parent) {
                this._map = parent.getMap();
                parent.getChildElement(this)
                    .done(this._init, this);
            }
            else {
                this._layout.setParentElement(null);
                this._map = null;
            }

            return this;
        },
        /**
         * Возвращает ссылку на родительский объект.
         * @see http://api.yandex.ru/maps/doc/jsapi/2.x/ref/reference/IControl.xml#getParent
         * @function
         * @name BaseControl.getParent
         * @returns {IControlParent} Ссылка на родительский объект.
         */
        getParent: function () {
            return this._parent;
        },

        getMap: function () {
            return this._map;
        },

        _init: function (el) {
            this._map = this._parent.getMap();
            this._layout.setParentElement(
                this._element = el
            );
        },
        _destroy: function () {
            this._map = this._element = null;
        },
        _createLayout: function (data) {
            var ControlLayout = ymaps.templateLayoutFactory.createClass([
                    '<ymaps{% if options.visible == false %} style="display:none;"{% endif %}>',
                        '{% include options.contentLayout %}',
                    '</ymaps>'
                ].join(''));

            return new ControlLayout(data);
        }
    });

    provide(BaseControl);
});
