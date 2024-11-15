import { CategoryType, SubCategoryType } from "@/interFace/api-interFace";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const CategoryItem = () => {
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [subCategories, setSubCategories] = useState<SubCategoryType[]>([]);
  const [category, setcategory] = useState("");
  useEffect(() => {
    axios.get(`${process.env.BASE_URL}setting/category`).then((res) => {
      setCategories(res.data);
    })
    .catch((e) => console.log(e));
  }, []);

  const handleSubCategory = (item: any) => {
    setcategory(item.categoryName);
  };

  useEffect(() => {
    if (category) {
      axios
        .get(`${process.env.BASE_URL}setting/sub-category/${category}`)
        .then((res) => {
          setSubCategories(res.data);
        })
        .catch((e) => console.log(e));
    }
  }, [category]);

  
  return (
    <>
      <nav>
        <ul>
          {categories.length ?
            categories.map((item) => (
              <li key={item._id} className="has-dropdown">
                <Link className="text-capitalize" onMouseOver={() => handleSubCategory(item)} href="/shop">
                  <i className={item.categoryclass}></i>
                  {item.categoryName}
                </Link>
                <ul className="category-submenu"> 
                  {subCategories.length ?
                    subCategories.map((item) => (
                      <li key={item._id}>
                        <Link className="text-capitalize" href={`/shop/subcategory/${item._id}`}>
                          <i className={item.subcategoryclass}></i>
                          {item.subCategoryName}
                        </Link>
                      </li>
                    )):
                    <>
                    <p className="text-center">No Brand Found</p>
                   </>
                    }
                </ul>
              </li>
            )):
            <>
             <p className="text-center">No Category Added</p>
            </>
            }
        </ul>
      </nav>
    </>
  );
};

export default CategoryItem;
