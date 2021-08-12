const API_URL =
  window.location.hostname === 'localhost' ? 'localhost:8000' : 'https://newsapi.org/v2/top-headlines?page=20category=technology&country=us&apiKey=a4c0f6406eb744eeb7e00beb7feb9d54';


export default API_URL;