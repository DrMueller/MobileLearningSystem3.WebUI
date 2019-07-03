export abstract class TableTemplateBaseComponent {
    protected tryFetchingRowId(event: any): string | undefined {
        let target = <any>event.target;
        if (target) {

            while (target.localName !== 'td') {
                target = target.parentNode;
            }

            const rowId = target.getAttribute('data-row-id');
            return rowId;
        }

        return undefined;
    }
}
