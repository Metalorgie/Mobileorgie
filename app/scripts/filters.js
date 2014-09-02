angular.module('MetalorgieMobile.filters', [])

.filter('trustAsHtml', function($sce){
    return function(input) {
        return $sce.trustAsHtml(input);
    }
});