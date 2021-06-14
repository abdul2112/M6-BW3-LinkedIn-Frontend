

export let profiles = []
export let posts = []
export let expsUrl = []
export let experiences = []


export const getProfiles = async(bearerToken) =>{
  try {
    const requestProfiles = await fetch(
      'https://striveschool-api.herokuapp.com/api/profile/',
      {
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + bearerToken,
        },
      }
    );
    if (requestProfiles.ok) {
      const data = await requestProfiles.json();
      expsUrl = data.map(profile => `https://striveschool-api.herokuapp.com/api/profile/${profile._id}/experiences`);
      return data
    }
  } catch (error) {
    console.log(error, getProfiles);
  }
}

export const getExperiences = async(bearerToken, expsUrl) => {
  let merged = []
  try {
   let result = await Promise.all(expsUrl.map(
      async(url) =>{
      const respUrl = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + bearerToken,
        "Content-Type": "application/json",
      },
    })
    if (respUrl.ok) {
      const data = await respUrl.json();
      return data
    }
  }))
  result = result.filter((arr) => arr.length >0)
  merged = [].concat.apply([], result)
  return merged
  } catch (error) {
    console.log(error);
  }
}