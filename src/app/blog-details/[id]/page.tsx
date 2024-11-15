
import BlogDetailsMain from "@/components/blog-details/BlogDetailsMain";

import Wrapper from "@/layout/DefaultWrapper";

const BlogDetailsDynamic = ({ params }: { params: { id: number } }) => {
    const id =  params.id
    
    return (
        <>
            <Wrapper>
                <main>
                    <BlogDetailsMain id={id}/>
                </main>
            </Wrapper>
        </>
    );
}

export default BlogDetailsDynamic