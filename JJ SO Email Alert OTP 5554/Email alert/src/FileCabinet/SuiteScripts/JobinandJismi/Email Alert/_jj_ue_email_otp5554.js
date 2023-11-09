/**
 *
 * /**
 *  *
 *  *USEREVENT SCRIPT TO GIVE AN EMAIL ALERT TO SALES MANAGERS OF SALES REP THAT THERE IS SALES ORDER CREATED FOR CUSTOMERS WHO HAVE OVERDUE
 *  *
 *  *
 *  * Author:Jobin and Jismi IT Services
 *  *
 *  * Date Created:11/08/23
 *  *
 *  * Created by:Krishnakanth V, Jobin and Jismi IT Services
 *  *
 *  * Description:Give a warning to the (Sales rep) while they create a sales order for the overdue customer
 *  *
 *  *REVISION HISTORY
 *  *
 * @NApiVersion 2.1
 * @NScriptType UserEventScript
 */
define(['N/email', 'N/record', 'N/search'],
    /**
 * @param{email} email
 * @param{record} record
 * @param{search} search
     * @param{runtime} runtime
 */
    (email, record, search) => {

        const afterSubmit = (scriptContext) => {

            var currentRecord = scriptContext.newRecord;
            var name = currentRecord.getValue({
                fieldId: 'entity'
            });
            
            log.debug("name",name)//
            var c1=record.load({
                type:record.Type.CUSTOMER,
                id:name,
            })
            var sal=c1.getValue({
                fieldId:'salesrep'
            })
            var sal_email = c1.getText({
                fieldId:'email'
            })
            log.debug("salesrep",sal)//
            log.debug("salesrep email",sal_email);

            var c2=record.load({
                type:record.Type.EMPLOYEE,
                id:sal
            })
            var sup=c2.getValue({
                fieldId:'supervisor'
            })
            log.debug("supervisor",sup)//

            var c3=record.load({
                type:record.Type.EMPLOYEE,
                id:sup
            })
            var ema=c3.getText({
                fieldId:'email'
            })
            log.debug("email",ema)//

            var mySearch = search.load({
                id: 'customsearch_jj_ss_overdue_otp5553'
            });
            mySearch.run().each(function (result) {
                result.getValue({
                    name: 'entityid'
                });
                var s2=result.id
              
                var a = scriptContext.newRecord.id;
              

                if (name == s2) {

                    var senderId=sal;                   
                    var recipientId=ema;
                    var salesOrderUrl = 'https://td2832007.app.netsuite.com/app/accounting/transactions/salesord.nl?id=' + a + '&whence=';

                    
                    log.debug("sender id",senderId);//

                    email.send({
                        author:senderId,
                        recipients :recipientId ,
                        subject:'sales order created for customer having overdue balance',
                        body: 'Sales Order Details: <a href="' + salesOrderUrl + '">View Sales Order</a>', 
                        isHTML: true,
                    })
                    

                }

                return true;

            })

        }

        return {afterSubmit}

    });
