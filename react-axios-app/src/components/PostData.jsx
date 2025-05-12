import { useState, useEffect } from 'react';
import { updateApiData } from '../api/ApiReq';

const PostData = ({ onAdd, updateData, setUpdateData }) => {
    const [newpost, setNewPost] = useState({
        title: '',
        body: '',
    });

    // Update form fields when updateData is passed
    useEffect(() => {
        if (updateData?.id) {
            setNewPost({
                title: updateData.title || '',
                body: updateData.body || '',
            });
        }
    }, [updateData]); // Re-run this whenever updateData changes

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewPost((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
    e.preventDefault();

    if (!newpost.title || !newpost.body) {
        alert('Both fields are required.');
        return;
    }

    if (updateData?.id) {
        // Edit mode (updating an existing post)
        try {
            // Call the onAdd with updated data (this will be handled in DisplayData)
            onAdd(newpost);
            setUpdateData({}); // Clear the update data after successful update
        } catch (err) {
            console.error('Update failed', err);
        }
    }
    setNewPost({ title: '', body: '' });

    // Clear the form for new post creation
    if (!updateData?.id) {
        setNewPost({ title: '', body: '' });
    }
};


    return (
        <section className='form-container'>
            <form onSubmit={handleSubmit}>
                <div>
                    <input
                        name="title"
                        type="text"
                        placeholder="Enter Title"
                        value={newpost.title}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <input
                        name="body"
                        type="text"
                        placeholder="Enter Content"
                        value={newpost.body}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <button type="submit">{updateData?.id ? 'Update' : 'Add'}</button>
                </div>
            </form>
        </section>
    );
};

export default PostData;
