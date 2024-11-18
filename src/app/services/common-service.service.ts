import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonServiceService {

  constructor() { }

  calculateScrollHeight(): string {
    const windowHeight = window.innerHeight;
    const windowWidth = window.innerWidth;
    let scrollHeight: number;

    if (windowWidth > 1600) {
      scrollHeight = windowHeight * 0.65; // Larger screens
    } else if (windowWidth > 1300) {
      scrollHeight = windowHeight * 0.60; // Medium-large screens
    } else if (windowWidth > 1000) {
      scrollHeight = windowHeight * 0.55; // Medium screens
    } else if (windowWidth > 768) {
      scrollHeight = windowHeight * 0.50; // Tablets
    } else if (windowWidth > 480) {
      scrollHeight = windowHeight * 0.45; // Small tablets/large phones
    } else {
      scrollHeight = windowHeight * 0.40; // Small phones
    }

    return `${scrollHeight}px`;
  }

  addResizeListener(onResizeCallback: (height: string) => void): () => void {
    const listener = () => {
      const height = this.calculateScrollHeight();
      onResizeCallback(height);
    };

    window.addEventListener('resize', listener);
    return listener; // Return the listener to remove it later if needed
  }

  formatdate(date:any){
    const dateObj = new Date(date);

    const day = String(dateObj.getDate()).padStart(2, '0');
    const month = String(dateObj.getMonth() + 1).padStart(2, '0'); // getMonth() is zero-based
    const year = dateObj.getFullYear();

    const formattedDate = `${day}/${month}/${year}`;
    return formattedDate
  }


}
