/* Auto Generated File */
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'page-banner',
  styles: [
    `
      p-content-wrapper > p {
        margin: 0;
        padding: 4px 2vw;
        text-align: center;
        color: white;
        background-color: lightskyblue;
      }
    
      div:not(.visualize-grid) {
        margin: 16px 0;
      }
    
      .playground {
        padding: 0;
      }
    
      .content-wrapper {
        padding: 300px 0;
      }
    
      .playground p-banner {
        --p-banner-position-type: static;
      }
    `,
  ],
  template: `
    <div class="visualize-grid">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>

    <div title="should show banner info position fixed">
      <p-banner>
        <span slot="title">Some notification position fixed (1)</span>
        <span slot="description">
          Some notification description. And some <a [href]="'https://www.porsche.com/'">LINK</a> element.
        </span>
      </p-banner>
    </div>

    <div class="content-wrapper">
      <div class="playground light" title="should show banner info on light background">
        <p-banner>
          <span slot="title">Some notification title</span>
          <span slot="description">
            Some notification description. And some <a [href]="'https://www.porsche.com/'">LINK</a> element.
          </span>
        </p-banner>
      </div>

      <div class="playground light" title="should show banner info with state neutral on light background">
        <p-banner [state]="'neutral'">
          <span slot="title">Some notification title</span>
          <span slot="description">
            Some notification description. And some <a [href]="'https://www.porsche.com/'">LINK</a> element.
          </span>
        </p-banner>
      </div>

      <div class="playground dark" title="should show banner info on dark background">
        <p-banner [theme]="'dark'">
          <span slot="title">Some notification title</span>
          <span slot="description">
            Some notification description. And some <a [href]="'https://www.porsche.com/'">LINK</a> element.
          </span>
        </p-banner>
      </div>

      <div class="playground dark" title="should show banner info with state neutral on dark background">
        <p-banner [state]="'neutral'" [theme]="'dark'">
          <span slot="title">Some notification title</span>
          <span slot="description">
            Some notification description. And some <a [href]="'https://www.porsche.com/'">LINK</a> element.
          </span>
        </p-banner>
      </div>

      <div class="playground light" title="should show banner warning on light background">
        <p-banner [state]="'warning'">
          <span slot="title">Some notification title</span>
          <span slot="description">
            Some notification description. And some <a [href]="'https://www.porsche.com/'">LINK</a> element.
          </span>
        </p-banner>
      </div>

      <div class="playground dark" title="should show banner warning on dark background">
        <p-banner [state]="'warning'" [theme]="'dark'">
          <span slot="title">Some notification title</span>
          <span slot="description">
            Some notification description. And some <a [href]="'https://www.porsche.com/'">LINK</a> element.
          </span>
        </p-banner>
      </div>

      <div class="playground light" title="should show banner error on light background">
        <p-banner [state]="'error'">
          <span slot="title">Some notification title</span>
          <span slot="description">
            Some notification description. And some <a [href]="'https://www.porsche.com/'">LINK</a> element.
          </span>
        </p-banner>
      </div>

      <div class="playground dark" title="should show banner error on dark background">
        <p-banner [state]="'error'" [theme]="'dark'">
          <span slot="title">Some notification title</span>
          <span slot="description">
            Some notification description. And some <a [href]="'https://www.porsche.com/'">LINK</a> element.
          </span>
        </p-banner>
      </div>

      <div class="playground light" title="should show banner in persistent mode">
        <p-banner [persistent]="true">
          <span slot="title">Some notification title</span>
          <span slot="description">
            Some notification description. And some <a [href]="'https://www.porsche.com/'">LINK</a> element.
          </span>
        </p-banner>
      </div>

      <div class="playground light" title="should show banner in basic width">
        <p-banner [width]="'basic'">
          <span slot="title">Some notification title</span>
          <span slot="description">
            Some notification description. And some <a [href]="'https://www.porsche.com/'">LINK</a> element.
          </span>
        </p-banner>
      </div>

      <div class="playground light" title="should show banner in fluid width which is mapped to extended">
        <p-banner [width]="'fluid'">
          <span slot="title">Some notification title</span>
          <span slot="description">
            Some notification description. And some <a [href]="'https://www.porsche.com/'">LINK</a> element.
          </span>
        </p-banner>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BannerComponent {}
