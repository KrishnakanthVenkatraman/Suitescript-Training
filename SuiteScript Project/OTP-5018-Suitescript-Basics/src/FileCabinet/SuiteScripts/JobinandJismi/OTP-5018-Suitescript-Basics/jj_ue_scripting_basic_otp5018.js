/**
 * @NApiVersion 2.1
 * @NScriptType UserEventScript
 */
define(['N/record', 'N/search'],
    /**
 * @param{record} record
 * @param{search} search
 */
    (record, search) => {
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

          /* var cusRecord = record.create({
                type: record.Type.CUSTOMER,
                isDynamic:true,
                defaultValues:{
                  subsidiary:3
                }
           
        });
        cusRecord.setValue({
         fieldId: 'companyname',
         value: 'Hehe boi',
        
         });

         let cusRecId = cusRecord.save({
            enableSourcing: true,
            ignoreMandatoryFields: true
         });

         log.debug("Record created", cusRecId);*/
         let cusRecord = record.create({

            type: record.Type.CUSTOMER,

            isDynamic: true,

            defaultValues: {

                subsidiary: 1

            }

        });



        cusRecord.setValue({

            fieldId:'companyname',

            value:'American Tourister'

        });



        let cusRecId = cusRecord.save({

            enableSourcing: true,

            ignoreMandatoryFields: true

        });

        log.debug("Record Created", cusRecId);

        

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
