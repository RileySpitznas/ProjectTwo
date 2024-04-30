import { LitElement, html, css } from 'lit';
import { DDD } from "@lrnwebcomponents/d-d-d/d-d-d.js";

export class PlayList extends DDD {

  static get tag() {
    return 'play-list';
  }


  constructor() {
    super();
    this.imageList = [];
    this.totalImageNumber = this.imageList.length;
    this.visible = false;
    this.captionsArray=[];
    this.descriptionsArray=[];
    this.imageNumber = 0;
    
  }


  static get styles() {
    return css`
      :host {
        display: block;
         }
         
         .slide-image {
          width: 100%;
          min-height: 100%;
          height: auto;
          padding: 10px;
          margin: 0 auto;
        }

      .opened-wrapper {
        margin: var(--ddd-spacing-2);
        padding: var(--ddd-spacing-2);
        background-color: var(--ddd-theme-default-skyLight);
        color: black;
        border: 2px solid black;
        border-radius: var(--ddd-radius-md);
        overflow: auto;
      }
        .topRow {
            margin-top: 32px;
            display: flex;
            align-items: center;
            justify-content: space-between;
          }
          .backdrop {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.7); /* Black with 70% opacity */
        z-index: 1000; /* Ensure it's above other content */
        display: flex;
        align-items: center;
        justify-content: center;
      }
        
        .closeButton {
          cursor: pointer;
          margin: 8px;
         display: flex;
         justify-content: right;
         visibility: visible;
        }
        .description{
          align-self: center;
          display: flex;
          justify-content: center;
        }
        
        .imageLoop {
          margin-left: 4px;
          margin-top: 32px;
          display: inline-flex;
          justify-content: space-between;  
          bottom: 0;
          width: 95%;
        }
      
        .slide-image img {
        width: 550px;
        height: 550px;
        display: block;
        border: 2px solid black;
        border-radius: var(--ddd-radius-md);
      }
      .btn-backwards {
        cursor: pointer;
      }
      .btn-forward {
        cursor: pointer;
      }
      
    `;
  }

  rightClick() {
    if(this.imageNumber < this.imageList.length -1)
    this.imageNumber = this.imageNumber+1;
  else
  {
    this.imageNumber = 0;
  }
    this.requestUpdate();
  }

  firstUpdated(){
    document.addEventListener('image-clicked', (e) => {
      console.log('Playlist recieved message')
      var url = e.target.attributes.imageurl.nodeValue;
      this.imageNumber = this.imageList.indexOf(url);
      
      if(this.visible == false)
      {
        this.visible =true;
      }
    })

    var data = document.querySelectorAll('media-image');
    data.forEach(element => {
      console.log(element.getAttribute("imageurl"))
      this.imageList.push(element.getAttribute("imageurl"))
      this.captionsArray.push(element.getAttribute('captions'));
      this.descriptionsArray.push(element.getAttribute('description'));
    });
  
    this.requestUpdate();
  }

      exitClick()
      {
    this.visible = !this.visible
  }

  leftClick()
 {
  if(this.imageNumber > 0)
  this.imageNumber = this.imageNumber-1;
else
{
  this.imageNumber = this.imageList.length -1;
}
  this.requestUpdate();
 }

 openGall()
 {
  this.visible = !this.visible;
 }

 openDialoge()
 {
  let prevIndex = this.imageNumber - 1;
    let nextIndex = this.imageNumber + 1;
    if(prevIndex < 0)
    {
      prevIndex = (prevIndex + this.imageList.length) % (this.imageList.length);
    }
    if(nextIndex >= this.totalImageNumber)
    {
      nextIndex = (nextIndex) % (this.imageList.length);
    }

    return html`

<div class="backdrop"   >
  <div class = "opened-wrapper">
    <div class="topRow">
    <p><div class="slide-image-number"> 
    ${this.imageNumber +1} 
    </div> of
    <div class="total-image-number">
    ${this.imageList.length}
    </div></p>
 
    
    <div class="caption">${this.captionsArray[this.imageNumber]}</div>

    <div class="closeButton" @click = ${this.exitClick}>
    X
</div>

</div>



    <div class="slide-image">
    <img id="pic" src= ${this.imageList[this.imageNumber]} alt = "slide">
    </div>
    <div class="description">${this.descriptionsArray[this.imageNumber]}</div>

    <div class="imageLoop">
        <div class="btn-backwards" @click="${this.leftClick}">
        <-
        </div>
        <div class = "imageThumbNails">
        <img  id="prev" src = "${this.imageList[prevIndex]}" style=" height:50px; width:50px;">
        <img  id="curr" src = "${this.imageList[this.imageNumber]}" style=" height:50px; width:50px;">
        <img  id="Next" src = "${this.imageList[nextIndex]}" style=" height:50px; width:50px;">
        </div>
        <div class = "btn-forward" @click="${this.rightClick}">
        ->
        </div>
    </div>
</div>
</div>
  
  `
 }
 closedView()
 {
  html`
  
  `
 }

  render() 
  {
   
     if(this.visible == true)
     {
      return this.openDialoge();
     }
     else
     {
      return this.closedView();
     }
     
  }

  static get properties() {
    return {
      image: {type: Array},
      captionsArray: { type: Array },
      descriptionsArray: { type: Array },
 imageNumber : {type: String},
 totalImageNumber: {type: String},
      images:{type: String},
      visible:{type: Boolean}
    };
  }
}

globalThis.customElements.define(PlayList.tag, PlayList);

    



  
