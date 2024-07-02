
function loadDashboard()
{
   // Erase all the children
   let main = document.getElementsByClassName("information__main")[0];
   main.replaceChildren();

   let dashboard = new Dashboard();
   // Append the dashboard
   main.appendChild(dashboard);
}

class SignForm extends HTMLElement
{
   connectedCallback()
   {
      this.innerHTML = `
      <form method="POST" class="sign-account__form">
         <input type="email" name="email" placeholder="INGRESA TU CORREO">
         <input type="password" name="password" placeholder="INGRESA TU CONTRASEÑA">
         <a>¿Olvidaste la contraseña?</a>
         <button type="submit" class="generic-blue__button">INGRESAR</button>
         <p>¿Todavía no tienes una cuenta? <a href="">Regístrate aquí</a></p>
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

         await fetch("https://servicenuruk.realitynear.org:7726/sign", request).then( async (response) =>
            {

               let div = document.createElement("div");

               if(!response.ok)
               {
                  div.textContent = "Algo falló en el camino, vuelve a intentar o contacta a soporte";
                  throw new Error("Something went wrong");
               }

               div.textContent = "Disfruta tu tiempo aquí";

               this.appendChild(div);

               await sleep(2000);

               loadDashboard();


         });
      });

      let newAccount = document.getElementsByClassName("sign-account__form")[1];

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
      <article class="about-us__article">
         <p class="paragraph__p">Reality LIFE es una multiplataforma diseñada para mantener vivos tus recuerdos, conocimientos y legado. Enfrentamos la inevitabilidad de la muerte y las enfermedades mentales como el alzheimer y la demencia con una solución que asegura que nunca dejes de ser un apoyo para tus seres queridos. Con Reality LIFE, tus experiencias y sabiduría perduran y continúan guiando a tus familiares y amigos, ofreciendo una conexión eterna e inquebrantable.</p>
         <p class="paragraph__p">Nuestro objetivo es transformar la manera en que te relacionas con tus seres queridos, incluso después de haber partido. En Reality LIFE, preservamos tus recuerdos más valiosos, anécdotas y conocimientos, y los convertimos en un avatar digital interactivo. Permitimos que tus familiares y amigos interactúen contigo de una manera inmersiva y gamificada, asegurando que tus datos sean protegidos y permanezcan inalterados a través de la tecnología Blockchain.</p>
         <img class="paragraph-image__img" src="../static/white-pane.png">
         <p class="paragraph__p">Utilizamos Inteligencia Artificial para capturar y replicar tu personalidad, tus respuestas y tu estilo único de comunicación. Garantizamos la seguridad y autenticidad de tus recuerdos y datos personales, asegurando que solo aquellos que tú elijas tengan acceso. Ofrecemos experiencias de interacción a través de realidad virtual y aumentada, permitiendo que tus seres queridos sientan tu presencia de una manera conmovedora y real.</p>
         <img class="paragraph-image__img" src="../static/white-pane.png">
         <p class="paragraph__p">En Reality LIFE, no solo almacenamos datos, sino que preservamos tu legado emocional e intelectual. Imagina un futuro donde tus hijos, nietos y generaciones venideras puedan conversar contigo, aprender de tus experiencias y sentir tu apoyo constante. Nuestra plataforma no solo honra tu vida, sino que también la celebra, brindando consuelo y compañía a tus seres queridos.</p>
         <p class="paragraph__p">No dejes que el tiempo borre tu impacto en la vida de quienes amas. Con Reality LIFE, tu esencia permanecerá viva y activa, proporcionando un apoyo continuo y valioso. Convierte tus recuerdos en un legado eterno y asegúrate de que tu voz nunca se apague. Reality LIFE: Tu Vida, Tu Legado, Siempre Vivo.</p>
         <button class="call-to-action__button generic-blue__button">COMIENZA AHORA</button>
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

class Dashboard extends HTMLElement
{
   connectedCallback()
   {
      this.innerHTML = `
         <h3 class"title-type__h3">Puedes grabar tus memorias en los siguientes formatos</h3>
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
            <li>
               <input class="file-deposit__input" type="file">
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

function testWebComponents( event )
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
window.customElements.define("record-options", Dashboard);

// Take all the buttons
// Assing a global listener to them

/*

let views = ["about-us", "team-info", "price-info", "demo-form", "contact-us", "sign-form"];

let lastComponent;

let navButtons = document.getElementsByClassName("panel-option__button");


for(let i = 0; i < navButtons.length; i++)
{
   navButtons[i].shadow = views[i];
   navButtons[i].onclick = testWebComponents;
}

console.log("All settled up! These are the targeted buttons");
console.debug(navButtons);
*/

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

   await fetch("https://servicenuruk.realitynear.org:7726/sign", request).then( async (response) =>
      {

         let div = document.createElement("div");

         if(!response.ok)
         {
            div.textContent = "Algo falló en el camino, vuelve a intentar o contacta a soporte";
            throw new Error("Something went wrong");
         }

         div.textContent = "Disfruta tu tiempo aquí";

         form.appendChild(div);

         setTimeout(loadDashboard, 2000);
   });
});

let newAccount = document.getElementsByClassName("sign-account__form")[1];

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

            newAccount.appendChild(div);
         })
   });