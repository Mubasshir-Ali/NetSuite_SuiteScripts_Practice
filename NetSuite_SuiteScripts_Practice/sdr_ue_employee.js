/**
 * @NApiVersion 2.0
 * @NScriptType UserEventScript
 */

define(['N/record', 'N/redirect'],
/**
 * 
 * @param {record} record 
 * @param {redirect} redirect
 */ 

function(record) {
    
    return {
        aterSubmit: function(context) {
            var employee     = context.newRecord;
            var empCode      = employee.getValue('custentity_sdr_employee_code');
            var supervisorId = employee.getValue('supervisor');

            log.debug('Émployee Code', empCode);
            log.debug('Supervisor Id', supervisorId);

            if (context.type == context.UserEventType.CREATE) {
                var phoneCall = record.create({
                    type : record.Type.PHONE_CALL,
                    defaultValues : {
                        customeform : -150
                    }
                });

                phoneCall.setValue('title', 'Call HR for benefits');
                phoneCall.setValue('assigned', employee.id);
                phoneCall.save();

                var event = record.create({
                    type : record.Type.EVENT,
                    isDynamic :true
                });
                event.setValue('title', 'Welcome meeting with supervisor');

                event.selectNewLine({
                    sublistId : 'attendee'
                });
                event.setCurrentSublistValue({
                    sublistId : 'attendee',
                    fieldId   : 'attendee',
                    value     : employee.id
                });
                event.commitLine({
                    sublistId : 'attendee'
                });
                event.selectNewLine({
                    sublistId : 'attendee'
                });
                event.setCurrentSublistValue({
                    sublistId : 'attendee',
                    fieldId   : 'attendee',
                    value     : employee.getValue('supervisor')
                });
                event.commitLine({
                    sublistId : 'attendee'
                });

                event.save();
            }

            redirect.toSuitelet({
                scriptId     : '',
                departmentId : '',
                parameters   : {
                    sdr_name  : employee.getValue('entityid'),
                    sdr_notes : employee.getValue('comments'),
                    sdr_empid : employee.id
                }
            });


        }
    };
    
});