/**
 * @NApiVersion 2.x
 * @NScriptType ClientScript
 * @NModuleScope SameAccount
 */

/**************************************************************************************
********
*
* Author: Jobin and Jismi IT Services
*
* Date Created : 21-July-2023

* Created By : Krishnakanth V , Jobin and Jismi
*
* Description : This script is for giving a warning to the (Sales rep) while they create a sales order for the overdue customer.
* 
* 
* REVISION HISTORY
*
* 
*
*************************************************************************************
**********/
define(['N/currentRecord', 'N/record', 'N/search'],
/**
 * @param{currentRecord} currentRecord
 * @param{record} record
 * @param{search} search
 */
function(currentRecord, record, search) {
    

    function saveRecord(context) {

        let currRec = context.currentRecord;
        let cusId = currRec.getValue({
            fieldId: 'entity'
        });
        let cusObj = record.load({
            type: record.Type.CUSTOMER,
            id: cusId,
            isDynamic: true
        });

        let dueAmount = cusObj.getValue({
            fieldId : 'overduebalance'
        });
        if (dueAmount > 0) {
            let msg = confirm("The customer has Overdue balance. Do you want to continue?")

            if (msg) {
                return true;
            }
            else {
                return false;
            }
        }
        else {
            return true;
        }
    }

    return {
        saveRecord: saveRecord
    };

});