/**
 * @NApiVersion 2.1
 * @NScriptType UserEventScript
 */
define(['N/ui/serverWidget'],
    /**
 * @param{serverWidget} serverWidget
 */
    (serverWidget) => {
        /**
         * Defines the function definition that is executed before record is loaded.
         * @param {Object} scriptContext
         * @param {Record} scriptContext.newRecord - New record
         * @param {string} scriptContext.type - Trigger type; use values from the context.UserEventType enum
         * @param {Form} scriptContext.form - Current form
         * @param {ServletRequest} scriptContext.request - HTTP request information sent from the browser for a client action only.
         * @since 2015.2
         */
        const beforeLoad = (scriptContext) => {
            try{
            if (scriptContext.type === scriptContext.UserEventType.VIEW || scriptContext.type === scriptContext.UserEventType.EDIT) {
               
                var form = scriptContext.form;
    
               
                var sublist = form.addSublist({
                    id: 'custpage_contactdetails',
                    type: serverWidget.SublistType.LIST,
                    label: 'Contact Details'
                });
    
                
                sublist.addField({
                    id: 'custpage_name',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Name'
                });
    
            
                sublist.addField({
                    id: 'custpage_phonenumber',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Phone Number'
                });
    
                
                sublist.setSublistValue({
                    id: 'custpage_name',
                    line: 0,
                    value: 'krishy'
                });
                sublist.setSublistValue({
                    id: 'custpage_phonenumber',
                    line: 0,
                    value: '8754325414'
                });
            }

        }catch(e) {
            log.debug("error in sublist creation",e);
        }
    }

        /**
         * Defines the function definition that is executed before record is submitted.
         * @param {Object} scriptContext
         * @param {Record} scriptContext.newRecord - New record
         * @param {Record} scriptContext.oldRecord - Old record
         * @param {string} scriptContext.type - Trigger type; use values from the context.UserEventType enum
         * @since 2015.2
         */
        const beforeSubmit = (scriptContext) => {

        }

        /**
         * Defines the function definition that is executed after record is submitted.
         * @param {Object} scriptContext
         * @param {Record} scriptContext.newRecord - New record
         * @param {Record} scriptContext.oldRecord - Old record
         * @param {string} scriptContext.type - Trigger type; use values from the context.UserEventType enum
         * @since 2015.2
         */
        const afterSubmit = (scriptContext) => {

        }

        return {beforeLoad, beforeSubmit, afterSubmit}

    });
