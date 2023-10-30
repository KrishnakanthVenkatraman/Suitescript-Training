/**
 * @NApiVersion 2.1
 * @NScriptType UserEventScript
 */
define('')

define(['N/record','N/log'], 
    /**
 * @param{record} record
 */
    (record,log) => {
        /**
         * Defines the function definition that is executed before record is loaded.
         * @param {Object} scriptContext
         * @param {Record} scriptContext.newRecord - New record
         * @param {string} scriptContext.type - Trigger type; use values from the context.UserEventType enum
         * @param {Form} scriptContext.form - Current form
         * @param {ServletRequest} scriptContext.request - HTTP request information sent from the browser for a client action only.
         * @since 2015.2
         */
       /* const beforeLoad = (scriptContext) => {
              
        }

        /**
         * Defines the function definition that is executed before record is submitted.
         * @param {Object} scriptContext
         * @param {Record} scriptContext.newRecord - New record
         * @param {Record} scriptContext.oldRecord - Old record
         * @param {string} scriptContext.type - Trigger type; use values from the context.UserEventType enum
         * @since 2015.2
         */
        /*const beforeSubmit = (scriptContext) => {
        try {
            let currentRecord = scriptContext.newRecord;
            let bodyFields ={
                customer:currentRecord.getValue({
                     fieldId:'entity'}),
                
                Location:currentRecord.getValue({
                    fieldId:'location'
                }),

                Subsidiary:currentRecord.getValue({
                    fieldId:'subsidiary'
                }),
                TransactionDate:currentRecord.getValue({
                    fieldId:'trandate'
                }),

            };
            var numLines = currentRecord.getLineCount({
                sublistId: 'item'
               });

           

           let lineFields = [];

           for (let line = 0; line < numLines; line++) {
            let lineData = {
                ItemName: currentRecord.getSublistValue({
                    sublistId: 'item',
                    fieldId: 'item_display',
                    line: line
                }),
                ItemQuantity: currentRecord.getSublistValue({
                    sublistId: 'item',
                    fieldId: 'quantity',
                    line: line
                }),
                ItemID: currentRecord.getSublistValue({
                    sublistId: 'item',
                    fieldId: 'id',
                    line: line
                }),
                ItemAmount: currentRecord.getSublistValue({
                    sublistId: 'item',
                    fieldId: 'amount',
                    line: line
                }),
            };
            
            
           lineFields.push(lineData);
        }
        

        let result = {"bodyfields":bodyFields,"linefields":lineFields,};
        
        log.debug("result",result);
        }
        
        catch (error) {
            log.debug("Not a newrecord", error);
        }
           
        }*/

        /**
         * Defines the function definition that is executed after record is submitted.
         * @param {Object} scriptContext
         * @param {Record} scriptContext.newRecord - New record
         * @param {Record} scriptContext.oldRecord - Old record
         * @param {string} scriptContext.type - Trigger type; use values from the context.UserEventType enum
         * @since 2015.2
         */
        const afterSubmit = (scriptContext) => {
            if (scriptContext.type === scriptContext.UserEventType.APPROVE) {
                try {
                  // Get the Sales Order ID from the context
                  var soId = scriptContext.newRecord.id;
          
                  // Transform the Sales Order to Item Fulfillment
                  var ifRecord = record.transform({
                    from: record.Type.SALES_ORDER,
                    fromId: soId,
                    to: record.Type.ITEM_FULFILLMENT,
                    isDynamic: true
                  });
          
                  // Set the desired field values on the Item Fulfillment record
                  ifRecord.setValue({
                    fieldId: 'shipstatus',
                    value: 'picked'
                  });
          
                  // Save the Item Fulfillment record
                  var ifId = ifRecord.save();
          
                  log.debug('Item Fulfillment Created', 'Item Fulfillment ID: ' , ifId);
                } catch (e) {
                  log.error('Error', 'An error occurred: ' , e.message);
                }
              }
            }
          
            return {
              afterSubmit: afterSubmit
            };
          });