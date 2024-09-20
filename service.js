async function fetchData(requestUrl) {
    try {
      const response = await fetch(requestUrl, {
        headers: {
          Authorization: `Bearer ${process.env.WRIKE_PERMANENT_ACCESS_TOKEN}`,
        },
      });
      if (!response.ok) {
        throw new Error(response.status + " " + response.statusText);
      }
      return response;
    } catch (error) {
      console.error(error.name + " " + error.message);
      return null;
    }
  }

  module.exports = {fetchData}