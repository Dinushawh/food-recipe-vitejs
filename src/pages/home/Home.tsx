import React, { useEffect, useState } from "react";
import { getCategoriList, getRecepies } from "../../api/_requests";
import Categories from "../../components/Categories";
import Recepies from "../../components/Recepies";

export interface CategoryDetails {
  idCategory: string;
  strCategory: string;
  strCategoryThumb: string;
  strCategoryDescription: string;
}

export interface Recepies {
  strMeal: string;
  strCategory: string;
  strMealThumb: string;
  strInstructions: string;
}

const Home: React.FC = () => {
  const [categories, setCategories] = useState<CategoryDetails[]>([]);
  const [recepies, setRecepies] = useState<Recepies[]>([]);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [, setLoading] = useState<boolean>(false);
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState<
    number | null
  >(null);

  useEffect(() => {
    setLoading(true);
    loadMealCategories().then(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (categories.length > 0) {
      setSelectedCategoryIndex(0);
      loadRecepies(categories[0].strCategory);
    }
  }, [categories]);

  const loadMealCategories = async () => {
    let result = await getCategoriList();
    setCategories(result.categories);
  };

  const loadRecepies = async (searchValue: any) => {
    setIsLoaded(true);
    let result = await getRecepies(searchValue);
    setRecepies(result.meals);
    setIsLoaded(false);
  };

  const handleCategoryClick = (index: number) => {
    setSelectedCategoryIndex(index);
    loadRecepies(categories[index].strCategory);
  };

  return (
    <div>
      <Categories
        categories={categories}
        selectedCategoryIndex={selectedCategoryIndex}
        handleCategoryClick={handleCategoryClick}
      />
      <div>
        <Recepies recepies={recepies} isLoaded={isLoaded} />
      </div>
    </div>
  );
};

export default Home;
