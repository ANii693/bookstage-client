import Link from 'next/link';
import React from 'react';

const BlogSidebarTags = () => {
    return (
        <div className="sidebar__widget mb-30">
            <div className="sidebar__widget-head mb-35">
                <h4 className="sidebar__widget-title">Tags</h4>
            </div>
            <div className="sidebar__widget-content">
                <div className="sidebar__tag">
                    <Link href="/blog">Garden</Link>
                    <Link href="/blog">Gardening</Link>
                    <Link href="/blog">Planting</Link>
                    <Link href="/blog">Grass trimming</Link>
                    <Link href="/blog">Garden care</Link>
                    <Link href="/blog">Vagitable</Link>
                    <Link href="/blog">Tree plantation</Link>
                    <Link href="/blog">Tips</Link>
                </div>
            </div>
        </div>
    );
};

export default BlogSidebarTags;