import {
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
import { EmitValue, TabComponent } from './tab/tab.component';
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
export class TabsComponent implements AfterViewInit {
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
  public activeIndexChanged = output<EmitValue>();
  // Properties
  protected activeIndex = signal<number>(0);

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

  public ngAfterViewInit(): void {
    if (!this.items) return;

    this.items.forEach((tab, index) => {
      if (this.activeIndex() === undefined && tab.isActive()) {
        this.activeIndex.set(index);
      }
    });

    this.renderTabs();
    this.cdRef.detectChanges();
  }

  public setActiveIndex(index: number): void {
    this.activeIndex.set(index);

    const selectedTab = this.items[index];
    const tabValue: EmitValue = selectedTab ? selectedTab.value() : '';

    this.items.forEach((tab, i) => tab.isActive.set(i === index));

    this.activeIndexChanged.emit(tabValue);
    this.renderTabs();
  }

  private showTabItem(item: HTMLElement): void {
    item.classList.remove('tabs__item--hidden');
    item.querySelector('button')?.removeAttribute('disabled');
  }
  private hideTabItem(item: HTMLElement): void {
    item.classList.add('tabs__item--hidden');
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
    const hiddenItems: number[] = [];
    const safetyOffset = 10;
    const flexGap = 25;

    // Reset options menu
    this.itemsMenu.set([]);

    primaryItems.forEach((item, index) => {
      if (
        primaryWidth - safetyOffset >=
        stopWidth + item.offsetWidth + flexGap
      ) {
        stopWidth += item.offsetWidth + flexGap;
      } else {
        this.hideTabItem(item);

        hiddenItems.push(index);

        const labelItem =
          item
            .querySelector('[data-tab-title]')
            ?.getAttribute('data-tab-title') ?? '';

        this.itemsMenu.update((state) => [
          ...state,
          {
            label: labelItem,
            command: () => {
              this.setActiveIndex(index);
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
