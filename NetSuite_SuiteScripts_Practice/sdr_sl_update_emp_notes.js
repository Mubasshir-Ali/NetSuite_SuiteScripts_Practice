/**
 * @NApiVersion 2.0
 * @NScriptType Suitlet
 * @NModuleScope SameAccount
 */
define(['N/ui/serverWidget', 'N/record', 'N/redirect'],
/**
 * @param {serverWidget} serverWidget
 * @param {record} record
 * @param {redirect} redirect
 */
function(serverWidget, record, redirect) {

    /**
     * Definition of the Suitelet script trigger point.
     * 
     * @param {object} context
     * @param {ServerRequest} context.request -Encapsulation of the incoming request.
     * @param {ServerResponse} context.response -Encapsulation of the Suitlet request
     * 
     */
    function onRequest(context) {
        var request  = context.request;
        var response = context.response;

        if (request.method == 'GET') {
            var name = request.parameters.sdr_name;
            var notes = request.parameters.sdr_notes;
            var empId = request.parameters.sdr_empid;


            var form = serverWidget.createForm({
                title : 'Update Employee Notes',
                // hideNavbar : true 

            });

            var nameFld = form.addField({
                id    : 'custpage_sdr_emp_name',
                type  : serverWidget.FieldType.TEXT,
                label : 'Name'
            });
            var notesFld = form.addField({
                id    : 'custpage_sdr_notes',
                type  : serverWidget.FieldType.TEXT,
                label : 'Notes'
            });
            var empIdFld = form.addField({
                id    : 'custpage_sdr_emp_id',
                type  : serverWidget.FieldType.TEXT,
                label : 'Emp ID'
            });

            form.addSubmitButton('Continue');

            nameFld.defaultValue  = name;
            notesFld.defaultValue = notes;
            empIdFld.defaultValue = empid;

            nameFld.updateDisplayType({
                displayType : serverWidget.FieldDisplayType.INLINE
            });
            nameFld.updateDisplayType({
                displayType : serverWidget.FieldDisplayType.HIDDEN
            });

            response.writePage(form);

            }

            else { // POST 
                empId = request.parameters.custpage_sdr_emp_id;
                notes = request.parameters.custpage_sdr_notes;

                var employee = record.load({
                    type : record.Type.EMPLOYEE,
                    id   : empId
                });
                employee.setValue('comments', notes);
                employee.save();

                redirect.toRecord({
                    type : record.Type.EMPLOYEE,
                    id   : empId
                });

        }

    }

    return {
        onRequest: onRequest
    }

});