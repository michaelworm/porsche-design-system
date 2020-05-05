import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-layout',
  template: `
    <p-headline [variant]="'headline-2'">Layout</p-headline>
    <p-divider></p-divider>
    <p-grid>
      <p-grid-item [size]="2">
        <p-headline [variant]="'headline-4'" [tag]="'h4'">
          &lt;p-grid&gt;<br>
          &lt;p-grid-item&gt;
        </p-headline>
      </p-grid-item>
      <p-grid-item [size]="10">
        <div class="playground light spacing-block">
          <p-grid>
            <p-grid-item [size]="12"></p-grid-item>
          </p-grid>
          <p-grid>
            <p-grid-item [size]="1"></p-grid-item>
            <p-grid-item [size]="11"></p-grid-item>
          </p-grid>
          <p-grid>
            <p-grid-item [size]="2"></p-grid-item>
            <p-grid-item [size]="10"></p-grid-item>
          </p-grid>
          <p-grid>
            <p-grid-item [size]="3"></p-grid-item>
            <p-grid-item [size]="9"></p-grid-item>
          </p-grid>
          <p-grid>
            <p-grid-item [size]="4"></p-grid-item>
            <p-grid-item [size]="8"></p-grid-item>
          </p-grid>
          <p-grid>
            <p-grid-item [size]="5"></p-grid-item>
            <p-grid-item [size]="7"></p-grid-item>
          </p-grid>
          <p-grid>
            <p-grid-item [size]="6"></p-grid-item>
            <p-grid-item [size]="6"></p-grid-item>
          </p-grid>
          <p-grid>
            <p-grid-item [size]="7"></p-grid-item>
            <p-grid-item [size]="5"></p-grid-item>
          </p-grid>
          <p-grid>
            <p-grid-item [size]="8"></p-grid-item>
            <p-grid-item [size]="4"></p-grid-item>
          </p-grid>
          <p-grid>
            <p-grid-item [size]="9"></p-grid-item>
            <p-grid-item [size]="3"></p-grid-item>
          </p-grid>
          <p-grid>
            <p-grid-item [size]="10"></p-grid-item>
            <p-grid-item [size]="2"></p-grid-item>
          </p-grid>
          <p-grid>
            <p-grid-item [size]="11"></p-grid-item>
            <p-grid-item [size]="1"></p-grid-item>
          </p-grid>
        </div>
        <div class="playground light spacing-block">
          <p-grid>
            <p-grid-item [offset]="1" [size]="11"></p-grid-item>
          </p-grid>
          <p-grid>
            <p-grid-item [offset]="2" [size]="10"></p-grid-item>
          </p-grid>
          <p-grid>
            <p-grid-item [offset]="3" [size]="9"></p-grid-item>
          </p-grid>
          <p-grid>
            <p-grid-item [offset]="4" [size]="8"></p-grid-item>
          </p-grid>
          <p-grid>
            <p-grid-item [offset]="5" [size]="7"></p-grid-item>
          </p-grid>
          <p-grid>
            <p-grid-item [offset]="6" [size]="6"></p-grid-item>
          </p-grid>
          <p-grid>
            <p-grid-item [offset]="7" [size]="5"></p-grid-item>
          </p-grid>
          <p-grid>
            <p-grid-item [offset]="8" [size]="4"></p-grid-item>
          </p-grid>
          <p-grid>
            <p-grid-item [offset]="9" [size]="3"></p-grid-item>
          </p-grid>
          <p-grid>
            <p-grid-item [offset]="10" [size]="2"></p-grid-item>
          </p-grid>
          <p-grid>
            <p-grid-item [offset]="11" [size]="1"></p-grid-item>
          </p-grid>
        </div>
        <p-divider></p-divider>
      </p-grid-item>
    </p-grid>
    <p-grid>
      <p-grid-item [size]="2">
        <p-headline [variant]="'headline-4'" [tag]="'h4'">
          &lt;p-flex&gt;<br>
          &lt;p-flex-item&gt;
        </p-headline>
      </p-grid-item>
      <p-grid-item [size]="10">
        <div class="playground light spacing-block">
          <p-flex>
            <p-flex-item [width]="'full'"></p-flex-item>
          </p-flex>
          <p-flex>
            <p-flex-item [offset]="'one-quarter'" [width]="'three-quarters'"></p-flex-item>
          </p-flex>
          <p-flex>
            <p-flex-item [offset]="'one-third'" [width]="'two-thirds'"></p-flex-item>
          </p-flex>
          <p-flex>
            <p-flex-item [offset]="'half'" [width]="'half'"></p-flex-item>
          </p-flex>
          <p-flex>
            <p-flex-item [offset]="'two-thirds'" [width]="'one-third'"></p-flex-item>
          </p-flex>
          <p-flex>
            <p-flex-item [offset]="'three-quarters'" [width]="'one-quarter'"></p-flex-item>
          </p-flex>
        </div>
        <p-divider></p-divider>
      </p-grid-item>
    </p-grid>
    <p-grid>
      <p-grid-item [size]="2">
        <p-headline [variant]="'headline-4'" [tag]="'h4'">
          &lt;p-divider&gt;
        </p-headline>
      </p-grid-item>
      <p-grid-item [size]="10">
        <div class="playground light spacing-block">
          <p-divider></p-divider>
          <br>
          <br>
          <p-divider [color]="'neutral-contrast-medium'"></p-divider>
          <br>
          <br>
          <p-divider [color]="'neutral-contrast-high'"></p-divider>
          <br>
          <br>
          <p-divider [orientation]="'vertical'" style="height: 100px"></p-divider>
        </div>
        <p-divider></p-divider>
      </p-grid-item>
    </p-grid>
    <p-grid>
      <p-grid-item [size]="2">
        <p-headline [variant]="'headline-4'" [tag]="'h4'">
          &lt;p-content-wrapper&gt;
        </p-headline>
      </p-grid-item>
      <p-grid-item [size]="10">
        <div class="playground light spacing-block">
          <p-content-wrapper>
            <div class="example-content">Some content</div>
          </p-content-wrapper>
        </div>
        <p-divider></p-divider>
      </p-grid-item>
    </p-grid>
  `
})
export class LayoutComponent {

}
