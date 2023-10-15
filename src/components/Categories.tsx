import React from "react";
import { Button, CircularProgress } from "@mui/material";

interface Props {
  categories: any;
  selectedCategoryIndex: number | null;
  handleCategoryClick: (index: number) => void;
}

const Categories: React.FC<Props> = ({
  categories,
  selectedCategoryIndex,
  handleCategoryClick,
}) => {
  return (
    <div style={{ maxHeight: "300px", overflowY: "auto" }}>
      {categories.length === 0 ? (
        <CircularProgress />
      ) : (
        <ul
          style={{
            display: "flex",
            listStyle: "none",
            flexDirection: "row",
            flexWrap: "wrap",
          }}
        >
          {categories.map((category: any, index: number) => (
            <li key={category.idCategory}>
              <Button
                variant={
                  selectedCategoryIndex === index ? "contained" : "outlined"
                }
                onClick={() => handleCategoryClick(index)}
                style={{ margin: 5, borderRadius: 20 }}
              >
                {category.strCategory}
              </Button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Categories;
