import igdb from 'igdb-api-node';

const client = igdb('giw12afr5w7xdxxydabwtgiipyvhu9', 'xhn4r3ro7wxaton5kajnefdwwczj5u');

// Example using all methods.
const response = await igdb()
    .fields(['name', 'movies', 'age']) // fetches only the name, movies, and age fields
    .fields('name,movies,age') // same as above

    .limit(50) // limit to 50 results
    .offset(10) // offset results by 10

    .sort('name') // default sort direction is 'asc' (ascending)
    .sort('name', 'desc') // sorts by name, descending
    .search('mario') // search for a specific name (search implementations can vary)

    .where(`first_release_date > ${new Date().getTime() / 1000}`) // filter the results

    .request('/games'); // execute the query and return a response object

console.log(response.data);














const token = {
    "access_token": "xhbtdkm17lb7dvghgj8195axtde8vg",
    "expires_in": 4784866,
    "token_type": "bearer"
}

nodeAxios({
    url: "https://api.igdb.com/v4/games",
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Client-ID':  'giw12afr5w7xdxxydabwtgiipyvhu9',
        'Authorization': 'Bearer xhbtdkm17lb7dvghgj8195axtde8vg',
    },
    data: "fields age_ratings,aggregated_rating,aggregated_rating_count,alternative_names,artworks,bundles,category,checksum,collection,cover,created_at,dlcs,expanded_games,expansions,external_games,first_release_date,follows,forks,franchise,franchises,game_engines,game_modes,genres,hypes,involved_companies,keywords,multiplayer_modes,name,parent_game,platforms,player_perspectives,ports,rating,rating_count,release_dates,remakes,remasters,screenshots,similar_games,slug,standalone_expansions,status,storyline,summary,tags,themes,total_rating,total_rating_count,updated_at,url,version_parent,version_title,videos,websites;"
  })
    .then(response => {
        console.log(response.data);
    })
    .catch(err => {
        console.error(err);
    });