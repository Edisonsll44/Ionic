// This file is required by karma.conf.js and loads recursively all the .spec and framework files

import 'zone.js/testing';
import { getTestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting
} from '@angular/platform-browser-dynamic/testing';

// First, initialize the Angular testing environment.
getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting(),
);



//var response = await _mediator.Send(new BrazeConfigurationIntegrationCommand(credentialPushNotification.ProgramId, credentialPushNotification.Type,credentialPushNotification.AuthUri, parameters),token);
//var response = await _mediator.Send(new BrazeConfigurationIntegrationCommand(Guid.Parse("c5babd91-4783-4660-bd2d-a931bca0b797"), "barzeConfig","miles_accredited", parameters),token);

//var responseIntegration = await _notificationIntegrationRepository.SendEvent("https://rest.iad-07.braze.com/users/track","ef97cddb-fa48-47a5-81c2-572d730738ef", response.Value, IntegrationNotification.BrazeNotification);
