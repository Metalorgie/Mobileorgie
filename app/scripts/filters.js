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
            var regex = /http:\/\/www\.metalorgie\.com\/(groupe|news)\/([^_\/"]+)[^"]*/g;
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
                toChange = matches[i];
                var link = null;
                switch(toChange.type)  {
                    case 'news':
                        link = '#/tab/news/' + toChange.id;
                        break;
                    case 'groupe':
                        link = '#/tab/band/' + toChange.id;
                        break;
                }
                if (link != null) {
                    input = input.replace(toChange.link, link);
                }
            }

            return input;
        }
    });