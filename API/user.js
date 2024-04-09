// db.js
const myAPI = 'http://localhost:3000/users';
async function fetchUser () {
  try {
    const response = await fetch (myAPI);
    const data = await response.json ();
    return data;
  } catch (error) {
    throw new Error ('No data found... Please try again!');
  }
}
export default fetchUser;
