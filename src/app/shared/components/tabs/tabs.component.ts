import {
  AfterViewChecked,
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
import { TabComponent } from './tab/tab.component';
// PrimeNG
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { BadgeModule } from 'primeng/badge';

@Component({
  selector: 'app-tabs',
  standalone: true,
  imports: [ButtonModule, MenuModule, BadgeModule],
  templateUrl: './tabs.component.html',
  styleUrl: './tabs.component.scss',
  host: {
    class: 'tabs',
  },
})
export class TabsComponent implements AfterViewChecked {
  // Services
  private elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
  private cdRef = inject(ChangeDetectorRef);
  // Refs
  protected tabsListRef = viewChild('tabsList', {
    read: ElementRef,
  });
  protected toggleButtonRef = viewChild('toggle', {
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

  protected menuItems = signal<MenuItem[]>([] as MenuItem[]);
  get items(): TabComponent[] {
    return Array.from<TabComponent>(this.tabs());
  }

  @HostListener('window:resize', ['$event'])
  public onWindowResize() {
    this.renderTabs();
  }

  /**
   * Executed after each  view and  DOM check.
   */
  public ngAfterViewChecked(): void {
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
    let stopWidth = this.toggleButtonRef()?.nativeElement.offsetWidth;

    const primaryWidth = this.tabsListRef()?.nativeElement.offsetWidth;
    const hiddenItems: string[] = [];
    const safetyOffset = 10;
    const flexGap = 32;

    // Reset options menu
    this.menuItems.set([]);

    primaryItems.forEach((item) => {
      if (
        primaryWidth - safetyOffset >=
        stopWidth + item.offsetWidth + flexGap
      ) {
        stopWidth += item.offsetWidth + flexGap;
      } else {
        this.hideTabItem(item);

        const tabItem = item.querySelector('[role="tab"]');

        const tabLabel = tabItem?.getAttribute('data-tab-title') ?? '';
        const tabId = tabItem?.getAttribute('id') as string;
        const tabBadge = tabItem?.getAttribute('data-tab-badge') as string;
        const tabIsDisabled =
          tabItem?.getAttribute('data-tab-disabled') === 'true';

        hiddenItems.push(tabId);

        this.menuItems.update((state) => [
          ...state,
          {
            label: tabLabel,
            disabled: tabIsDisabled,
            state: {
              active: tabId === this.activeIndex(),
            },
            badge: tabBadge,
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
