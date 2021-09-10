/**
 * @NApiVersion 2.0
 * @NScriptType ClientScript
 * @NModuleScope SameAccount
 */
define(['N/runtime'],
/**
 * @param {runtime} runtime
 */ 
    function(runtime) {
        /**
         * Function to be executed after page is initialized.
         * 
         * @param {Object} scriptContext
         * @param {Record} scriptContext.currentRecord - Current from record
         * @param {string} scriptContext..made - The mode in which the record is being
         * 
         */
        function pageInit(context) {
            var employee = context.currentRecord;

            var prefRevCount = employee.getLineCount({
                sublistId : 'recmachcustrecord_sdr_perf_subordinate'
            });

            var notes = 'This employee has ' + prefRevCount + 'performance reviews .\n';

            var fRatingCount = 0;
            for (var i = 0; i < prefRevCount; i++) {
                var ratingCode = employee.getSublistValue({
                    sublistId : 'recmachcustrecord_sdr_perf_subordinate',
                    fieldId   : 'recmachcustrecord_sdr_perf_rating_code',
                    line      : i
                });

                if (ratingCode == 'F'){
                    fRatingCount += 1;
                }
            }

            notes += 'This employee has ' + fRatingCount + 'F-rated reviews';

            // alert(notes);

            var empCode = employee.getValue('custentity_sdr_employee_code');

            if (!empCode) {
                var defaultEmpCode = runtime.getCurrentScript().getParameter({
                    name : 'custscript_sdr_default_emp_code'
                });

                employee.setValue('custentity_sdr_employee_code', defaultEmpCode);

            }
        }
    
    
});