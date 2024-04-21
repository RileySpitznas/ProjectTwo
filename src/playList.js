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

      .topRow {
        display: flex;
        align-items: center;
        justify-content: space-between; 
        }
      .backdrop {
        margin: 8px;
        padding: 8px;
        width:500px;
        height:500px;
        background-color:green;
        color: black;
        position: relative;
          }
       .closeButton {
        margin: 8px;
        display: flex;
        justify-content: right
          }
        .description {
        align-self: center;
        display: flex;
        justify-content: center;
         }
         .imageLoop {
        margin: 8px;
        display: flex;
        justify-content: space-between;  
        position: absolute;
        bottom: 0;
        width: 95%;
         }
         .slide-image {
        width: 100%;
        min-height: 200px;
        height: auto;
        max-height: 400px;
        padding: 10px;
        margin: 0 auto;
         }
        #pic {
        position: absolute;
        left: 25%;
        top: 15%;
        width: 250px;
        height: 250px;
        }
    `;
  }

  rightClick()
  {
   console.log("hi")
   if(this.imageNumber < this.totalImageNumber-1)
   this.imageNumber = this.imageNumber+1;
 else
 {
   this.imageNumber = 0;
 }
   this.requestUpdate();
  }
  leftClick()
  {
   if(this.imageNumber > 0)
   this.imageNumber = this.imageNumber-1;
 else
 {
   this.imageNumber = this.totalImageNumber-1;
 }
   this.requestUpdate();
  }



  render() {

    let prevIndex = this.imageNumber - 1;
    let nextIndex = this.imageNumber + 1;
    if(prevIndex < 0)
    {
      prevIndex = (prevIndex + this.image.length) % (this.image.length);
    }
    if(nextIndex >= this.totalImageNumber)
    {
      nextIndex = (nextIndex) % (this.image.length);
    }


    return html`
      
      <div>${this.title}</div> //idk about this line


      `;
  }


  static get properties() {
    return {
      title: { type: String },
    };
  }
}

globalThis.customElements.define(PlayList.tag, PlayList);
