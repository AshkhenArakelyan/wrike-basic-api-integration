async function fetchData(requestUrl: string) {
    try {
      const response = await fetch(requestUrl, {
        headers: {
          Authorization: `Bearer ${process.env.WRIKE_PERMANENT_ACCESS_TOKEN}`,
        },
      });
      if (!response.ok) {
        throw new Error(response.status + " " + response.statusText);
      }
      return response.json();
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  export {fetchData}