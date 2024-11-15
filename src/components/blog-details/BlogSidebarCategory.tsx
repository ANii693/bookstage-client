import Link from 'next/link';
import React from 'react';

const BlogSidebarCategory = () => {
    return (
        <div className="sidebar__widget mb-30">
            <div className="sidebar__widget-head mb-35">
                <h4 className="sidebar__widget-title">Category</h4>
            </div>
            <div className="sidebar__widget-content">
                <div className="sidebar__category">
                    <ul>
                        <li><Link href="/blog">Fruit and vegetables</Link></li>
                        <li><Link href="/blog">Starchy food</Link></li>
                        <li><Link href="/blog">Protein</Link></li>
                        <li><Link href="/blog">Health & wellbeing</Link></li>
                        <li><Link href="/blog">Eat Well, Your Way</Link></li>
                        <li><Link href="/blog">Fresh vegetables</Link></li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default BlogSidebarCategory;