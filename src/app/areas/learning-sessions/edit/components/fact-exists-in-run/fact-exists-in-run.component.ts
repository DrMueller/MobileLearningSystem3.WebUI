import { Component, Input } from '@angular/core';
import { TableTemplateBaseComponent } from 'src/app/shared/tables/components/table-base-template';

@Component({
  selector: 'app-fact-exists-in-run',
  templateUrl: './fact-exists-in-run.component.html',
  styleUrls: ['./fact-exists-in-run.component.scss']
})
export class FactExistsInRunComponent extends TableTemplateBaseComponent {
  @Input() public existsInRun: boolean;
}
