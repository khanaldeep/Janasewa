// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCwzwiuzcu4RfMf5vfGDUUBTfWRgV1UTDs",
  authDomain: "green-street-20e5e.firebaseapp.com",
  projectId: "green-street-20e5e",
  storageBucket: "green-street-20e5e.appspot.com",
  messagingSenderId: "420682581480",
  appId: "1:420682581480:web:6428c4a04a472d94c8905d",
  measurementId: "G-VQ7GX9TK6T"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();
const database = firebase.database();

maptilersdk.config.apiKey = 'xThl9JAL6vdHLCgZdk5v';
const map = new maptilersdk.Map({
  container: 'map',
  style: maptilersdk.MapStyle.STREETS,
  center: [85.300140, 27.700769],
  zoom: 14 
});

map.on('click', (e) => {
  console.log(e)
  const description = `<form style="width:600px;" id="popupForm">
                          <div>
                            <p>Longitude:</p>
                            <input id="longitude" value=${e.lngLat.lng} name="longitude" readonly/>
                          </div>

                          <div>
                            <p>Latitude:</p>
                            <input id="latitude" value=${e.lngLat.lat} name="latitude" readonly/>
                          </div>

                          <div>
                           <p>Upload a File:</p>
                           <input id="file_path" type="file" name="file">
                          </div>

                          <div>
                            <textarea id="description" placeholder="Description" rows="10" cols="25" name="description"></textarea>
                          </div>
                          <button type="button" onclick="submitForm()">Submit</button>
                      </form>
                     `
  new maptilersdk.Popup()
      .setLngLat(e.lngLat)
      .setHTML(description)
      .addTo(map);
});

async function submitForm() {
  const form = document.getElementById('popupForm');
  const file = document.getElementById('file_path').files[0];
  const description = document.getElementById('description').value;
  const longitude = document.getElementById('longitude').value;
  const latitude = document.getElementById('latitude').value;
  
  if (!file) {
      alert("Please select a file to upload.");
      return;
  }

  // Get the name of the place (reverse geocoding)
  const response = await axios.get(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`);
  const placeName = response.data.display_name || "Unknown";

  // Upload file to Firebase Storage
  const storageRef = storage.ref(`map_images/${file.name}`);
  const snapshot = await storageRef.put(file);
  const imageUrl = await snapshot.ref.getDownloadURL();

  // Save metadata to Firebase Realtime Database
  const newMapDataRef = database.ref('map_data').push();
  await newMapDataRef.set({
      name: placeName,
      description: description,
      longitude: longitude,
      latitude: latitude,
      imageUrl: imageUrl
  });

  alert("Data submitted successfully!");
}