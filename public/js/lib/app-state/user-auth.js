modules.define('app-state-user-auth', [
    'inherit',
    'jquery',
    'app-state-base'
], function (provide, inherit, jQuery, AppStateBase) {

    var UserAuthState = inherit(AppStateBase, {
        __constructor: function () {
            this.__base.apply(this, arguments);

            this._name = 'user-auth';
            this._changeState('image-load');
        }
    });

    provide(UserAuthState);
});
