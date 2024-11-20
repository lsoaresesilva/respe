import { NgModule, Injector } from '@angular/core';
import { CommonModule } from '@angular/common';

import { setAppInjector } from './app-injector'


@NgModule({
  declarations: [],
  imports: [
    CommonModule
    
  ]
})
export class DocumentModule { 

    constructor(injector: Injector) {
        setAppInjector(injector);
    }

}
