import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import toast from "react-hot-toast";
import ReactMarkdown from 'react-markdown';
import MarkdownEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import rehypeRaw from 'rehype-raw';

export default function Blog({
    _id,
    title: existingTitle,
    slug: existingSlug,
    description: existingDescription,
    blogcategory: existingBlogcategory,
    tags: existingTags,
    status: existingStatus,
}) {
    const [redirect, setRedirect] = useState(false);
    const router = useRouter();

    const [title, setTitle] = useState(existingTitle || '');
    const [slug, setSlug] = useState(existingSlug || '');
    const [blogcategory, setBlogcategory] = useState(existingBlogcategory || []);
    const [description, setDescription] = useState(existingDescription || '');
    const [tags, setTags] = useState(existingTags || []);
    const [status, setStatus] = useState(existingStatus || '');

    async function createProduct(ev) {
        ev.preventDefault();
        const data = { title, slug, description, blogcategory, tags, status };

        if (_id) {
            await axios.put('/api/blogs', { ...data, _id });
            toast.success('Data Updated!');
        } else {
            await axios.post('/api/blogs', data);
            toast.success('Product Created!');
        }

        setRedirect(true);
    }

    if (redirect) {
        router.push('/draft');
        return null;
    }

    const handleSlugChange = (ev) => {
        const inputValue = ev.target.value;
        const newSlug = inputValue.replace(/\s+/g, '-');
        setSlug(newSlug);
    };

    return (
        <>
            <form onSubmit={createProduct} className='addWebsiteform'>
                <div className='w-100 flex flex-col flex-left mb-2' data-aos="fade-up">
                    <label htmlFor="title">Title</label>
                    <input type="text" id='title' placeholder='Enter small title'
                        value={title}
                        onChange={ev => setTitle(ev.target.value)}
                    />
                </div>
                <div className='w-100 flex flex-col flex-left mb-2' data-aos="fade-up">
                    <label htmlFor="slug">Slug</label>
                    <input type="text" id='slug' placeholder='Enter slug title'
                        value={slug}
                        onChange={handleSlugChange}
                    />
                </div>
                <div className='w-100 flex flex-col flex-left mb-2' data-aos="fade-up">
                    <label htmlFor="category">Select Category (ctrl + leftclick for multiple select)</label>
                    <select onChange={(e) => setBlogcategory(Array.from(e.target.selectedOptions, option => option.value))} name="category" id="category" multiple value={blogcategory}>
                        <option value="htmlcssjs">Html, Css & JavaScript</option>
                        <option value="nextjs">Next Js, React Js</option>
                        <option value="database">Database</option>
                        <option value="deployment">Deployment</option>
                    </select>
                    <p className="existingcategory flex gap-1 mt-1 mb-1">Selected: {Array.isArray(existingBlogcategory) && existingBlogcategory.map(category => (
                        <span key={category}>{category}</span>
                    ))}</p>
                </div>
                <div className='description w-100 flex flex-col flex-left mb-2'>
                    <label htmlFor="description">Blog Content</label>
                    <MarkdownEditor
                        value={description}
                        onChange={(ev) => setDescription(ev.text)}
                        style={{ width: '100%', height: '400px' }}
                        renderHTML={(text) => (
                            <ReactMarkdown rehypePlugins={[rehypeRaw]}>
                                {text}
                            </ReactMarkdown>
                        )}
                    />
                </div>
                <div className='w-100 flex flex-col flex-left mb-2'>
                    <label htmlFor="tags">Tags</label>
                    <select onChange={(e) => setTags(Array.from(e.target.selectedOptions, option => option.value))} name="tags" id="tags" multiple value={tags}>
                        <option value="html">Html</option>
                        <option value="css">CSS</option>
                        <option value="javascript">JavaScript</option>
                        <option value="nextjs">Next Js</option>
                        <option value="reactjs">React Js</option>
                        <option value="database">Database</option>
                    </select>
                    <p className="existingcategory flex gap-1 mt-1 mb-1">Selected: {existingTags && existingTags.length > 0 && (
                        <span>{existingTags}</span>
                    )}</p>
                </div>
                <div className='w-100 flex flex-col flex-left mb-2'>
                    <label htmlFor="status">Status</label>
                    <select onChange={(e) => setStatus(e.target.value)} name="status" id="status" value={status}>
                        <option value="">No Select</option>
                        <option value="draft">Draft</option>
                        <option value="publish">Publish</option>
                    </select>
                    <p className="existingcategory flex gap-1 mt-1 mb-1">Selected: {existingStatus && existingStatus.length > 0 && (
                        <span>{existingStatus}</span>
                    )}</p>
                </div>
                <div className='w-100 mb-2'>
                    <button type='submit' className='w-100 addwebbtn flex-center'>SAVE BLOG</button>
                </div>
            </form>

            
        </>
    );
}