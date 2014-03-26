modules.define('ymaps-map', [
    'ymaps',
    'ymaps-map-config',
    'ymaps-control-centered'
], function (provide, ymaps, config, centeredControl) {

    var appMap = new ymaps.Map(
        config.container,
        config.state,
        config.options
    );

    appMap.controls.add(centeredControl);
    provide(appMap);
});
