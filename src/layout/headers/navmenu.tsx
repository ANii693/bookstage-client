import Link from 'next/link';
import React from 'react';
import nav_menus_list from '../../data/headernav/nav-menus';

const NavMenu = () => {
    return (
        <>
            <ul>
                {nav_menus_list?.map((item, index) => {
                    return (
                        <li key={index} className={`${item.hasDropdown && !item.megamenu ? 'active has-dropdown'
                            : item.megamenu && 'mega-menu has-dropdown'}`}>
                            <Link href={`${item.link}`}>{`${item.title}`}</Link>

                            {item?.hasDropdown && !item.megamenu && <ul className="submenu">
                                {item?.dropdownItems?.map((menu, index) => (
                                    <li key={index}><Link href={`${menu.link}`}>{menu.title}</Link></li>
                                ))}
                            </ul>}
                        </li>
                    )
                })}

            </ul>
        </>
    );
};

export default NavMenu;