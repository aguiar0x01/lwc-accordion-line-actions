import { LightningElement, api, track } from 'lwc';
 
export default class Accordion extends LightningElement {

    @track isSectionOpened = false;
    @track _chevronDownIcon = 'utility:chevrondown';
    @track _chevronUpIcon = 'utility:chevronup';

    @api actions = [];
    @api accordionLabel;

    get currentChevronIcon() {
        return this.isSectionOpened ? this._chevronUpIcon : this._chevronDownIcon;
    }

    handleChevronClick(_) {
        this.isSectionOpened = !this.isSectionOpened;
    }

    handleAccordionLabelClick(_) {
        this.isSectionOpened = !this.isSectionOpened;
    }

}