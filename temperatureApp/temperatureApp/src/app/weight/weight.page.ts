import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-weight',
  templateUrl: './weight.page.html',
  styleUrls: ['./weight.page.scss'],
  standalone: false,
})
export class WeightPage implements OnInit {

  weight: number = 0;
  result: string = '';
  fromUnit: string = '';
  toUnit: string = '';
  units: string[] = ['Toneladas', 'Kilos', 'Libras', 'Gramos'];
  disabledUnits: { [key: string]: boolean } = {};

  constructor(private navController: NavController) {
    this.units.forEach(unit => {
      this.disabledUnits[unit] = false;
    });
  }

  ngOnInit() {}

  selectFrom(unit: string): void {
    this.fromUnit = unit;

    this.units.forEach(u => {
      this.disabledUnits[u] = u !== unit;
    });

    this.toUnit = '';
  }

  selectTo(unit: string): void {
    if (this.fromUnit === unit) {
      this.toUnit = '';
      this.result = 'No puedes seleccionar la misma unidad en ambas columnas.';
    } else {
      this.toUnit = unit;
      this.calculateConversion();
    }
  }

  calculateConversion(): void {
    if (!this.fromUnit || !this.toUnit) {
      this.result = 'Por favor, selecciona unidades válidas para convertir.';
      return;
    }

    if (this.weight <= 0) {
      this.result = 'Por favor, ingresa un peso válido.';
      return;
    }

    let convertedValue: number = 0;

    if (this.fromUnit === 'Toneladas') {
      convertedValue = this.convertFromToneladas(this.toUnit);
    } else if (this.fromUnit === 'Kilos') {
      convertedValue = this.convertFromKilos(this.toUnit);
    } else if (this.fromUnit === 'Libras') {
      convertedValue = this.convertFromLibras(this.toUnit);
    } else if (this.fromUnit === 'Gramos') {
      convertedValue = this.convertFromGramos(this.toUnit);
    }

    this.result += `De ${this.weight} ${this.fromUnit} a ${this.toUnit} es: ${convertedValue.toFixed(2)} ${this.toUnit}.<br>`;
  }

  convertFromToneladas(to: string): number {
    switch (to) {
      case 'Kilos': return this.weight * 1000;
      case 'Libras': return this.weight * 2204.62;
      case 'Gramos': return this.weight * 1_000_000;
      default: return 0;
    }
  }

  convertFromKilos(to: string): number {
    switch (to) {
      case 'Toneladas': return this.weight / 1000;
      case 'Libras': return this.weight * 2.20462;
      case 'Gramos': return this.weight * 1000;
      default: return 0;
    }
  }

  convertFromLibras(to: string): number {
    switch (to) {
      case 'Toneladas': return this.weight / 2204.62;
      case 'Kilos': return this.weight / 2.20462;
      case 'Gramos': return (this.weight / 2.20462) * 1000;
      default: return 0;
    }
  }

  convertFromGramos(to: string): number {
    switch (to) {
      case 'Toneladas': return this.weight / 1_000_000;
      case 'Kilos': return this.weight / 1000;
      case 'Libras': return (this.weight / 1000) * 2.20462;
      default: return 0;
    }
  }

  clear(): void {
    this.weight = 0;
    this.clearForError();
  }

  clearForError(){
    this.result = '';
    this.fromUnit = '';
    this.toUnit = '';
    this.units.forEach(unit => {
      this.disabledUnits[unit] = false;
    });
  }

  gotoMenu(): void {
    this.navController.navigateBack('/menu');
  }

  onBlur() {
    if (this.result.trim() !== '') {
      this.clearForError();
    }
  }
}
