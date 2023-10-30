/**
 * @NApiVersion 2.1
 * @NScriptType UserEventScript
 */
define(['N/email', 'N/record', 'N/search'],
    /**
 * @param{email} email
 * @param{record} record
 * @param{search} search
 */
    (email, record, search) => {
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


try{
    
      if (scriptContext.type === scriptContext.UserEventType.EDIT) {
        var oldRecord = scriptContext.oldRecord;
        var newRecord = scriptContext.newRecord;
        const itemCount = oldRecord.getLineCount({ sublistId: 'item' });
        const itemCount1 = newRecord.getLineCount({ sublistId: 'item' });

        for (let i = 0; i < itemCount; i++) {
         
          var oldQuantity = oldRecord.getSublistValue({
            sublistId: 'item',
            fieldId: 'quantity',
            line: i,
          });
        
          log.debug('oldquantity: ' + oldQuantity);
        }
        for (let j = 0; j < itemCount1; j++) {
          var itemName = newRecord.getSublistText({
            sublistId: 'item',
            fieldId: 'item',
            line: j,
          });
          
          var newQuantity = newRecord.getSublistValue({
            sublistId: 'item',
            fieldId: 'quantity',
            line: j,
          });
        
          log.debug('newquantity: ' + newQuantity);
      
          log.debug('itemname: ' + itemName);
      
        }
        
        if (oldQuantity != newQuantity) {
          var vendorId = newRecord.getValue({ fieldId: 'entity' });
          log.debug("this is vendor",vendorId)
          var vendor = record.load({ type: record.Type.VENDOR, id: vendorId });
          var vendorEmail = vendor.getValue({ fieldId: 'email' });
          log.debug("this is email",vendorEmail);
        
          var subject = 'The quantity updated in the PO: ' + newRecord.getValue({ fieldId: 'tranid' });
          var body = 
          '<table border="1"><tr><th>Item Name</th><th>Old Quantity</th><th>Updated Quantity</th></tr>';
        
          body += '<tr><td>' + itemName + '</td><td>' + oldQuantity + '</td><td>' + newQuantity + '</td></tr>';
        
          body += '</table>';
        
          
          email.send({
            author: -5,
            recipients: vendorEmail,
            subject: subject,
            body: body
          });
        }
      }
 
    }catch(e) {
        log.debug("error", e);
    }
}
return {afterSubmit}
  });
  



