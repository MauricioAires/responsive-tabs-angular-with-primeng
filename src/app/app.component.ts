import { Component } from '@angular/core';
import { TabComponent } from './shared/components/tabs/tab/tab.component';
import { TabsComponent } from './shared/components/tabs/tabs.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TabComponent, TabsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  public tabsLoopExample = [
    {
      label: 'Informações gerais',
      route: 'informacoes-gerais',
    },
    {
      label: 'Assistente comercial',
      route: 'assistente-comercial',
    },
    {
      label: 'Atendimento',
      route: 'Atendimento',
    },
    {
      label: 'Comissão',
      route: 'Comissão',
      disabled: true,
    },
    {
      label: 'Filial',
      route: 'Filial',
    },
    {
      label: 'Informações de acesso',
      route: 'Informações de acesso ',
    },
    {
      label: 'Propostas de crédito',
      route: 'propostas-de-credito',
    },
    {
      label: 'Permissões',
      route: 'Permissões',
    },
    {
      label: 'Histórico de atividade',
      route: 'Histórico de atividade',
    },
  ];

  protected handleActiveIndexChanged(event: any): void {
    console.log(event);
  }
}
