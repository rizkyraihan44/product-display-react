import { MessageCircle, ThumbsUp } from 'lucide-react';

const PopularBlogs = () => {
    const blogs = [
        {
            title: 'Exploring the Beauty of Nature',
            author: 'Aisha',
            likes: 278,
            comments: 60,
        },
        {
            title: 'The Power of Minimalist Living',
            author: 'Sophia',
            likes: 150,
            comments: 35,
        },
        {
            title: 'The Future of Web Development',
            author: 'Emily',
            likes: 300,
            comments: 70,
        },
        {
            title: 'Healthy Eating on a Budget',
            author: 'Chris',
            likes: 275,
            comments: 58,
        },
        {
            title: 'Traveling the World as a Digital Nomad',
            author: 'Taylor',
            likes: 340,
            comments: 78,
        },
        {
            title: 'Mindfulness and Mental Health',
            author: 'Sarah',
            likes: 215,
            comments: 50,
        },
    ];
    return (
        <div className='bg-white p-5 w-[23rem] mt-4 ml-5 border rounded'>
            <h2 className='text-xl font-bold mb-5'>Popular Blogs</h2>
            <ul>
                {blogs.map((blog) => (
                    <li key={blog.title} className='mb-4'>
                        <div className='flex justify-between items-center'>
                            <span className='font-bold mb-2'>{blog.title}</span>
                        </div>
                        <span className='text-gray-600'>
                            Published by: {blog.author}
                        </span>
                        <div className='flex items-center mt-2'>
                            <MessageCircle size={20} />
                            <span className='text-gray-500 mr-5 ml-1'>
                                {blog.comments}
                            </span>
                            <ThumbsUp size={20} />
                            <span className='text-gray-500 ml-1 mr-2'>
                                {blog.likes}
                            </span>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PopularBlogs;
