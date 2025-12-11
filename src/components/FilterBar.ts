/**
 * FilterBar Component (prototype)
 * Renders chip-based filters with an add-input and basic controls.
 */

import type { Filter } from '../types';

export interface FilterBarEvents {
  onAddFilter: (raw: string) => void;
  onToggleFilter: (id: string) => void;
  onRemoveFilter: (id: string) => void;
  onClearAll: () => void;
}

export type FilterBarVariant = 'standalone' | 'inline';

export class FilterBar {
  private container: HTMLElement;
  private events: FilterBarEvents;
  private filters: Filter[];
  private inputEl!: HTMLInputElement;
  private variant: FilterBarVariant;

  constructor(container: HTMLElement, events: FilterBarEvents, initialFilters: Filter[] = [], variant: FilterBarVariant = 'standalone') {
    this.container = container;
    this.events = events;
    this.filters = initialFilters;
    this.variant = variant;
    this.render();
    this.bindEvents();
  }

  private render(): void {
    this.container.innerHTML = `
      <div class="filters-bar ${this.variant === 'inline' ? 'filters-bar--inline' : ''}">
        <div class="filters-bar__input">
          <svg class="filter-input__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="11" cy="11" r="8"/>
            <path d="M21 21l-4.35-4.35"/>
          </svg>
          <input
            type="text"
            class="filter-input__field"
            id="chip-filter-input"
            placeholder="Add filter (Enter, , or ;)"
            autocomplete="off"
          />
        </div>
        <div class="filters-bar__chips" id="filters-chip-container">
          ${this.renderChips()}
        </div>
        ${this.variant === 'inline' ? '' : `
          <div class="filters-bar__actions">
            <button class="btn btn--secondary btn--compact" id="filters-clear" ${this.filters.length ? '' : 'disabled'}>
              Clear all
            </button>
          </div>
        `}
      </div>
    `;

    this.inputEl = this.container.querySelector('#chip-filter-input') as HTMLInputElement;
  }

  private renderChips(): string {
    if (!this.filters.length) {
      return '<span class="filters-bar__empty">No filters active</span>';
    }

    return this.filters.map(filter => `
      <button
        class="filter-chip ${filter.enabled ? 'filter-chip--active' : 'filter-chip--inactive'}"
        data-id="${filter.id}"
        title="Click to toggle"
      >
        <span class="filter-chip__indicator" aria-hidden="true"></span>
        <span class="filter-chip__label">${this.escapeHtml(filter.raw)}</span>
        <span class="filter-chip__remove" data-remove="${filter.id}" aria-label="Remove filter">&times;</span>
      </button>
    `).join('');
  }

  private bindEvents(): void {
    // Add filter on Enter, comma, semicolon
    this.inputEl.addEventListener('keydown', (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ',' || e.key === ';') {
        e.preventDefault();
        this.commitInput();
      }
    });

    // Toggle/remove chips (event delegation)
    this.container.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      const removeId = target.dataset.remove;
      if (removeId) {
        e.stopPropagation();
        this.events.onRemoveFilter(removeId);
        return;
      }

      const chip = target.closest('.filter-chip') as HTMLElement | null;
      if (chip && chip.dataset.id) {
        this.events.onToggleFilter(chip.dataset.id);
      }
    });

    // Clear all
    this.container.querySelector('#filters-clear')?.addEventListener('click', () => {
      this.events.onClearAll();
    });
  }

  /**
   * Update filters and re-render chips
   */
  setFilters(filters: Filter[]): void {
    this.filters = filters;
    const chips = this.container.querySelector('#filters-chip-container');
    if (chips) {
      chips.innerHTML = this.renderChips();
    }

    const clearBtn = this.container.querySelector('#filters-clear') as HTMLButtonElement | null;
    if (clearBtn) {
      clearBtn.disabled = this.filters.length === 0;
    }
  }

  focusInput(): void {
    this.inputEl.focus();
  }

  private commitInput(): void {
    const value = this.inputEl.value.trim();
    if (!value) return;
    this.events.onAddFilter(value);
    this.inputEl.value = '';
  }

  private escapeHtml(text: string): string {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
}
