import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-distance',
  templateUrl: './distance.page.html',
  styleUrls: ['./distance.page.scss'],
  standalone: false,
})
export class DistancePage implements OnInit {
  distance: number = 0;
  message: string = '';
  fromUnit: string = '';
  toUnit: string = '';
  result: string = '';
  disabled: boolean = false;
  units: string[] = ['Km', 'M', 'Cm', 'Mm'];
  fromSelectionDisabled: any = { Km: false, M: false, Cm: false, Mm: false };
  toSelectionDisabled: any = { Km: false, M: false, Cm: false, Mm: false };

  constructor(private navController: NavController) {}

  ngOnInit() {}

  selectFrom(unit: string) {
    this.fromUnit = unit;

    Object.keys(this.fromSelectionDisabled).forEach((key) => {
      this.fromSelectionDisabled[key] = key !== unit;
    });

    Object.keys(this.toSelectionDisabled).forEach((key) => {
      this.toSelectionDisabled[key] = key === unit;
    });
  }

  calculateTo(unit: string) {
    if (!this.fromUnit || !this.distance) {
      this.result = 'Por favor, selecciona una unidad válida y escribe una distancia.';
      return;
    }

    this.toUnit = unit;
    this.toSelectionDisabled[unit] = true;
    const factor = this.getConversionFactor(this.fromUnit, this.toUnit);

    if (factor) {
      const convertedValue = this.distance * factor;
      this.result += `De ${this.distance} ${this.fromUnit} a ${this.toUnit} son: ${convertedValue} ${this.toUnit}.<br>`;
    } else {
      this.result = 'Por favor, selecciona una unidad de destino válida.';
    }
  }

  getConversionFactor(fromUnit: string, toUnit: string): number | null {
    const conversionFactors: any = {
      Km: { M: 1000, Cm: 100000, Mm: 1000000 },
      M: { Km: 0.001, Cm: 100, Mm: 1000 },
      Cm: { Km: 0.00001, M: 0.01, Mm: 10 },
      Mm: { Km: 0.000001, M: 0.001, Cm: 0.1 },
    };
    return conversionFactors[fromUnit]?.[toUnit] || null;
  }

  gotoMenu() {
    this.navController.navigateBack('/menu');
  }

  clear(): void {
    this.distance = 0;
    this.clearForError();
  }

  clearForError(){
    this.fromUnit = '';
    this.toUnit = '';
    this.result = '';

    Object.keys(this.fromSelectionDisabled).forEach((key) => {
      this.fromSelectionDisabled[key] = false;
    });
    Object.keys(this.toSelectionDisabled).forEach((key) => {
      this.toSelectionDisabled[key] = false;
    });
  }

  onBlur() {
    if (this.result.trim() !== '') {
      this.clearForError();
    }
  }
}
