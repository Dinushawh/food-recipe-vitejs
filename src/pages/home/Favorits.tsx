import React, { useEffect, useState } from "react";
import { deleteRecipe, getUserRecipes } from "../../api/_requests";
import { Box, CircularProgress, IconButton, Typography } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { grey } from "@mui/material/colors";
import { useAuth } from "../../auth/Auth";
import { toast } from "react-toastify";

export interface Recipes {
  _id: string;
  strMeal: string;
  strCategory: string;
  strMealThumb: string;
  strInstructions: string;
}

const Favorites: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipes[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [isUpdate, setIsUpdate] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    loadUserRecipes();
  }, [isUpdate]);

  const { currentUser } = useAuth();
  const token = currentUser?.accessToken;

  const loadUserRecipes = async () => {
    try {
      getUserRecipes(token as string)
        .then((result) => {
          setRecipes(result.data);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
    } catch (error) {
      throw error;
    }
  };

  const deleteRecep = async (id: string, token: string) => {
    try {
      setIsUpdate(true);
      await toast.promise(
        deleteRecipe(id, token).then((response) => {
          if (response.status === 200) {
            toast.success;
          } else if (response.status === 400) {
            toast.error(response.data.message);
          }
        }),

        {
          pending: "Loading...",
          success: "Item removed from favorites",
          error: "Something went wrong. Please try again later.",
        }
      );
    } catch (error: any) {
      console.log(error);
      toast.error;
    } finally {
      setIsUpdate(false);
    }
  };

  return (
    <>
      <Typography
        style={{
          paddingLeft: 40,
          paddingTop: 20,
        }}
      >
        My Favorites
      </Typography>
      {loading ? (
        <div style={{ justifyContent: "center" }}>
          <CircularProgress />
        </div>
      ) : !recipes.length ? (
        <div style={{ justifyContent: "center" }}>
          <h2>There are no recipes</h2>
        </div>
      ) : (
        <ul
          style={{
            display: "flex",
            listStyle: "none",
            flexDirection: "row",
            flexWrap: "wrap",
          }}
        >
          {recipes.map((recipe: Recipes) => (
            <li key={recipe.strMeal}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  margin: 1,
                }}
              >
                <img
                  src={recipe.strMealThumb}
                  alt={recipe.strMeal}
                  width={120}
                  style={{
                    borderRadius: 20,
                    margin: 5,
                  }}
                />

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    alignSelf: "start",
                  }}
                >
                  <Typography
                    style={{
                      fontSize: 12,
                      color: grey[500],
                    }}
                  >
                    {recipe.strCategory}
                  </Typography>

                  <Typography
                    style={{
                      fontSize: 12,
                      color: grey[500],
                    }}
                  >
                    {recipe.strCategory}
                  </Typography>
                  <IconButton
                    color="primary"
                    onClick={() => deleteRecep(recipe._id, token as string)}
                  >
                    <FavoriteIcon style={{ width: 15 }} />
                  </IconButton>
                </div>

                <Typography
                  style={{
                    display: "block",
                    width: 110,
                    height: 50,
                    alignSelf: "start",
                    alignItems: "start",
                  }}
                >
                  {recipe.strMeal}
                </Typography>
              </Box>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default Favorites;
