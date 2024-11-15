import Link from "next/link";
import React from "react";
import productList from "../../data/products";
import Image from "next/image";

const CategorySection = () => {
  return (
    <section className="bd-category__area mb-35">
      <div className="container">
        <div className="row">
          <div className="col-sm-6">
            <div className="bd-section__title-wrapper mb-40">
              <div className="bd-sm__section-title">
                <h3>Browse by Category</h3>
              </div>
            </div>
          </div>
          <div className="col-sm-6">
            <div className="bd-trending__btn text-sm-end mb-40">
              <Link className="bd-bn__btn-2" href="/shop">
                View All Category
              </Link>
            </div>
          </div>
        </div>
        {productList?.length && (
          <div className="row">
            {productList.slice(23, 27).map((item, num) => (
              <div className="col-xxl-3 col-xl-6 col-lg-6 col-md-6" key={num}>
                <div className="bd-category__item mb-30">
                  <div className="bd-category__thumb w-img">
                    <Image
                      width={500}
                      height={500}
                      style={{ width: "100%", height: "auto" }}
                      src={item.productImg}
                      alt="category-thumb"
                    />
                  </div>
                  <div className="bd-category__content">
                    <div className="bd-categorey__content-title">
                      <h4>{item.productTitle}</h4>
                    </div>
                    <ul>
                      {item.categoryList?.length &&
                        item.categoryList.map((category, num) => (
                          <li key={num}>
                            <Link href="/shop">{category.catTitle}</Link>
                          </li>
                        ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default CategorySection;
