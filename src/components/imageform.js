import { useState, useEffect, createRef } from "react";
import "../App.css";

export function ImageForm({
    editImage,
    setEditImage,
    addImage,
    imageFormVisibility,
    albumSelected,
    setImageFormVisibility,
    updateImage,
}) {
    const [title, setTitle] = useState("");
    const [url, setUrl] = useState("");

    const titleRef = createRef(null);
    const urlRef = createRef(null);

    useEffect(() => {
        if (editImage) {
            setTitle(editImage.title);
            setUrl(editImage.url);
        } else {
            setTitle("");
            setUrl("");
        }
    }, [editImage]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (title === "") return;
        if (url === "") return;

        if (!editImage) {
            addImage(albumSelected, url, title);
        } else {
            updateImage(editImage, url, title);
            setEditImage(null);
        }
        setTitle("");
        setUrl("");

        setImageFormVisibility(false);
    };

    return (
        <div className={`${imageFormVisibility ? "imageform" : "imageform hidden"}`}>
            <span>{editImage ? `Update Image from ${albumSelected}` : `Add Image to ${albumSelected}`}</span>

            <form onSubmit={handleSubmit}>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" ref={titleRef} />
                <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="Image URL" ref={urlRef} />

                <div className="btnContainer">
                    <button
                        className="btn"
                        type="button"
                        onClick={() => {
                            setImageFormVisibility(false);
                            setEditImage(null);
                        }}
                    >
                        Cancel
                    </button>
                    <button className="btn" type="submit">
                        {editImage ? "Update" : "Add"}
                    </button>
                </div>
            </form>
        </div>
    );
}
