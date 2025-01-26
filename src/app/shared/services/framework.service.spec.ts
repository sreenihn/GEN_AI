/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { FrameworkService } from './framework.service';

describe('Service: Framework', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FrameworkService]
    });
  });

  it('should ...', inject([FrameworkService], (service: FrameworkService) => {
    expect(service).toBeTruthy();
  }));
});
