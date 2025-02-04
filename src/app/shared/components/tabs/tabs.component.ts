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
export class TabsComponent implements AfterViewChecked {
  // Services
  private elementRef =
    inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
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
  public activeIndexChanged = output<number>();
  // Properties
  protected headerOffset = signal<number>(0);
  protected activeIndex = signal<number>(0);
  protected resizeTimeout = signal<number>(0);

  protected dropdownIsVisible = signal<boolean>(false);
  protected moreIsVisible = signal<boolean>(false);
  protected activeIndexIsHidden = signal<boolean>(false);

  protected itemsForTabs = signal<MenuItem[] | undefined>(undefined);
  get items(): TabComponent[] {
    return Array.from<TabComponent>(this.tabs());
  }

  @HostListener('window:resize', ['$event'])
  public onWindowResize() {
    this.renderTabs();
    this.dropdownIsVisible.set(false);
  }
  @HostListener('window:scroll', ['$event'])
  public onWindowScroll() {
    this.dropdownIsVisible.set(false);
  }
  @HostListener('document:keydown.escape', ['$event'])
  public onKeydownHandler(): void {
    this.dropdownIsVisible.set(false);
  }
  @HostListener('document:click', ['$event'])
  public onDocumentClick($event: MouseEvent): void {
    const target = $event.target as Node | null;

    const clickInside = this.elementRef.contains(target) || false;

    if (this.dropdownIsVisible && !clickInside) {
      this.dropdownIsVisible.set(false);
      this.toggle()?.nativeElement.blur();
    }
  }

  public ngAfterViewChecked(): void {
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

    this.items.forEach((tab, i) => {
      tab.isActive.set(i === this.activeIndex());
    });

    this.activeIndexChanged.emit(this.activeIndex());
    this.dropdownIsVisible.set(false);
    this.renderTabs();
  }

  private showItem(item: HTMLElement): void {
    item.classList.remove('tabs__item--hidden');
    item.querySelector('button')?.removeAttribute('disabled');
  }

  public toggleDropdown(): void {
    this.dropdownIsVisible.set(!this.dropdownIsVisible());
  }

  public renderTabs(): void {
    /**
     * I can't use a viewChild for the .tabs_item because they are in two places,
     * but maybe I could use two variables
     */

    const primaryItems = this.elementRef.querySelectorAll<HTMLElement>(
      '[data-tab-section="tabs-items"]'
    );
    const secondaryItems = this.elementRef.querySelectorAll<HTMLElement>(
      '[data-tab-section="more-items"]'
    );

    // Define all items visible and enabled
    primaryItems.forEach(this.showItem);
    secondaryItems.forEach(this.showItem);

    // Hide Primary-Tabs if they don't fir into the view.
    // The smaller with is the width of the button
    let stopWidth = this.toggle()?.nativeElement.offsetWidth;

    const primaryWidth = this.tabsList()?.nativeElement.offsetWidth;
    const hiddenItems: number[] = [];
    const safetyOffset = 10;
    const flexGap = 25;

    primaryItems.forEach((item, index) => {
      if (
        primaryWidth - safetyOffset >=
        stopWidth + item.offsetWidth + flexGap
      ) {
        stopWidth += item.offsetWidth + flexGap;
      } else {
        item.classList.add('tabs__item--hidden');
        item.querySelector('button')?.setAttribute('disabled', 'true');
        hiddenItems.push(index);
      }
    });

    // Set secondary-Tabs visibility

    if (!hiddenItems.length) {
      this.moreIsVisible.set(true);
    } else {
      this.moreIsVisible.set(false);

      secondaryItems.forEach((item, index) => {
        if (!hiddenItems.includes(index)) {
          item.classList.add('tabs__item--hidden');
          item.querySelector('button')?.setAttribute('disabled', 'true');
        }
      });
    }

    this.activeIndexIsHidden.set(hiddenItems.includes(this.activeIndex()));
  }
}
