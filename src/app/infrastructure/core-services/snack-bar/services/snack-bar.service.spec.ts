import { TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material';
import { provideMock } from 'src/app/testing-extensions/functions';

import { SnackBarService } from './snack-bar.service';

describe('SnackBarService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      provideMock(MatSnackBar)
    ]
  }));

  it('should be created', () => {
    const service: SnackBarService = TestBed.get(SnackBarService);
    expect(service).toBeTruthy();
  });
});
