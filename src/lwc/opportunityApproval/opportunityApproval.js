import { LightningElement, track } from 'lwc';

const ACTIONS_LABELS = {
    Review: 'Revisar',
    Approve: 'Aprovar',
    Reject: 'Reprovar'
};

const BASE_ACCORDION_LINE_ACTIONS = [
    {
        targetId: null,
        buttonHandler: () => {},
        buttonLabel: ACTIONS_LABELS.Review,
        sldsButtonClass: "slds-button slds-button_neutral"
    },
    {
        targetId: null,
        buttonHandler: () => {},
        buttonLabel: ACTIONS_LABELS.Approve,
        sldsButtonClass: "slds-button slds-button_brand",
    },
    {
        targetId: null,
        buttonHandler: () => {},
        buttonLabel: ACTIONS_LABELS.Reject,
        sldsButtonClass: "slds-button slds-button_destructive"
    }
];

export default class OpportunityApproval extends LightningElement {

    opportunities = [
        {
            Id: "123",
            Name: "Opportunity 123"
        },
        {
            Id: "124",
            Name: "Opportunity 124"
        },
        {
            Id: "125",
            Name: "Opportunity 125",
        }
    ]

    @track targetOpportunities = [];

    accordionGroupLabel = 'Aprovação de Oportunidades';

    connectedCallback() {
        this.injectDynamicLineActions({ records: this.opportunities });
    }

    createButtonHandler({ targetId, buttonLabel }) {
        const APPROVAL_ACTIONS = [ACTIONS_LABELS.Approve, ACTIONS_LABELS.Reject];

        return function(event) {
            if (APPROVAL_ACTIONS.includes(buttonLabel.toString())) {
                // Call Apex class ProcessWorkItems or similar
                console.log(`[Approval][ButtonLabel = ${buttonLabel}][TargetId = ${targetId}]`);
            }
            else if (buttonLabel == ACTIONS_LABELS.Review) {
                console.log(`[Review][ButtonLabel = ${buttonLabel}][TargetId = ${targetId}]`);
            }
        };
    }

    injectDynamicLineActions({ records }) {
        if (!records) return [];
        const recordsCopy = JSON.parse(JSON.stringify(records));
    
        recordsCopy.forEach((record) => {
            const lineActionsCopy = BASE_ACCORDION_LINE_ACTIONS.map((lineAction) => {
                const targetId = record.Id.toString();
                const buttonHandler = this.createButtonHandler({
                    targetId,
                    buttonLabel: lineAction.buttonLabel
                });
    
                return { ...lineAction, targetId, buttonHandler };
            });
    
            record.AccordionLineActions = [...lineActionsCopy];
            this.targetOpportunities.push(record);
        });
    }
    
    // injectDynamicLineActions(records) {
    //     if (!records) return [];
    //     let recordsCopy = JSON.parse(JSON.stringify(records));

    //     for (let i = 0; i < recordsCopy.length; i++) {
    //         let record = recordsCopy[i];
    //         let lineActionsCopy = JSON.parse(JSON.stringify(BASE_ACCORDION_LINE_ACTIONS));

    //         for (let j = 0; j < lineActionsCopy.length; j++) {
    //             let lineAction = lineActionsCopy[j];
    //             lineAction.targetId = record.Id.toString();
    //             lineAction.buttonHandler = this.createButtonHandler({
    //                 targetId: lineAction.targetId,
    //                 buttonLabel: lineAction.buttonLabel
    //             });
    //         }
    //         record.AccordionLineActions = [...lineActionsCopy]
    //         this.targetOpportunities.push(record);
    //     }
    // }
}