import { TestBed } from '@angular/core/testing';

import { SocketServiceService } from './socket.service';

describe('SocketServiceService', () => {
  let service: SocketService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SocketServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
