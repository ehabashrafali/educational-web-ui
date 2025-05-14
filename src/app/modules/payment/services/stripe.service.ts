import { Injectable } from '@angular/core';
import { loadStripe, Stripe } from '@stripe/stripe-js';

@Injectable({
  providedIn: 'root',
})
export class StripeService {
  
  private stripePromise = loadStripe('your-publishable-key-here'); // Get from Stripe Dashboard

  async getStripe(): Promise<Stripe | null> {
    return await this.stripePromise;
  }

  constructor() { }

}