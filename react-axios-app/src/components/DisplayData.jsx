import React, { useEffect, useState } from 'react';
import { getApiData, deleteApiData, addApiData, updateApiData } from '../api/ApiReq'; 
import PostData from './PostData';

const DisplayData = () => {
    const [posts, setPosts] = useState([]);
    const [updateData, setUpdateData] = useState({});

    const getData = async () => {
        const res = await getApiData();
        setPosts(res);
    };

    useEffect(() => {
        getData();
    }, []);

    const deleteData = async (id) => {
        try {
            const res = await deleteApiData({ id });
            if (res.status === 200) {
                const newUpdatedData = posts.filter((currElem) => currElem.id !== id);
                setPosts(newUpdatedData);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const addNewPost = async (newPost) => {
    try {
        // If we're in "edit" mode, we update the post
        if (updateData?.id) {
            const updatedPost = await updateApiData(updateData.id, newPost);
            setPosts((prevPosts) =>
                prevPosts.map((post) =>
                    post.id === updatedPost.id ? updatedPost : post
                )
            );
            setUpdateData({}); // Clear the update data after the update is complete
        } else {
            // If we're in "add" mode, we simply add the new post
            const res = await addApiData(newPost);
            setPosts([res, ...posts]); // Add new post at the top
        }
    } catch (error) {
        console.error("Operation failed:", error);
    }
};


    const handlePostUpdate = (currElem) => {
        setUpdateData(currElem); // Set the post data to update
    };

    return (
        <section className="container">
            <PostData
                onAdd={addNewPost}
                updateData={updateData}
                setUpdateData={setUpdateData}
            />
            <ul>
                {posts.map((currElem, index) => (
                    <li key={currElem.id}>
                        <h3>{index + 1}. {currElem.title}</h3>
                        <p><span>Content:</span> {currElem.body}</p>
                        <div className="button-group">
                            <button onClick={() => handlePostUpdate(currElem)}>Edit</button>
                            <button onClick={() => deleteData(currElem.id)}>Delete</button>
                        </div>
                    </li>
                ))}
            </ul>
        </section>
    );
};

export default DisplayData;
