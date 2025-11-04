import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ChatContextService {
  private orderIdSubject = new BehaviorSubject<number | null>(null);
  orderId$ = this.orderIdSubject.asObservable();

  setOrderId(id: number) {
    console.log('🟢 OrderId stored in ChatContext:', id);
    this.orderIdSubject.next(id);
  }

  getOrderId(): number | null {
    return this.orderIdSubject.value;
  }
}
