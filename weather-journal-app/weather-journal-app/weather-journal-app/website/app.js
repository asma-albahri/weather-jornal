/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

const APIKEY = '58081bf88e768ab13a59bac4bc75aa18&units=imperial';
const apiBaseUrl = 'https://api.openweathermap.org/data/2.5/weather?zip=';


const fetchWeather = async function (url) {
  let response = await fetch(url);
  try {
    let data = await response.json();
    // console.log(data);
    return data;
  } catch (err) {
    console.log("Err:", err)
  }
}
/*document.getElementById('generate').addEventListener('click', getUserCredentials);*/

const handleGenerate= async function() {
  const zip = document.getElementById('zip').value;
  const content = document.getElementById('feelings').value;
  const url = `${apiBaseUrl}${zip}&APPID=${APIKEY}`;
  
  if (zip.length === 0 || feelings.length === 0) {
    alert("Please fill up all values !");
    return
  }

  let weatherData = await fetchWeather(url);
  // console.log("weatherData=",weatherData);
  
  let temp = weatherData.main.temp;

  // Create a new date instance dynamically with JS
  let d = new Date();
  let date = d.getDate() + '.'+ (d.getMonth() + 1 )+ '.' + d.getFullYear();

  const data = {
    date: date,
    temp: temp,
    content: content,
  }
  
  //Post data to owr own server
  await postData("http://localhost:8000/projectData", data);
  
  //Update UI
  updateUI();  
}


const updateUI= async function() {
  const dateDiv = document.getElementById('date');
  const tempDiv = document.getElementById('temp');
  const contentDiv = document.getElementById('content');
  
  //Get data from owr own server
  let UI_Data = await getData("http://localhost:8000/projectData");
  
  //Updating the UI
  dateDiv.innerText = `Date: ${UI_Data.date}`;
  tempDiv.innerText = `Temperature: ${UI_Data.temp} Celsius`;
  contentDiv.innerText = `Feelings: ${UI_Data.content}`;
}

async function postData(url,data) {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  return await response.json(); 
}

const getData= async function(url) {
  let response = await fetch(url)
  try {
    let data = response.json();
    console.log(data);
    
    return data;
  } catch(err){
    console.log(err);
  }
 
}



const generateBtn = document.querySelector('#generate');
generateBtn.addEventListener('click', handleGenerate);