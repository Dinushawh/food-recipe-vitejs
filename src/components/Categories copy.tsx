import React, { useEffect, useState } from "react";
import { getCategoriList } from "../api/_requests";
import { Button, CircularProgress } from "@mui/material";

export interface CategoryDetails {
  idCategory: string;
  strCategory: string;
  strCategoryThumb: string;
  strCategoryDescription: string;
}

interface CategoriesProps {
  onCategorySelect: (categoryId: string, categoryName: string) => void;
}

const Categories: React.FC<CategoriesProps> = ({ onCategorySelect }) => {
  const [categories, setCategories] = useState<CategoryDetails[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    loadMealCategories().then(() => setLoading(false));

    // Select the first category when the component is initialized
    if (categories.length > 0) {
      setSelectedCategory(categories[0].idCategory);
    }
  }, []);

  const loadMealCategories = async () => {
    let result = await getCategoriList();
    setCategories(result.categories);
  };

  const handleCategoryClick = (categoryId: string, categoryName: string) => {
    setSelectedCategory((prevSelected) =>
      prevSelected === categoryId ? null : categoryId
    );

    // Call the callback function to pass both category ID and name to the parent component
    onCategorySelect(categoryId, categoryName);
  };

  return (
    <div style={{ maxHeight: "300px", overflowY: "auto" }}>
      {loading ? (
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
          {categories.map((category) => (
            <li key={category.idCategory}>
              <Button
                variant={
                  selectedCategory === category.idCategory
                    ? "contained"
                    : "outlined"
                }
                color={"primary"}
                style={{ borderRadius: 20, margin: 5 }}
                onClick={() =>
                  handleCategoryClick(category.idCategory, category.strCategory)
                }
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
