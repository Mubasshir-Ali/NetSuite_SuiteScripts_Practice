/**
 * @NApiVersion 2.0
 * @NScriptType workflowactionscript
 */
define(['N/record', 'N/runtime'],
/**
 * @param {record} record
 * @param {runtime} runtime
 */
function(record, runtime) {

    /**
     * Definition of the Suitlet script trigger point.
     * 
     * @param {object} scriptContext
     * @param {record} scriptContext.newRecord - New record.
     * @param {record} scriptContext.oldRecord - Old record. 
     */
    function onAction(Context){
        var workflowTotal = runtime.getCurrentScript().getParameter({
            name : 'custscript_sdr_workflow_total'
        });

        var expRep = context.newRecord;
        var expenseCount = expRep.getLineCount({sublistId : 'expense'});
        var employeeId = expRep.getValue('entity');
        var notes = 'Workflow Total :' + workflowTotal + ' \n' + 
                    'Expanse        :' + expenseCount;
                    
        var employee = record.load({
            type: record.Type.EPLOYEE,
            id  : employeeId

        });
        employee.setValue('comment', notes);
        employeeId = employee.save();

        if (!employeeId) {
            return 'failed';
        }

        return 'success';

    }

    return {
        onAction: onAction
    }
});