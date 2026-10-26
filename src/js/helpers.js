import { TIMEOUT_SEC } from "./config.js";

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(
        new Error(`Request took too long! Timeout after ${s} Time_out second`),
      );
    }, s * 1000);
  });
};
export const getJSON = async function (url) {
  const raceFetch = [fetch(url), timeout(TIMEOUT_SEC)];
  try {
    const resp = await Promise.race(raceFetch);
    console.log(resp);
    const data = await resp.json();
    resp.ok ? "" : (data.id = location.hash.slice(1));
    if (!resp.ok)
      throw new Error(
        `data-message ${data.message},${data.id}, (${resp.status})`,
      );
    return data;
  } catch (error) {
    console.log("GETJSON");
    throw error;
  }
};
