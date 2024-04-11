import { LitElement, html, css } from 'lit';

export class PlayList extends LitElement {

  static get tag() {
    return 'playList';
  }


  constructor() {
    super();
    this.title = "play list";
  }


  static get styles() {
    return css`
      :host {
        display: block;
      }
    `;
  }


  render() {
    return html`<div>${this.title}</div>`;
  }


  static get properties() {
    return {
      title: { type: String },
    };
  }
}

globalThis.customElements.define(PlayList.tag, PlayList);
