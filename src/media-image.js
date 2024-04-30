import { LitElement, html, css } from 'lit';
import { DDD } from "@lrnwebcomponents/d-d-d/d-d-d.js";

export class mediaImage extends DDD {

  static get tag() {
    return 'media-image';
  }

  constructor() {
    super();
    this.imageURL = "";
    this.captions="";
    this.description = "";
  }

  static get styles() {
    return css`
      :host {
        display: block;
      }

      
      .captions {
                margin-top: var(--ddd-spacing-3);
                font-size: var(--ddd-spacing-4);
            }

        .pictures img:hover {
                cursor: pointer;
                transform: translate(8px, -8px);
                box-shadow: -8px 8px black
            }
      .pictures {
                position: relative;
                display: flex;
                flex-direction: column;
                align-items: center;
                text-align: center;
            }

      .pictures img {
                width: 200px;
                height: 200px;
                border: 2px solid black;
                border-radius: var(--ddd-radius-md);
                transition: transform 0.3s ease-in;
            }
      
            .wrapper-1 {
                margin: var(--ddd-spacing-5);
                display: flex;
                align-items: center;
                grid-template-columns: 1fr 1fr 1fr;
                column-gap: var(--ddd-spacing-5);
                font-size: var(--ddd-spacing-4);
            }

    `;
  }

  imageClicked()
  {
    console.log('Image clicked')
    const evt = new CustomEvent("image-clicked", {
      bubbles: true,
      composed: true,
      cancelable: true,
      detail: {
      opened: true,
      invokedBy: this.invokedBy,
      },
      });
      this.dispatchEvent(evt);
  }


  render() {
    return html`

<div class = "media-image-wrapper">
      <div class = "wrapper-1">
      <div class= "pictures" @click = "${this.imageClicked}">

      <img class="image"  src = "${this.imageURL}">
      <div class="captions">${this.captions}</div>
      </div>
  </div>
      </div>
    
      

    `;
  }

  static get properties() {
    return {
      imageURL: {type: String},
      captions: { type: String, attribute: 'captions' },
      description: {type: String},
    };
  }
}

globalThis.customElements.define(mediaImage.tag, mediaImage);