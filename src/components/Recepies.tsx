import React from "react";
import { Box, CircularProgress, IconButton, Typography } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { grey } from "@mui/material/colors";
import { toast } from "react-toastify";
import { addUserRecipes } from "../api/_requests";
import { useAuth } from "../auth/Auth";

interface Props {
  recepies: any;
  isLoaded: boolean;
}

const Recepies: React.FC<Props> = ({ recepies, isLoaded }) => {
  const { currentUser } = useAuth();
  const token = currentUser?.accessToken;

  const addRecipeForFav = async (
    strMeal: string,
    strCategory: string,
    strMealThumb: string,
    strInstructions: string
  ) => {
    try {
      await toast.promise(
        addUserRecipes(
          strMeal,
          strCategory,
          strMealThumb,
          strInstructions,
          token as string
        ).then((response) => {
          if (response.status === 200) {
          }
        }),

        {
          pending: "Loading...",
          success: "Add to favorite",
        }
      );
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      <div style={{ maxHeight: "300px" }}>
        {isLoaded && (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <CircularProgress />
          </div>
        )}

        {!recepies ? (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <h2>There is no recepies</h2>
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
            {recepies.map((recepies: any) => (
              <li key={recepies.idMeal}>
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
                    src={recepies.strMealThumb}
                    alt="logo"
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
                      {recepies.strCategory}
                    </Typography>
                    <IconButton
                      color="primary"
                      onClick={() =>
                        addRecipeForFav(
                          recepies.strMeal,
                          recepies.strCategory,
                          recepies.strMealThumb,
                          recepies.strInstructions
                        )
                      }
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
                    {recepies.strMeal}
                  </Typography>
                </Box>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default Recepies;
