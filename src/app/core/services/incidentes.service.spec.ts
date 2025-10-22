/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { IncidentesService } from './incidentes.service';

describe('Service: Incidentes', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IncidentesService]
    });
  });

  it('should ...', inject([IncidentesService], (service: IncidentesService) => {
    expect(service).toBeTruthy();
  }));
});
