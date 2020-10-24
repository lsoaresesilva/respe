import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { RastrearErrosPythonService } from './rastrear-erros-python.service';

@Injectable()
export class AppGlobalErrorhandler implements ErrorHandler {
  constructor(private injector: Injector) {}

  handleError(error) {
    if (error.$py_error !== undefined) {
      const servicoRastreioErrosPython = this.injector.get(RastrearErrosPythonService);
      servicoRastreioErrosPython.notificar(error);
    }
  }
}
