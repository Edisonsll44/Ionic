import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-temperature',
  templateUrl: './temperature.page.html',
  styleUrls: ['./temperature.page.scss'],
  standalone: false,
})
export class TemperaturePage implements OnInit {

  temperature: number = 0;
  message: string = '';
  fromSelection: any = { C: false, F: false, K: false };
  toSelection: any = { C: false, F: false, K: false };
  result: string = '';
  fromUnit: string = '';
  toUnit: string = '';
  disabled: boolean = false;

  constructor(private navController: NavController) {}

  ngOnInit() {}

  selectFrom(unit: string) {
    this.fromUnit = unit;
    this.disabled = true;

    Object.keys(this.fromSelection).forEach(key => {
      this.fromSelection[key] = key === unit;
    });

    Object.keys(this.toSelection).forEach(key => {
      this.toSelection[key] = false;
    });

    this.calculateTo('');
  }

  calculateTo(toUnit: string) {
    if (this.temperature === null || this.temperature === undefined) {
      this.result = 'Por favor ingresa una temperatura.';
      return;
    }

    if (!this.fromUnit) {
      this.result = 'Por favor, selecciona una unidad de origen.';
      return;
    }

    if (!toUnit) {
      this.result = 'Por favor, selecciona una unidad de destino válida.';
      return;
    }

    if (!this.result.includes('De')) {
      this.result = '';
    }

    const fromUnitName = this.getTemperatureName(this.fromUnit);
    const toUnitName = this.getTemperatureName(toUnit);

    const convertedValue = this.convertTemperature(this.temperature, this.fromUnit, toUnit);

    this.result += `De ${this.temperature} grados ${fromUnitName} a grados ${toUnitName} son: ${convertedValue.toFixed(2)} grados.<br>`;
  }

  getTemperatureName(unit: string): string {
    return unit === 'C' ? 'Celsius'
         : unit === 'F' ? 'Fahrenheit'
         : 'Kelvin';
  }

  convertTemperature(temp: number, fromUnit: string, toUnit: string): number {
    if (fromUnit === 'C') {
      return toUnit === 'F' ? (temp * 9 / 5) + 32
           : toUnit === 'K' ? temp + 273.15
           : temp;
    }
    if (fromUnit === 'F') {
      return toUnit === 'C' ? (temp - 32) * 5 / 9
           : toUnit === 'K' ? ((temp - 32) * 5 / 9) + 273.15
           : temp;
    }
    if (fromUnit === 'K') {
      return toUnit === 'C' ? temp - 273.15
           : toUnit === 'F' ? ((temp - 273.15) * 9 / 5) + 32
           : temp;
    }
    return temp;
  }

  gotoMenu() {
    this.navController.navigateBack('/menu');
  }

  clear() {
    this.temperature = 0;
    this.result = '';
    this.fromUnit = '';
    this.toUnit = '';
    this.disabled = false;

    Object.keys(this.fromSelection).forEach(key => this.fromSelection[key] = false);
    Object.keys(this.toSelection).forEach(key => this.toSelection[key] = false);
  }

  clearForError() {
    this.clear();
  }

  onBlur() {
    if (this.result.trim() !== '') {
      this.clearForError();
    }
  }
}
