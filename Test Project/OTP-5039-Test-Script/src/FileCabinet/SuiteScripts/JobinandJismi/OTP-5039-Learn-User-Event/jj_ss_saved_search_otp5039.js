/**
 * @NApiVersion 2.1
 * @NScriptType ScheduledScript
 * @NModuleScope SameAccount
 */
/****************************************************************************

************************************************

** Scheduled Script | Create a Saved Search for certain SO and Close those SO **

*

*****************************************************************************

*********************************************

* Author: Jobin & Jismi IT Services LLP

*

* Date Created : 19-October 2023

*

* Created By: Krishnakanth V, Jobin & Jismi IT Services LLP

*

* Description :

*   Create a Saved Search for Sales Order that has been created before four days and contains the item "KitKat" and close that Sales Order.

* REVISION HISTORY

    1

*****************************************************************************

*******************************************************/
define(['N/search', 'N/record',], function (search, record) {
    function execute(context) {
        
        try {
            var salesOrderSearch = search.create({
                type: search.Type.SALES_ORDER,
                filters: [

                    ['mainline', 'is', 'F'],
                    'AND',
                    ['datecreated', 'before', 'fourdaysago'],
                    'AND',
                    ['item', 'anyof', '198']
                ],
                columns: ['internalid', 'tranid', 'trandate', 'type', 'item']
            });


            
            let pagedData = salesOrderSearch.runPaged();

            
            log.debug('Search Count', pagedData.count);

           
            pagedData.pageRanges.forEach((range) => {
                let currentPage = pagedData.fetch({ index: range.index });
                currentPage.data.forEach((result) => {
                    var orderId = result.getValue({ name: 'internalid' });
                    var orderNumber = result.getValue({ name: 'tranid' });
                    var createdDate = result.getValue({ name: 'trandate' });
                    var type = result.getValue({ name: 'type' });
                    var items = result.getValue({ name: 'item' });

                    log.debug('Sales Order ID', orderId);
                    log.debug('Sales Order Number', orderNumber);
                    log.debug('Created Date', createdDate);
                    log.debug('Type', type);
                    log.debug('Items', items);
                });
            });
        } catch (err) {
            log.error({ title: "error in getSalesDetails", details: err });
        }

            try {
                var searchResults = salesOrderSearch.run().getRange({
                    start: 0,
                    end: 1000 
                });
    
                for (var i = 0; i < searchResults.length; i++) {
                    var result = searchResults[i];
                    var orderId = result.getValue({ name: 'internalid' });
    
                    
                    var saleOrder = record.load({
                        type: record.Type.SALES_ORDER,
                        id: orderId,
                        isDynamic: true
                    });
                    
                    var itemcounts = saleOrder.getLineCount({
                        sublistId: 'item'
                    });
                    
    
                   
                    for (var j = 0; j < itemcounts; j++) {
                        saleOrder.selectLine({
                            sublistId: 'item',
                            line: j
                        })

                        saleOrder.setCurrentSublistValue({
                            sublistId: 'item',
                            fieldId: 'isclosed',
                            value: true,
                            ignoreFieldChange: true
                        })
                        saleOrder.commitLine({
                            sublistId: 'item',
                        })
                    }
    
                   
                    saleOrder.save({ ignoreMandatoryFields: true });
                    log.debug('Sales Order Closed',  orderId);
                }
            } catch (err) {
                log.error({ title: "Error in execute", details: err });
            }
        }
        return {
            execute: execute
        };
    
    });
    