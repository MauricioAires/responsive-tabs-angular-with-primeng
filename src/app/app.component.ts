import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { TabComponent } from './shared/components/tabs/tab/tab.component';
import { TabsComponent } from './shared/components/tabs/tabs.component';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter, take, tap } from 'rxjs/operators';

interface Tab {
  label: string;
  route: string;
  active: boolean;
  disabled?: boolean;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TabComponent, TabsComponent, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  // Services
  private router = inject(Router);
  // Properties
  public tabsLoopExample = signal<Tab[]>([
    {
      label: 'Informações gerais',
      route: 'access-information',
      active: false,
    },
    {
      label: 'Assistente comercial',
      route: 'sales-assistant',
      active: false,
    },
    {
      label: 'Atendimento',
      route: 'service',
      active: false,
    },
    {
      label: 'Comissão',
      route: 'commission',
      disabled: true,
      active: false,
    },
    {
      label: 'Filial',
      route: 'branch',
      active: false,
    },
    {
      label: 'Informações de acesso',
      route: 'general-information',
      active: false,
    },
    {
      label: 'Propostas de crédito',
      route: 'credit-proposals',
      active: false,
    },
    {
      label: 'Permissões',
      route: 'permissions',
      active: false,
    },
    {
      label: 'Histórico de atividade',
      route: 'activity-history',
      active: false,
    },
  ]);

  public ngOnInit(): void {
    this.router.events
      .pipe(
        filter(
          (event): event is NavigationEnd => event instanceof NavigationEnd
        ),
        take(1)
      )
      .subscribe(({ url, urlAfterRedirects }) => {
        const currentURL = url === '/' ? urlAfterRedirects : url;

        this.tabsLoopExample.update((state) =>
          state.map((item) => ({
            ...item,
            active: currentURL.endsWith(item.route),
          }))
        );
      });
  }

  protected handleActiveIndexChanged(event: any): void {
    this.router.navigateByUrl(event.route);
  }
}
