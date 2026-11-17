import { TIMEOUT_SEC } from './config.js';

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(
        new Error(`Request took too long! Timeout after ${s} Time_out second`),
      );
    }, s * 1000);
  });
};
<<<<<<< HEAD
export const getJSON = async function (url) {
  const raceFetch = [fetch(url), timeout(TIMEOUT_SEC)];
  try {
    const resp = await Promise.race(raceFetch);
=======
>>>>>>> upload-recipe-part-2

export const AJAX = async function (url, upload = undefined) {
  try {
    const fetchPro = upload
      ? fetch(url, {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify(upload),
        })
      : fetch(url);
    const raceFetch = [fetchPro, timeout(TIMEOUT_SEC)];
    const resp = await Promise.race(raceFetch);
    const data = await resp.json();
    // resp.ok ? '' : (data.id = location.hash.slice(1));
    if (!resp.ok)
      throw new Error(
        `data-message ${data.message},${data.id}, (${resp.status})`,
      );
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};
// export const getJSON = async function (url) {
//   const raceFetch = [fetch(url), timeout(TIMEOUT_SEC)];
//   try {
//     const resp = await Promise.race(raceFetch);
//     const data = await resp.json();
//     resp.ok ? '' : (data.id = location.hash.slice(1));
//     if (!resp.ok)
//       throw new Error(
//         `data-message ${data.message},${data.id}, (${resp.status})`,
//       );
//     return data;
//   } catch (error) {
//     console.log('GETJSON');
//     throw error;
//   }
// };

// // SEND DATA INTO TO API

// export const sendJSON = async function (url, uploadData) {
//   const raceFetch = [
//     fetch(url, {
//       method: 'POST',
//       headers: {
//         'Content-type': 'application/json',
//       },
//       body: JSON.stringify(uploadData),
//     }),
//     timeout(TIMEOUT_SEC),
//   ];
//   try {
//     const resp = await Promise.race(raceFetch);

//     const data = await resp.json();
//     resp.ok ? '' : (data.id = location.hash.slice(1));
//     if (!resp.ok)
//       throw new Error(
//         `data-message ${data.message},${data.id}, (${resp.status})`,
//       );
//     return data;
//   } catch (error) {
//     console.log('GETJSON');
//     throw error;
//   }
// };
