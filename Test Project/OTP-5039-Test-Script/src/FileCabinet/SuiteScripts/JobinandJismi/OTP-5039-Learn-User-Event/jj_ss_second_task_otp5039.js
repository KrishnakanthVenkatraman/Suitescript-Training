/**
 * @NApiVersion 2.1
 * @NScriptType ScheduledScript
 * 
** Scheduled Script | Create a Saved Search for  SO and save it in a text file and schedule it once in a day **

*

*****************************************************************************

*********************************************

* Author: Jobin & Jismi IT Services LLP

*

* Date Created : 20-October 2023

*

* Created By: Krishnakanth V, Jobin & Jismi IT Services LLP

*

* Description :

*   Create a Saved Search for  SO and save it in a text file and schedule it once in a day.

* REVISION HISTORY

    1

*****************************************************************************

*******************************************************/

define(['N/record', 'N/search', 'N/file'], (record, search, file) => {

    const execute = (scriptContext) => {
        let soObj = []; 

        try {
            var salesOrderSearch = search.create({
                type: search.Type.SALES_ORDER,
                filters: [
                    ['mainline', 'is', 'T'],
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

                    var soData = {
                        'Sales Order ID': orderId,
                        'Sales Order Number': orderNumber,
                        'Created Date': createdDate,
                        'Type': type,
                        'Items': items
                    };

                    soObj.push(soData); 
                });
            });
        } catch (err) {
            log.error({ title: "error in getSalesDetails", details: err });
        }

      
            
            let fileObj = file.create({
                name: 'testSalesOrder.txt',
                fileType: file.Type.PLAINTEXT,
                contents: JSON.stringify(soObj)
            });

            fileObj.folder = -20;

            
            let id = fileObj.save();

           
            fileObj = file.load({
                id: id
            });
         
      
    };

    return {
        execute
    };
});
