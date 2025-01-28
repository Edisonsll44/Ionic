import { Injectable } from "@angular/core";
import { Preferences } from "@capacitor/preferences";


@Injectable({
  providedIn: 'root'
})

export class SessionService {

  constructor(){}

  async createSesion(id: string, valor: number) {
    await Preferences.set({
      key: id,
      value: valor.toString()
    });
  }

  async getSesion(id: string) {
    const item = await Preferences.get({ key: id });
    return item.value;
  }

  async closeSession() {
    await Preferences.clear();
  }

}
