modules.define('ymaps-control-centered', [
    'inherit',
    'ymaps',
    'ymaps-control-base'
], function (provide, inherit, ymaps, BaseControl) {

    var ContentLayout = ymaps.templateLayoutFactory.createClass([
            '<div class="container-fluid" style="left:{{ options.position.left }}px;top:{{ options.position.top }}px;">',
                '{% include options.contentBodyLayout %}',
            '</div>'
        ].join(''), {
            build: function () {
                ContentLayout.superclass.build.call(this);
                this._setupListeners();
                this._setPosition();
            },

            clear: function () {
                this._clearListeners();
                ContentLayout.superclass.clear.call(this);
            },

            _setupListeners: function () {
                var control = this.getData().control;
                this._mapListener = control.getMap().events.group()
                    .add('sizechange', this._setPosition, this);
            },

            _clearListeners: function () {
                this._mapListener.removeAll();
            },

            _setPosition: function () {
                var control = this.getData().control,
                    mapSize = control.getMap().container.getSize(),
                    parentElement = this.getParentElement();

                control.options.set('position', {
                    top: mapSize[1] / 2 - parentElement.offsetHeight / 2,
                    left: mapSize[0] / 2 - parentElement.offsetWidth / 2
                });
            }
        });

    var CenteredControl = inherit(BaseControl, {
        __constructor: function () {
            this.__base.apply(this, arguments);

            this.options.set('contentLayout', ContentLayout);
        }
    });

    provide(CenteredControl);
});
