/* Auto Generated File */
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'page-tag-dismissible',
  template: `
    <div class="playground light auto-layout" title="should show different background colors">
      <p-tag-dismissible>Default</p-tag-dismissible>
      <p-tag-dismissible [color]="'background-default'">Color background-default</p-tag-dismissible>
      <p-tag-dismissible [color]="'background-surface'">Color background-surface</p-tag-dismissible>
    </div>

    <div class="playground light surface auto-layout" title="should show different background colors on surface background">
      <p-tag-dismissible>Default</p-tag-dismissible>
      <p-tag-dismissible [color]="'background-default'">Color background-default</p-tag-dismissible>
      <p-tag-dismissible [color]="'background-surface'">Color background-surface</p-tag-dismissible>
    </div>

    <div class="playground light auto-layout" title="should show different background colors and label">
      <p-tag-dismissible [label]="'Some label'">Default</p-tag-dismissible>
      <p-tag-dismissible [label]="'Some label'" [color]="'background-default'">Color background-default</p-tag-dismissible>
      <p-tag-dismissible [label]="'Some label'" [color]="'background-surface'">Color background-surface</p-tag-dismissible>
    </div>

    <div
      class="playground light surface auto-layout"
      title="should show different background colors and label on surface background"
    >
      <p-tag-dismissible [label]="'Some label'">Default</p-tag-dismissible>
      <p-tag-dismissible [label]="'Some label'" [color]="'background-default'">Color background-default</p-tag-dismissible>
      <p-tag-dismissible [label]="'Some label'" [color]="'background-surface'">Color background-surface</p-tag-dismissible>
    </div>

    <div class="playground light auto-layout" title="should apply custom styles for dedicated slotted content">
      <p-tag-dismissible>
        Some <b>bold</b>, <strong>strong</strong>, <em>emphasized</em> and <i>italic</i> text
      </p-tag-dismissible>
    </div>

    <div class="playground light auto-layout" title="should show different multiline tags" style="max-width: 300px">
      <p-tag-dismissible>Text that is very long and will break into the next line</p-tag-dismissible>
      <p-tag-dismissible [label]="'Some label'">Text that is very long and will break into the next line</p-tag-dismissible>
      <p-tag-dismissible [label]="'Label that is very long and will break into the next line'">Short Text</p-tag-dismissible>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TagDismissibleComponent {}
