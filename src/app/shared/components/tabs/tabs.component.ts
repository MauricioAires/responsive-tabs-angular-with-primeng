import {
  AfterContentChecked,
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  contentChildren,
  ElementRef,
  HostListener,
  inject,
  output,
  signal,
  viewChild,
} from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';
import { TabComponent } from './tab/tab.component';
// PrimeNG
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { MenuItem } from 'primeng/api';

@UntilDestroy()
@Component({
  selector: 'app-tabs',
  standalone: true,
  imports: [ButtonModule, MenuModule],
  templateUrl: './tabs.component.html',
  styleUrl: './tabs.component.scss',
  host: {
    class: 'tabs',
  },
})
export class TabsComponent implements AfterViewInit, AfterContentChecked {
  // Services
  private elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
  private cdRef = inject(ChangeDetectorRef);
  // Refs
  protected tabsList = viewChild('tabsList', {
    read: ElementRef,
  });
  protected toggle = viewChild('toggle', {
    read: ElementRef,
  });
  protected tabs = contentChildren(TabComponent);
  // Outputs
  public activeIndexChanged = output<unknown>();
  // Properties
  protected activeIndex = signal<string>('');

  protected moreIsVisible = signal<boolean>(false);
  // Defines the button `more items` is active
  protected activeIndexIsHidden = signal<boolean>(false);

  protected itemsMenu = signal<MenuItem[]>([] as MenuItem[]);
  get items(): TabComponent[] {
    return Array.from<TabComponent>(this.tabs());
  }

  @HostListener('window:resize', ['$event'])
  public onWindowResize() {
    this.renderTabs();
  }

  /**
   * Verifica mudanças no conteúdo <ng-content>
   */
  public ngAfterContentChecked(): void {
    this.updateActiveTab();
  }
  /**
   * Indica que a view foi completamente renderizada
   */
  public ngAfterViewInit(): void {
    this.updateActiveTab();
  }

  private updateActiveTab() {
    if (!this.items) return;

    this.items.forEach((tab) => {
      if (this.activeIndex() === '' && tab.isActive()) {
        this.activeIndex.set(tab.title());
      }
    });

    this.renderTabs();
    this.cdRef.detectChanges();
  }

  public setActiveIndex(tabId: string): void {
    this.activeIndex.set(tabId);

    const selectedTab = this.items.find(
      (item) => item.title() === this.activeIndex()
    );

    const tabValue: unknown = selectedTab ? selectedTab.value() : '';

    this.items.forEach((tab) =>
      tab.isActive.set(tab.title() === this.activeIndex())
    );

    this.activeIndexChanged.emit(tabValue);
    this.renderTabs();
  }

  private showTabItem(item: HTMLElement): void {
    item.classList.remove('hidden');
    item.querySelector('button')?.removeAttribute('disabled');
  }
  private hideTabItem(item: HTMLElement): void {
    item.classList.add('hidden');
    item.querySelector('button')?.setAttribute('disabled', 'true');
  }

  public renderTabs(): void {
    const primaryItems =
      this.elementRef.nativeElement.querySelectorAll<HTMLElement>(
        '[data-tab-section="tabs-items"]'
      );

    // Define all items visible and enabled
    primaryItems.forEach(this.showTabItem);

    // Hide Primary-Tabs if they don't fir into the view.
    // The smaller with is the width of the button
    let stopWidth = this.toggle()?.nativeElement.offsetWidth;

    const primaryWidth = this.tabsList()?.nativeElement.offsetWidth;
    const hiddenItems: string[] = [];
    const safetyOffset = 10;
    const flexGap = 32;

    // Reset options menu
    this.itemsMenu.set([]);

    primaryItems.forEach((item) => {
      if (
        primaryWidth - safetyOffset >=
        stopWidth + item.offsetWidth + flexGap
      ) {
        stopWidth += item.offsetWidth + flexGap;
      } else {
        this.hideTabItem(item);

        const tabId = item
          .querySelector('[data-tab-title]')
          ?.getAttribute('id') as string;

        hiddenItems.push(tabId);

        const labelItem =
          item
            .querySelector('[data-tab-title]')
            ?.getAttribute('data-tab-title') ?? '';

        const isDisabled = item
          .querySelector('[data-tab-disabled]')
          ?.getAttribute('data-tab-disabled');

        this.itemsMenu.update((state) => [
          ...state,
          {
            label: labelItem,
            disabled: isDisabled === 'true',
            state: {
              active: tabId === this.activeIndex(),
            },
            command: () => {
              this.setActiveIndex(tabId);
            },
          },
        ]);
      }
    });

    // Set secondary-Tabs visibility
    if (!hiddenItems.length) {
      this.moreIsVisible.set(true);
    } else {
      this.moreIsVisible.set(false);
    }

    this.activeIndexIsHidden.set(hiddenItems.includes(this.activeIndex()));
  }
}
