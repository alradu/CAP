
const cds = require('@sap/cds')

/**
 * Implementation for Risk Management service defined in ./risk-service.cds
 */
module.exports = cds.service.impl(async function() {
    this.after('READ', 'Risks', risksData => {
        const risks = Array.isArray(risksData) ? risksData : [risksData];
        risks.forEach(risk => {
            if (risk.impact >= 100000) {
                risk.criticality = 1;
            } else {
                risk.criticality = 2;
            }
        });
    });
});

// Because your file is called risk-service.js and, therefore, has the same name as your application definition file risk-service.cds, CAP automatically treats it as a handler file for the application defined in there. 

// CAP exposes several events and you can easily write handlers like the above.

// In this case, the event after is triggered after a READ was carried out for our Risks entity. 

// In your custom handler, you get all the data (in this case, all the risks) that was read according to the query. 

// You can loop over each of them and, if needed, adjust the data of the response. 

// In this case, you change the value of the criticality when the impact is bigger than 100000. 

// The new values for criticality are then part of the response to the read request.

// So, this affects the application’s response, but how does it translate into a changed UI? 

// For this, you have got to go back to the annotations you created in Create a CAP-Based Application where you find your srv/risks-service-ui.cds file. 

// There, you had the two columns prio and impact annotated with an additional Criticality annotation. 

// This annotation points to the criticality property of your application.