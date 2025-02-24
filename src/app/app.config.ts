import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [provideAnimations(), provideRouter(routes)],
};

/**
 * @TODO Mauricio Aires
 *
 * 1. adicionar navegação utilizando o teclado
 * 2. avaliar a acessibilidade.
 */
