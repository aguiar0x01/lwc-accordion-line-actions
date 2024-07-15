import { LightningElement } from 'lwc';

export default class SampleContent extends LightningElement {
    tableData = [];

    connectedCallback() {
        for (let i = 1; i <= 9; i++) {
            this.tableData.push({
                id: i,
                col1: `Linha ${i}`,
                col2: `Valor ${i * 2}`,
                col3: `Texto ${i * 3}`,
                col4: `Opção ${i % 2 === 0 ? 'A' : 'B'}`,
                col5: `Outro Valor ${i * 4}`
            });
        }
    }
}
