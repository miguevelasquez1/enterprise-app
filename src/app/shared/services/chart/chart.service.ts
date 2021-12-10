import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ChartService {
  public points: Array<number>;

  constructor() {
    this.points = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  }

  getPoints(): number[] {
    return this.points;
  }

  addPoint(month: number): void {
    this.points[month]++;
  }

  deletePoint(date: string): void {
    const yearNow = new Date().getFullYear();
    const rutaDate = new Date(date);
    const month = rutaDate.getMonth();
    const year = rutaDate.getFullYear();

    if (year === yearNow) {
      this.points[month] -= 1;
    }
  }
}
