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
         * @param {string} scriptContext.made - The mode in which the record is being
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

        /**
         * Function to be executed when field is changed.
         * 
         * @param {object} scriptContext
         * @param {Record} scriptContext.currentRecord - Current form record.
         * @param {string} scriptContext.sublistId - Sublist name
         * @param {string} scriptContext.fieldId - Field name
         * @param {number} scriptContext.lineNum - Line number. Will be undefined if
         * @param {number} scriptContext.columnNum - Line number. Will be undefined if
         * 
         * @since 
         */
        function fieldChanged(context) {
            var employee = context.currentRecord;

            if (context.fieldId == 'phone') {
                var fax = employee.getValue('fax');

                if(!fax) {
                    var phone = employee.getValue('phone');
                    employee.setValue('fax', phone);
                }
            }
        }

        /**
         * Function to be executed when field is slaved.
         * 
         * @param {object} scriptContext
         * @param {Record} scriptContext.currentRecord - Current form record
         * @param {string} scriptContext.sublistId - sublist name
         * @param {string} scriptContext.fieldId - Field name
         * 
         * @since
         */
        function postSourcing(scriptContext) {

        }

        /**
         * Function to be executed after sublist is inserted, removed, or edited.
         * 
         * @param {object} scriptContext
         * @param {Record} scriptContext.currentRecord - Current form record
         * @param {string} scriptContext.sublistId - Sublist name
         * 
         * @since  
         */
        function sublistChanged(scriptContext) {

        }

        /**
         * Function to be executed after line is selected.
         * 
         * @param {object} scriptContext
         * @param {Record} scriptContext.currentRecord - Current form record
         * @param {string} scriptContext.sublistId - Sublist name
         * 
         * @since  
         */
        function lineInit(context) {
            var employee = context.currentRecord;

            if (context.sublistId == 'recmachcusrecord_sdr_perf_subordinate') {
                var reviewType = employee.getCurrentSublistValue({
                    sublistId : 'recmachcusrecord_sdr_perf_subordinate',
                    fieldId   : 'custrecord_sdr_perf_review_type'
                });

                if (!reviewType) {
                    employee.setCurrentSublistValue({
                        sublistId : 'recmachcusrecord_sdr_perf_subordinate',
                        fieldId   : 'custrecord_sdr_perf_review_type',
                        value     : 1 // Salary Change
                    });
                }
            }
        }

        /**
         * Validation function to be executed when field is changed.
         * 
         * @param {object} scriptContext
         * @param {Record} scriptContext.currentRecord - Current form record
         * @param {string} scriptContext.sublistId - Current form record
         * @param {string} scriptContext.fieldId - Field name
         * @param {number} scriptContext.lineNum - Line number. Will be undefined if
         * @param {number} scriptContext.columnNum - Line number. Will be undefined if
         * 
         * @returns {boolean} Return true if field is valid 
         * 
         * @since 
         *
         */
        function validateField(context) {
            var employee = context.currentRecord;

            if (cotext.fieldId == 'custentity_sdr_employee_code'){
                var empCode      = employee.getValue('custentity_sdr_employee_code');

                if (empCode == 'x') {
                    alert('Invalid Employee Code value. Please try again.');
                    return false;
                }
            }

            return true;
        }

        /**
         * Validation function to be executed when sublist line is committed.
         * 
         * @param {object} scriptContext
         * @param {record} scriptContext.currentRecord - Current form record.
         * @param {string} scriptContext.sublistId - Sublist name
         * 
         * @return {boolean} Return true if sublist line is valid
         * 
         * @since  
         */
        function validateLine(context) {
            var employee = context.currentRecord;

            if (context.sublistId == 'recmachustrecord_sdr_perf_subordinate') {
                var increaseAmount = employee.getCurrentSublistValue({
                    sublistId : 'recmachustrecord_sdr_perf_subordinate',
                    fieldId   : 'custrecord_sdr_perf_sal_incr_amt'
                });

                if (incrementAmount > 5000) {
                    alert('Salary increase amount cannot be greater than 5,000');
                    return false;
                }
            }

            return true;
        }

        /**
         * Validation function to be executed when sublist line is inserted.
         * 
         * @param {object} scriptContext
         * @param {Record} scriptContext.currentRecord - Current form record
         * @param {string} scriptContext.sublistId - Sublist name
         * 
         * @returns {boolean} Return true if sublist line is valid 
         * 
         * @since 
         */
        function validateInsert(scriptContext) {

        }

        /**
         * Validation function to be executed when record is deleted.
         * 
         * @param {object} scriptContext
         * @param {Record} scriptContext.currentRecord - Current form record
         * @param {string} scriptContext.sublistId - Sublist name
         * 
         * @returns {boolean} Return true if sublist line is valid 
         * 
         * @since
         */
        function validateDelete(scriptContext) {


        }

        /**
         * Validation function to be executed when record is saved.
         * 
         * @param {object} scriptContext
         * @param {Record} scriptContext.currentRecord - Current form record'
         * @returns {boolean} Return true if record is valid
         * 
         * @since
         */
        function saveRecord(context) {
            var employee = context.currentRecord;

            var empCode = employee.getValue('custentity_sdr_employee_code');

            if (empCode == 'x') {
                alert('Invalid Employee Code value. Please try again.');
                return false;
            }

            return true;
        }

        return {
            pageInit : pageInit,
            fieldChanged : fieldChanged,
            postSourcing : postSourcing,
            sublistChanged : sublistChanged,
            lineInit : lineInit,
            validateField : validateField,
            validateLine : validateLine,
            validateInsert : validateInsert,
            validateDelete : validateDelete,
            saveRecord : saveRecord
        }
});