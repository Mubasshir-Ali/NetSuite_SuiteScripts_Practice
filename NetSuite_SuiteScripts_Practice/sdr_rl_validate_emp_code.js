/**
 * @NApiVersion 2.0
 * @NScriptType Restlet 
 * @NModuleScope SameAccount
 */
define([],
    
    function() {

        /**
         * Function called upon sending a GET request to the RESTlet.
         * 
         * @param {Object} requestParams - Parameters from HTTP request URL; parameters
         * @returns {string | object} HTTP response body; return string when request
         * 
         * @since
         */
        function doGet(params) {
            var empCode = params.sdr_emp_code;

            if (empCode == 'x') {
                return 'invalid';
            }

            return 'valid';
        }

        /**
         * Function called upon sending a PUT request to the RESTlet.
         * 
         * @param {string | object} requestBody - The HTTP request body; request body...
         * @returns {string | object} HTTP response body; return string when request...
         * @since
         */
        function doPut(requestBody) {

        }

        /**
         * Function called upon sending a POST request to the RESTlet
         * 
         * @param {string | object} requestBody - The HTTP request body; request body
         * @returns {string | object} HTTP response body; return string when request
         * 
         * @since
         */
        function doPost(requestBody) {

        }

        /**
         * Function called upon sending a DELETE request to the RESTlet.
         * 
         * @param {object} requestParams - Parameters from HTTP request URL; parameters...
         * @returns {string | object} HTTP response body; return string when request...
         * 
         * @since
         */
        function doDelete(requestParams) {

        }

        return {
            'get' : doGet,
            put: doPut,
            post: doPost,
            'delete' : doDelete,

        }
    });