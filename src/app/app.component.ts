import { DecimalPipe } from '@angular/common';
import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [DecimalPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'simple-calculator';
  screenFunc: any = 'operation';
  screenValue: number = 0;
  numberInput: string = 'noValue';
  firstInputNumber: number = 0;
  secondInputNumber: number = 0;

  onClickValue(val: string, type: any) {
    if (type == 'number') {
      this.numberClicked(val);
    } else if (type == 'function') {
      this.funcClicked(val);
    }
  }

  numberClicked(val: string) {
    if (val === '.' && this.numberInput.includes('.')) {
      return; // Prevent multiple decimals
    }
    if (this.numberInput != 'noValue') {
      this.numberInput += val;
    } else {
      this.numberInput = val;
    }
    this.screenValue = parseFloat(this.numberInput);
  }

  funcClicked(val: string) {
    if (val == 'c') {
      this.onClear();
    } else if (this.screenFunc == 'operation') {
      this.firstInputNumber = this.screenValue;
      this.screenValue = 0;
      this.numberInput = 'noValue';
      this.screenFunc = val;
    } else if (this.screenFunc != 'operation') {
      this.secondInputNumber = this.screenValue;
      this.operation(val);
    }
  }

  operation(val: string) {
    if (this.screenFunc == '+') {
      const total = this.firstInputNumber + this.secondInputNumber;
      this.totalAssignment(total, val);
    }
    if (this.screenFunc == '-') {
      const total = this.firstInputNumber - this.secondInputNumber;
      this.totalAssignment(total, val);
    }
    if (this.screenFunc == 'x') {
      const total = this.firstInputNumber * this.secondInputNumber;
      this.totalAssignment(total, val);
    }
    if (this.screenFunc == '/') {
      const total = this.firstInputNumber / this.secondInputNumber;
      this.totalAssignment(total, val);
    }
    if (this.screenFunc == '%') {
      const total = this.firstInputNumber % this.secondInputNumber;
      this.totalAssignment(total, val);
    }
    if (this.screenFunc == '/' && this.secondInputNumber === 0) {
      this.screenValue = Infinity; // or display "Error"
      return;
    }
  }

  totalAssignment(total: number, val: string) {
    this.screenValue = total;
    this.firstInputNumber = total;
    this.secondInputNumber = 0;
    this.numberInput = 'noValue';
    this.screenFunc = val;
    if (val == '=') {
      this.onEqualClicked();
    }
  }

  onEqualClicked() {
    this.firstInputNumber = 0;
    this.secondInputNumber = 0;
    this.numberInput = 'noValue';
    this.screenFunc = 'operation';
  }

  onClear() {
    this.firstInputNumber = 0;
    this.secondInputNumber = 0;
    this.numberInput = 'noValue';
    this.screenValue = 0;
    this.screenFunc = 'operation';
  }
}
