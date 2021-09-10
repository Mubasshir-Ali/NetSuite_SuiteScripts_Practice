/**
 * @NApiVersion 2.0
 * @NScriptType MapReduceScript
 * @NModuleScope SameAcount
 */
define(['N/search'],
/**
 * @param {search} search
 */
function (search) {

    /**
     * Marks the begning of the Map/Reduce process and generates input data.
     * 
     * @type {object} ObjectRef
     * @property {number} id - Internal ID of the record instance
     * @property {string} type - Record type id
     * 
     * @return {Array|Object|Search|RecordRef} inputSummary
     */
    function getInputData(){
        var invSearch = search.create({
            type    : search.Type.TRANSACTION,
            filters : [
                ['type', search.Operator.ANYOF, 'CustInvc'], 'and',
                ['mainline', search.Operator.IS, true]
            ],
            columns : ['entity', 'total']
        });

        return invSearch;
    }
    /**
     * Executes when the reduce entry point is triggered and applies to each key/value
     * 
     * @param {MapSummary} context - Data collection containing the key/value pairs 
     * 
     */
    function map(context) {
        var searchResult = JSON.parse(context.value);

        var customer = searchResult.values.entity.text;
        var total    = searchResult.values.total;

        context.write({
            key   : customer,
            value : total
        });
    }
    /**
     * Executes when the reduce entry point is triggered and applies to each group
     * @param {ReduceSummary} context - Data collection containing the groups to
     */
    function reduce(context){
        var total = 0;

        for(var i in context.values){
            total += parseFloat(context.values[i]);
        }

        log.debug('Totals', 'Customer: '+ context.key + '\n' +
                             'Total : ' + total);
    }
    /**
     * Executes when the summarize entry point is triggered and applies to each res
     * @param {Summary} summary - Holds statistics regarding the execution of a map
     * 
     */
    function summarize(summary) {
        log.audit('Number of ques', summary.concurrency);

        log.error('Input error', summary.inputSummary.error);

        summarize.mapSummary.errors.iterators().each(function (code, message) {
            log.error('Map Error: ' + code, message);
            return true;
        });

        summarize.reduceSummary.errors.iterators().each(function (code, message) {
            log.error('Reduce Error: ' + code, message);
            return true;
        });
    }

    return {
        getInputData : getInputData,
        map          : map,
        reduce       : reduce,
        summarize    : summarize
    };


});