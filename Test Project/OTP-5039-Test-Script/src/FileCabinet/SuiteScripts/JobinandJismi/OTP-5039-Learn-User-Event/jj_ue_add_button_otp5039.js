/**

 * @NApiVersion 2.1

 * @NScriptType UserEventScript

 */

define(['N/record', 'N/ui/message'],

    /**
     * @param {N/record} record
     * @param {N/ui/message} message
     */

    (record,message) => {
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
          
            if (scriptContext.type === 'view') {
                try {
                    log.debug("Script Execution Begins");
                    let form = scriptContext.form;
                    let myMsg = form.addPageInitMessage({
                        title: 'message title',
                        message: 'This is my message',
                        type: message.Type.ERROR,
                        duration:20000
                    });
                    log.debug("mymsg",myMsg);
                    
                    form.addButton({
                        id: 'custpage_button',
                        label: 'Test',
                        functionName: 'clientButton()'
                    });

                    form.clientScriptFileId = 8;
                    myMsg.show();

                   
                } 
                catch (error) {
                    log.error("Error @BeforeLoad", error);
                }
            } else {
                log.debug("Wrong Type");
            }
        }
    

        return {beforeLoad};
    }
);
