/**
 * @NApiVersion 2.0
 * @NScriptType Suitlet
 * @NModuleScope SameAccount
 */
define(['N/ui/serverWidget'],
/**
 * @param {serverWidget} serverWidget
 */
function(serverWidget) {

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


        var form = serverWidget.createForm({
            title : 'Update Employee Notes',
            hideNavbar : true 

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

        form.addSubmitButton();

        response.writePage(form);

    }

    return {
        onRequest: onRequest
    }

});