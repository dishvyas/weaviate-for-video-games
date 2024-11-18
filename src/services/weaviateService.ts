import axios from 'axios';

const WEAVIATE_BASE_URL = process.env.NEXT_PUBLIC_WEAVIATE_BASE_URL || ' ';
const API_KEY = process.env.NEXT_PUBLIC_WEAVIATE_API_KEY || ' ';

interface VideoGameDataModel {
  game_Title: string;
  user_Rating: number;
  age_Group_Targeted: string;
  price: number;
  platform: string;
  requires_Special_Device: string;
  developer: string;
  publisher: string;
  release_Year: number;
  genre: string;
  multiplayer: string;
  game_Length: number;
  graphics_Quality: string;
  soundtrack_Quality: string;
  story_Quality: string;
  user_Review_Text: string;
  game_Mode: string;
  min_Number_of_Players: number;
}

// Basic suggestion query to get search results
export const getVideoGameSuggestions = async (query: string): Promise<VideoGameDataModel[]> => {
    const graphqlQuery = {
        query: `
          query GetSuggestions($query: TextGetObjectsVideoGame) {
            Get {
              VideoGame(
                where: {
                  path: ["game_Title"],
                  operator: Equal,
                  valueText: $query
                }
                limit: 10
              ) {
                game_Title
                user_Rating
                age_Group_Targeted
                price
                platform
                requires_Special_Device
                developer
                publisher
                release_Year
                genre
                multiplayer
                game_Length
                graphics_Quality
                soundtrack_Quality
                story_Quality
                user_Review_Text
                game_Mode
                min_Number_of_Players
                _additional { id }
              }
            }
          }
        `,
        variables: {
          query: query
        }
      };


  console.log(graphqlQuery)

  const response = await axios.post(WEAVIATE_BASE_URL, graphqlQuery, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${API_KEY}`
    }
  });

  console.log("Full response from Weaviate:", JSON.stringify(response.data, null, 2));

  if (response.data && response.data.data) {
    return response.data.data.Get.VideoGame;
  } else {
    throw new Error("Unexpected response structure");
  }
};

async function getAllGames() {
    const query = `
      {
        Get {
          VideoGame(limit: 1000, offset: 0) {
            game_Title
            user_Rating
            age_Group_Targeted
            price
            platform
            requires_Special_Device
            developer
            publisher
            release_Year
            genre
            multiplayer
            game_Length
            graphics_Quality
            soundtrack_Quality
            story_Quality
            user_Review_Text
            game_Mode
            min_Number_of_Players
          }
        }
      }
    `;
    try {
      const response = await fetch(WEAVIATE_BASE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_KEY}`,
        },
        body: JSON.stringify({ query }),
      });
      const data = await response.json();
      return data?.data?.Get?.VideoGame || [];
    } catch (error) {
      console.error("Error fetching all games:", error);
      return [];
    }
  }
  
  export { getAllGames };