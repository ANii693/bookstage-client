import nav_menus_list from "@/data/headernav/nav-menus";
import useGlobalContext from "@/hooks/use-context";
import Link from "next/link";
import React, { useState } from "react";

const MobileMenu = () => {
  const { setShowSidebar } = useGlobalContext();
  const safeSetShowSidebar = setShowSidebar || (() => {});
  const [submenuOpen, setSubmenuOpen] = useState<number>(0);
  const [open, setOpen] = useState<boolean>(false);

  const handleMenuToggle = (id: number) => {
    setSubmenuOpen(id);
    setOpen(!open);
  };

  const handleItemClick = (item: any) => {
    if (!item.hasDropdown || item.dropdownItems.length === 0) {
      safeSetShowSidebar(false);
    } else {
      handleMenuToggle(item.id);
    }
  };

  return (
    <>
      <ul>
        {nav_menus_list.map((item, index) => (
          <li
            onClick={() => handleItemClick(item)}
            key={index}
            className={`${
              item.hasDropdown && submenuOpen === item.id && open === true
                ? "menu-item-has-children has-droupdown active"
                : `${
                    item.hasDropdown
                      ? "menu-item-has-children has-droupdown"
                      : ""
                  }`
            }`}
          >
            <Link href={`${item?.link}`}>
              {item.title}
            </Link>
            {item.hasDropdown && item.dropdownItems.length > 0 && (
              <ul
                className={`sub-menu ${
                  submenuOpen === item.id && open === true
                    ? "active"
                    : ""
                }`}
              >
                {item.dropdownItems.map((dropdownItem, subIndex) => (
                  <li key={subIndex}>
                    <Link
                      onClick={() => safeSetShowSidebar(false)}
                      href={dropdownItem.link}
                    >
                      {dropdownItem.title}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </>
  );
};

export default MobileMenu;
