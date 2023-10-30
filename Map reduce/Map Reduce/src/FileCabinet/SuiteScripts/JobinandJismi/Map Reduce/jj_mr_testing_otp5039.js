/**
 * @NApiVersion 2.1
 * @NScriptType MapReduceScript
 */
define(['N/record', 'N/search','N/email'],
    /**
 * @param{record} record
 * @param{search} search
 */
    (record, search,email) => {
        /**
         * Defines the function that is executed at the beginning of the map/reduce process and generates the input data.
         * @param {Object} inputContext
         * @param {boolean} inputContext.isRestarted - Indicates whether the current invocation of this function is the first
         *     invocation (if true, the current invocation is not the first invocation and this function has been restarted)
         * @param {Object} inputContext.ObjectRef - Object that references the input data
         * @typedef {Object} ObjectRef
         * @property {string|number} ObjectRef.id - Internal ID of the record instance that contains the input data
         * @property {string} ObjectRef.type - Type of the record instance that contains the input data
         * @returns {Array|Object|Search|ObjectRef|File|Query} The input data to use in the map/reduce process
         * @since 2015.2
         */
       

        const getInputData = (context) => {
            try {
                
                let invSearch = search.create({
                    type: search.Type.INVOICE,
                    id: 'customsearch_jj_open_invoice_search',
                    title: 'JJ OPEN INVOICE SEARCH',
                    filters: [['mainline', 'is', true], 'and', ['status', 'anyof', 'CustInvc:A']],
                    columns: ['tranid', 'entity']
                    
                });
                let pagedData = invSearch.runPaged();
                return invSearch;
            
            //     log.debug('Search Count', pagedData.count);

            //     pagedData.pageRanges.forEach((range) => {
            //         let currentPage = pagedData.fetch({ index: range.index });
            //         currentPage.data.forEach((result) => {
            //         let customername = result.getValue('entity');
            //         let documentno = result.getValue('tranid');
            //         var res =({"customer : " : customername,"documentno : " : documentno});
            //         log.debug("result",res);
            //     });
            // });
            // const openInvoicesSearch = search.load({ id: 'customsearch_jj_open_invoice_search' });
            // return openInvoicesSearch; // Use the saved search you created
            
        }catch (error) {
            log.error('Error @ getInput', error);
            return [];
        }

            
        };

        

        /**
         * Defines the function that is executed when the map entry point is triggered. This entry point is triggered automatically
         * when the associated getInputData stage is complete. This function is applied to each key-value pair in the provided
         * context.
         * @param {Object} mapContext - Data collection containing the key-value pairs to process in the map stage. This parameter
         *     is provided automatically based on the results of the getInputData stage.
         * @param {Iterator} mapContext.errors - Serialized errors that were thrown during previous attempts to execute the map
         *     function on the current key-value pair
         * @param {number} mapContext.executionNo - Number of times the map function has been executed on the current key-value
         *     pair
         * @param {boolean} mapContext.isRestarted - Indicates whether the current invocation of this function is the first
         *     invocation (if true, the current invocation is not the first invocation and this function has been restarted)
         * @param {string} mapContext.key - Key to be processed during the map stage
         * @param {string} mapContext.value - Value to be processed during the map stage
         * @since 2015.2
         */

        const map = (context) => {
           

        // Build the email body with a table
       

        
   
        };

        

        /**
         * Defines the function that is executed when the reduce entry point is triggered. This entry point is triggered
         * automatically when the associated map stage is complete. This function is applied to each group in the provided context.
         * @param {Object} reduceContext - Data collection containing the groups to process in the reduce stage. This parameter is
         *     provided automatically based on the results of the map stage.
         * @param {Iterator} reduceContext.errors - Serialized errors that were thrown during previous attempts to execute the
         *     reduce function on the current group
         * @param {number} reduceContext.executionNo - Number of times the reduce function has been executed on the current group
         * @param {boolean} reduceContext.isRestarted - Indicates whether the current invocation of this function is the first
         *     invocation (if true, the current invocation is not the first invocation and this function has been restarted)
         * @param {string} reduceContext.key - Key to be processed during the reduce stage
         * @param {List<String>} reduceContext.values - All values associated with a unique key that was passed to the reduce stage
         *     for processing
         * @since 2015.2
         */
        const reduce = (reduceContext) => {
            try {
            log.debug("reduce",reduceContext);
            const searchResult = JSON.parse(reduceContext.values);

            const invoiceNumber = searchResult.values.tranid;
            log.debug("invoiceNumber",invoiceNumber);
            const customerName = searchResult.values.entity;
            const emailBody = `
            <html>
                <body>
                    <table border="1">
                        <tr>
                            <th>Customer Name</th>
                            <th>Invoice Document Number</th>
                        </tr>
                        <tr>
                            <td>${customerName}</td>
                            <td>${invoiceNumber}</td>
                        </tr>
                    </table>
                </body>
            </html>
        `;
            email.send({
                author: -5, 
                recipients: -5, 
                subject: 'Open Invoices Report',
                body: emailBody,
            });
        }catch(e) {
            log.debug("error in reduce",e);
        }

        }


        /**
         * Defines the function that is executed when the summarize entry point is triggered. This entry point is triggered
         * automatically when the associated reduce stage is complete. This function is applied to the entire result set.
         * @param {Object} summaryContext - Statistics about the execution of a map/reduce script
         * @param {number} summaryContext.concurrency - Maximum concurrency number when executing parallel tasks for the map/reduce
         *     script
         * @param {Date} summaryContext.dateCreated - The date and time when the map/reduce script began running
         * @param {boolean} summaryContext.isRestarted - Indicates whether the current invocation of this function is the first
         *     invocation (if true, the current invocation is not the first invocation and this function has been restarted)
         * @param {Iterator} summaryContext.output - Serialized keys and values that were saved as output during the reduce stage
         * @param {number} summaryContext.seconds - Total seconds elapsed when running the map/reduce script
         * @param {number} summaryContext.usage - Total number of governance usage units consumed when running the map/reduce
         *     script
         * @param {number} summaryContext.yields - Total number of yields when running the map/reduce script
         * @param {Object} summaryContext.inputSummary - Statistics about the input stage
         * @param {Object} summaryContext.mapSummary - Statistics about the map stage
         * @param {Object} summaryContext.reduceSummary - Statistics about the reduce stage
         * @since 2015.2
         */
        const summarize = (summaryContext) => {

            

        }

        return {getInputData, reduce, summarize}

    });
