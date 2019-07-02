import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FactEditEntry } from '../../models';

@Component({
  selector: 'app-fact-edit',
  templateUrl: './fact-edit.component.html',
  styleUrls: ['./fact-edit.component.scss']
})
export class FactEditComponent implements OnInit {
  public editEntry: FactEditEntry;

  constructor(private route: ActivatedRoute) { }

  public ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.editEntry = <FactEditEntry>data['fact'];
    });
  }
}
