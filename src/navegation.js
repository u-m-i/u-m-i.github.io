
class SignForm extends HTMLElement
{
   connectedCallback()
   {
      this.innerHTML = `
      <ul class="sign-options__ul">
         <li class="sign-option__li"><button class="sign-option__button">Sign In</button></li>
         <li class="sign-option__li"><button class="sign-option__button">Sign Up</button></li>
      </ul>

      <form method="POST" class="sign-account__form">
         <input type="email" name="email" placeholder="Email">
         <input type="password" name="password" placeholder="Password">
         <button type="submit">Sign In</button>
      </form>

      <form method="POST" class="new-account__form">
         <input type="text" name="forename" placeholder="Name">
         <input type="text" name="surname" placeholder="Last name">
         <input type="email" name="email" placeholder="Email">
         <input type="password" name="password" placeholder="Password">
         <button type="submit">Sign Up</button>
      </form>
      `;

       // Get the form for log

      let form = document.getElementsByClassName("sign-account__form")[0];

      form.addEventListener("submit",  async (event) => {

         event.preventDefault();

         // Get the form content
         let formattedData = new FormData(event.target);

         let structure = {};

         for(const [key,value] of formattedData.entries())
            structure[key] = value;


         let body = JSON.stringify(structure);

         let request = {
            method  : "POST",
            headers :{
               "Content-Type" : "application/json",
            },
            body    : body,
         };

         await fetch("https://servicenuruk.realitynear.org:7726/presigned", request).then((response) =>
            {

               let div = document.createElement("div");

               if(!response.ok)
               {
                  div.textContent = "Algo falló en el camino, vuelve a intentar o contacta a soporte";
                  throw new Error("Something went wrong");
               }

               div.textContent = "Disfruta tu tiempo aquí";

               this.appendChild(div);

               // Render the dashboard.

               let main = document.getElementsByClassName("information__main")[0];

               let dashboard = document.createElement("record-options");

               main.appendChild(dashboard);

         });
      });

      let newAccount = document.getElementsByClassName("new-account__form")[0];

      newAccount.addEventListener("submit", async (event) => 
         {
            event.preventDefault();

            // Get the form content
            let formattedData = new FormData(event.target);

            let structure = {};

            for(const [key,value] of formattedData.entries())
               structure[key] = value;

            let body = JSON.stringify(structure);

            let request = {
               method  : "POST",
               headers :{
                  "Content-Type" : "application/json",
               },
               body    : body,
            };

            await fetch("https://servicenuruk.realitynear.org:7726/signup", request).then( (response) =>
               {
                  let div = document.createElement("div");

                  if(!response.ok)
                  {
                     div.textContent = "Algo falló en el camino, vuelve a intentar o contacta a soporte";
                     throw new Error("Something went wrong");
                  }

                  div.textContent = "¡Te has registrado! Ingresa para que pruebes tus nuevas herramientas";

                  this.appendChild(div);
               })
         });
   }
}


class AboutUs extends HTMLElement
{
   connectedCallback()
   {
      this.innerHTML = `
      <article>
         <span class="aboutus__left-side">
            <img src="" alt="">
         </span>
         <aside class="aboutus__rigth-side">
            <h2>Heading</h2>
            <b>Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde esse sed sit, tenetur itaque praesentium reprehenderit beatae tempore autem, voluptate odit quaerat. Id adipisci, reprehenderit dignissimos est perferendis assumenda alias!</b>
            <p>Dejar claro que hacemos</p>
         </aside>
      </article>
      `;
   }
}

class Team extends HTMLElement
{
   connectedCallback()
   {
      this.innerHTML = `
      <ul class="team-list_ul">
         <li class="team-member__li">
            <span class="member-content__span"></span>
         </li>
         <li class="team-member__li">
            <span class="member-content__span"></span>
         </li>
      </ul>
      <p class="story-telling__p"></p>
      `;

   }
}

class Demo extends HTMLElement
{
   connectedCallback()
   {
      this.innerHTML = `
      <form method="POST" class="chatbot-context__form">
         <input type="button" name="male">
         <input type="button" name="female">
         <input type="email" name="email">
         <input type="datetime" name="nation">
         <button type="submit"></button>
      </form>
      `;
      
   }
}

class ContactUs extends HTMLElement
{
   connectedCallback()
   {
      this.innerHTML = `
      <!-- Inner function for forms-->
      <ul class="contact-options-list__ul">
         <li class="contact-info__li"><button>Personal</button></li>
         <li class="contact-info__li"><button>Enterprise</button></li>
      </ul>

      <!-- Form for contact -->
      <form method="POST" class="contact__form">
         <input type="email" name="email">
         <button type="submit"></button>
      </form>

      <form method="POST" class="enterprise-contact__form">
         <input type="text" name="enterprise">
         <input type="email" name="email">
         <button type="submit"></button>
      </form>
      `;
   }
}

class Pricing extends HTMLElement
{
   connectedCallback()
   {
      this.innerHTML = `
      <ul class="pricing-list__ul">
         <li class="table-container__li">
            <table class="plan__table"></table>
         </li>
         <li class="table-container__li">
            <table class="plan__table"></table>
         </li>
         <li class="table-container__li">
            <table class="plan__table"></table>
         </li>
      </ul>
      `;
   }
}


class Home extends HTMLElement
{
   connectedCallback()
   {
      this.innerHTML = `
      <p>This is generic content</p>
      `;
   }
}

class RecordOptions extends HTMLElement
{
   connectedCallback()
   {
      this.innerHTML = `
         <ul class="record-types__ul">
            <li class="record-type__li">
               <button class="record-type__button">Audio</button>
            </li>
            <li class="record-type__li">
               <button class="record-type__button">Video</button>
            </li>
            <li class="record-type__li">
               <button class="record-type__button">Text</button>
            </li>
         </ul>
      `;

      let actioners = document.getElementsByClassName("record-type__button");

      let audioActioner = actioners[0];
      let videoActioner = actioners[1];
      let textActioner = actioners[2];

      videoActioner.onclick = async (event) => 
      {
         event.preventDefault();

         event.target.setAttribute("disabled", "");

         // Instantiate the video-record
         let videoRecord = new VideoRecord();

         main.appendChild(videoRecord);

         // Set all buttons
         let recordButton = document.getElementsByClassName("video-record__button")[0];
         let stopButton = document.getElementsByClassName("stop-record__button")[0];

         recordButton.onclick = recordVideo;
         stopButton.onclick = storeRecord;
      };

      audioActioner.onclick = async (event) =>
      {
      };

      textActioner.onclick = async (event) =>
      {
         
      };
   }
}

function testWebComponents(event)
{
   if(lastComponent)
      lastComponent.remove();

   let htmlPiece = document.createElement(event.target.shadow);

   let main = document.getElementsByClassName("information__main")[0];

   main.appendChild(htmlPiece);

   lastComponent = htmlPiece;
}

// Registering all the custom elements

window.customElements.define("sign-form", SignForm);
window.customElements.define("about-us", AboutUs);
window.customElements.define("generic-home", Home);
window.customElements.define("contact-us", ContactUs);
window.customElements.define("price-info", Pricing);
window.customElements.define("team-info", Team);
window.customElements.define("demo-form", Demo);
window.customElements.define("record-options", RecordOptions);

// Take all the buttons
// Assing a global listener to them

let views = ["generic-home", "about-us", "team-info", "demo-form", "price-infro", "contact-us", "sign-form"];

let lastComponent;

let navButtons = document.getElementsByClassName("panel-option__button");


for(let i = 0; i < navButtons.length; i++)
{
   navButtons[i].shadow = views[i];
   navButtons[i].onclick = testWebComponents;
}

console.log("All settled up! These are the targeted buttons");
console.debug(navButtons);

