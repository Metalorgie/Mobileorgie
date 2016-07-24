angular.module('MetalorgieMobile.filters', [])

.filter('trustAsHtml', function($sce){
    return function(input) {
        var res = $sce.trustAsHtml(input);
        if (typeof res !== "undefined") {
            return res.toString();
        }
        return input;
    }
})
.filter('convertLink', function ($sce){
        return function(input) {
            var regex = /http:\/\/www\.metalorgie\.com\/(groupe|news|interviews|dossiers|live-report)\/([^_\/"]+)[^"]*/g;
            var matches = [], found;
            while (found = regex.exec(input)) {
                matches.push(
                    {
                        link:found[0],
                        type:found[1],
                        id:found[2]
                    });
            }
            var i = 0,
                length = matches.length;
            for ( ; i < length ; i++ ){
                var toChange = matches[i];
                var link = null;
                switch(toChange.type)  {
                    case 'news':
                        link = '#/app/news/' + toChange.id;
                        break;
                    case 'groupe':
                        link = '#/app/band/' + toChange.id;
                        break;
                    case 'interviews':
                    case 'dossiers':
                    case 'live-reports':
                        link = '#/app/articles/' + toChange.id;
                        break;
                }
                if (link != null) {
                    input = input.replace(toChange.link, link);
                }
            }

            // Fix img src :
            var regex = /<img[^>]+src="(\/[^">]+)"/g;
            var srcs = []
            while ( m = regex.exec( input ) ) {
                srcs.push( m[1] );
            }
            var i = 0,
                length = srcs.length;
            for ( ; i < length ; i++ ) {
                var src = srcs[i];
                input = input.replace(src, 'http://www.metalorgie.com/' + src);
            }
            return input;
        }
    })
	// split an array of objects into an array of arrays of objects whose field is identical (fieldName)
	// ordered by appearance of the field value in the first array
.filter('divider', function() {
	return function(input, fieldName){
		var result = [];
		var fieldValues = {};
		if(input){
			for(var i = 0; i<input.length; i++){
				var fieldValue = input[i][fieldName];
				if(fieldValues[fieldValue] == undefined){
					fieldValues[fieldValue] = result.length;
					result.push([]);
				}
				result[fieldValues[fieldValue]].push(input[i]);
			}
		}
		return result;
	}
})

.directive('ngDelay', ['$timeout', function ($timeout) {
    return {
        restrict: 'A',
        scope: true,
        compile: function (element, attributes) {
            var expression = attributes['ngChange'];
            if (!expression)
                return;

            var ngModel = attributes['ngModel'];
            if (ngModel) attributes['ngModel'] = '$parent.' + ngModel;
            attributes['ngChange'] = '$$delay.execute()';

            return {
                post: function (scope, element, attributes) {
                    scope.$$delay = {
                        expression: expression,
                        delay: scope.$eval(attributes['ngDelay']),
                        execute: function () {
                            var state = scope.$$delay;
                            state.then = Date.now();
                            $timeout(function () {
                                if (Date.now() - state.then >= state.delay)
                                    scope.$parent.$eval(expression);
                            }, state.delay);
                        }
                    };
                }
            }
        }
    };
}]);