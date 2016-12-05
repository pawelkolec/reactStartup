import React from 'react';

class Api extends React.Component {
    
    constructor() {
        super();
        
        this.config = {
            apiConfig: { url: "src/components/api/api.config.json", responseType: "json" },
            fakeRootUrl: "app/components/api/fakeResources/",
            rootUrl: null,
            endpoints: null,
            domain: '',
            initialized = false
        };
        
        this.request = this.request;
        this.getVideos = this.getVideos;
    }
    
    statics {
        request(endpoint, configuration) {
            // If endpoint contains parameters that should be replaced by specific values
            // you should add replacements array into configuration object. Example:
            // [{ target: '{UID}', value: 1 }]
            var rootAddress = rootUrl;

            // to remove on production
            if (configuration && configuration.fake) {
                rootAddress = fakeRootUrl;
            }
            
            var deffer = 
            
            return $q(function(resolve, reject) {
        }
    }
}

function api($http, $q, cmSession, $timeout) {

    /////////////////////
    function request(endpoint, configuration) {
        // If endpoint contains parameters that should be replaced by specific values
        // you should add replacements array into configuration object. Example:
        // [{ target: '{UID}', value: 1 }]
        var rootAddress = rootUrl;

        // to remove on production
        if ( configuration && configuration.fake ) {
            rootAddress = fakeRootUrl;
        }
        //

        return $q(function(resolve, reject) {
            if ( !endpoint ) {
                return reject('No endpoint provided.');
            }

            if ( rootAddress && endpoints && endpoints[endpoint]) {
                return makeRequest(resolve, reject, rootAddress + endpoints[endpoint], configuration);
            }

            if (initialized) {
                return reject('Api error or no such endpoint.');
            }

            getApiConfig(apiConfig).then(function() {
                return request(endpoint, configuration).then(function(results) {
                    return resolve(results);
                }, function(results) {
                    return reject(results);
                });
            }, function(results) {
                return reject(results);
            });
        });
    }

    function makeRequest(resolve, reject, endpoint, configuration) {
        var config = { responseType: "json" };
        var replacementLength = 0;
        var requestCounter = 0;

        // replace parameters in endpoint if needed, example configuration.replacements:
        // [{ target: '{UID}', value: 1 }]
        if (configuration && configuration.replacements && typeof configuration.replacements.length !== 'undefined') {
            replacementLength = configuration.replacements.length;

            for (var i = 0; i < replacementLength; i++) {
                if (!configuration.replacements[i].target || !configuration.replacements[i].value) {
                    continue;
                }

                endpoint = endpoint.replace(configuration.replacements[i].target, configuration.replacements[i].value);
            }
        }

        if (cmSession.getCSRF()) {
            if (!configuration.headers) {
                configuration.headers = {};
            }

            angular.extend(configuration.headers, angular.fromJson(cmSession.getCSRF()));
        }

        angular.extend(config, { url: endpoint });

        if (typeof configuration !== 'undefined') {
            angular.extend(config, configuration);
        }

        // add empty data if no data provided
        if ((config.method === 'POST' || config.method === 'post') && !config.data) {
            config.data = '';
        }

        return $q(callBackend).then(function(res) {
            return resolve(res);
        }, function(res) {
            return reject(res);
        });

        function callBackend(resolve, reject) {
            $http(config).then( function (response) {
                if ((response.data && response.data.error) || response.error) {
                    return reject(response.data.error);
                }

                return resolve(response.data);
            }, function(response) {
                if (response.status > 0 || (response.status < 0 && requestCounter < 2)) {
                    return reject(response);
                }

                requestCounter ++;
                $timeout(callBackend(resolve, reject), 3000);
            });
        }
    }

    function getApiConfig(config) {
        return $http(config).then( function (response) {
            initialized = true;
            rootUrl = response.data.root || null;
            endpoints = response.data.endpoints || null;
            domain = response.data.domain || '';
            cmSession.setDomain(domain);

            return response.data;
        }, function(response) {
            initialized = true;
            return $q.reject(response);
        });
    }

    function getVideos(configuration) {
        var conf = { method: 'GET' };
        if (typeof configuration !== 'undefined') {
            angular.extend(conf, configuration);
        }

        return request('videos', conf);
    }

}