/**
 * @NApiVersion 2.0
 * @NScriptType ScheduledScript
 * @NModuleScope SameAccount
 */
define(['N/search'],
/**
 * @param {search} search
 */
function(search) {
    // /**
    //  * Defination of the Scheduled script trigger point
    //  * 
    //  * @param {object} scriptContext
    //  * @param {string} scriptContext.type - The context in which the script is executed
    //  * 
    //  */
    // function execute(scriptContext) {
//         var caseSearch = search.load({
//             id : 'customsearch_sdr_escalated_searches'
//         });
    
    return {
        execute : function (context) {
            var caseSearch = search.create({
                type : search.Type.SUPPORT_CASE,
                filters : [
                    serach.createFilter({
                        name     : 'status',
                        operator : search.Operator.ANYOF,
                        values   : 3 // 3 = Escalated
                    }),
                    serach.createFilter({
                        name     : 'title',
                        joins    : 'employee',
                        operator : search.Operator.HASKEYWORDS,
                        values   : 'Support' 
                    }),
                ],
                columns : [
                    search.createColumn({name : 'title'}),
                    search.createColumn({name : 'startdate'}),
                    search.createColumn({name : 'assigned'}),
                    search.createColumn({name : 'status'}),
                    search.createColumn({name : 'department', join : 'employee'}),
                    search.createColumn({name : 'title'     , join : 'employee'})
                ]
            });
    
            var searchResults = caseSearch.run().getRange({
                start : 0,
                end   : 9
            });
    
            for (var i = 0; i < searchResults.length; i++) {
                var subject    = searchResults[i].getValue('title');
                var assignedTo = searchResults[i].getText('assigned');
                var status     = searchResults[i].getValue('status')
                var department = searchResults[i].getValue({
                    name  : 'department',
                    join  : 'employee'
                });
                var JobTitle = searchResults[i].getValue({
                    name  : 'title',
                    join  : 'employee'
                });
    
                log.debug('Case Info', 'Subject   :' + subject + '\n' + 
                                       'Status    :' + status + '\n' +
                                       'Job Title :' + jobTitle + '\n' + 
                                       'Subject   :' + subject  
                );
            }
        }
    }
    // return {
    //     execute : execute
    // };
});