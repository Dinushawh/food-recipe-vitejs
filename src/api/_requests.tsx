import axios from "axios";

const CategoryURL = import.meta.env.VITE_RECEP_URL;
const BaseURL = import.meta.env.VITE_API_URL;

async function getCategoriList() {
  try {
    const response = await axios.post(`${CategoryURL}/categories.php`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export { getCategoriList };

const getRecepies = async (SearchValue: string) => {
  try {
    const response = await axios.get(
      `${CategoryURL}/search.php?s=${SearchValue}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export async function getUserRecipes(token: string) {
  try {
    const response = await axios.get(`${BaseURL}/favorits/get-favorits`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function addUserRecipes(
  strMeal: string,
  strCategory: string,
  strMealThumb: string,
  strInstructions: string,
  token: string
) {
  try {
    if (!strMeal || !strCategory || !strMealThumb || !strInstructions) {
      throw new Error("Please fill all the fields");
    } else {
      const response = await axios.post(
        `${BaseURL}/favorits/add-favorits`,
        {
          strMeal,
          strCategory,
          strMealThumb,
          strInstructions,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    }
  } catch (error) {
    throw error;
  }
}

export async function deleteRecipe(id: string, token: string) {
  try {
    if (!id) {
      throw new Error("Please fill all the fields");
    } else {
      const response = await axios.post(
        `${BaseURL}/favorits/delete-favorits`,
        {
          id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    }
  } catch (error) {
    throw error;
  }
}

export { getRecepies };
