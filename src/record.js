/*
 * Elements that will serve as tools to record the video
 */
class VideoRecord extends HTMLElement
{
   // TODO => avoid innerHTML
   connectedCallback()
   {
      this.innerHTML = `
      <div class="video-record-actions__div">
         <button class="video-record__button">Record</button>
         <button class="stop-record__button">Stop</button>
         <input type="text" placeholder="Nombre del archivo" class="file-name__input">
      </div>
      <video autoplay muted playsinline class="record-screen__video"></video>
      <input class="video-file__input" type="file">
      <p id="teller__p"></p>
      `;

   }
}

// Define the custom element right here!
window.customElements.define("video-record", VideoRecord);


/*
* Request all media disposable, this assumes that the microphone and camera are needed
* @returns {DevicesMediaStream} stream from microphone and camera
*/
async function resolveMedia()
{
   let constraints = { "video": true, "audio": true};
	
   return await navigator.mediaDevices.getUserMedia(constraints);
}


function saveToDisk( event )
{
   let invisibleAnchor = document.getElementById("invisible-anchor__a");

   let blob = new Blob([event.data], { type : "video/webm" });

   let inner_path = URL.createObjectURL(blob);

   invisibleAnchor.setAttribute("href", inner_path);

   invisibleAnchor.setAttribute("download", "generic_video.webm");

   invisibleAnchor.click();

   URL.revokeObjectURL(inner_path);
}


async function saveToRemoteDisk( event )
{
   let blob = new Blob([event.data], { type : "video/webm" });

   let date = new Date();

   let userNaming = document.getElementsByClassName("file-name__input")[0];

   let metadata = {

      // Sanitize the name
      name : `${userNaming.value}.webm`,
      mimetype : "video/webm",
      extension : "webm",
      // Take the date in ISO 8601 with the local time
      date : new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString(),
      // Take the encoding
      encoding : "binary",
      // Weight in bytes
      weight : blob.size,

   };


   // Request the presigned url for the post
   let params = await getPresignedUrl(metadata);

   let body = new FormData();

   Object.keys(params.fields).forEach( key => { body.append(key, params.fields[key]) });

   body.append("file", blob);

   let request = 
      {
         method  : "POST",
         mode    : "no-cors",
         body    : body,
      };

   await fetch(params.url, request).then( (response) => {
      // Debug the result
      console.debug(response);
      teller.textContent = "Video subido con exito";
   }).catch( (error) => 
   {
      teller.textContent = "Algo a ocurrido vuelve porfavor a intentar subirlo";
   });
}

/*
 *
 */
async function recordVideo()
{
   let teller = document.getElementById("teller__p");
   storeRecord.teller = teller;

   let videoScreen = document.getElementsByClassName("record-screen__video")[0];

   // Get the microphone and camera
   teller.textContent = "Accediendo al microfono y camara";
   let stream = await resolveMedia();
	
   teller.textContent = "Camara y microfono listo";

   // Wait 2 seconds
   teller.textContent = "Relajate y produce";

   videoScreen.srcObject = stream;

   // Start the recording

   let mediaRecorder = new MediaRecorder(stream, { mimeType: "video/webm"});

   mediaRecorder.addEventListener("dataavailable", saveToRemoteDisk);

   storeRecord.mediaRecorder = mediaRecorder;
   storeRecord.videoScreen = videoScreen;

   mediaRecorder.start();
}

/*
 * Fetch a JSON with the params to POST a file at the S3 bucket
 * 
 * @param {object} fileMetada - Name and type of the file
 */
async function getPresignedUrl(fileMedata)
{
   let url = "https://servicenuruk.realitynear.org:7726/presigned";

   let request = 
      {
         method  : "POST",
         headers: {
            "Content-Type" : "application/json",
         },
         body    : JSON.stringify(fileMedata),
      };

   return fetch(url, request).then((response) => response.json());
}


/* Stops all the streams and calls inderectely a callback for MediaStream*/
async function storeRecord()
{
   storeRecord.teller.textContent = "Guardaremos tu archivo";

   storeRecord.mediaRecorder.stop();

   // Stop the MediaStreamTrack of every device
   storeRecord.videoScreen.srcObject.getTracks().forEach( (track) => track.stop() );

   // Clean the video screen
   storeRecord.videoScreen.pause();

   storeRecord.videoScreen.removeAttribute("src");

   storeRecord.videoScreen.load();
}

let main = document.getElementsByTagName("main")[0];
