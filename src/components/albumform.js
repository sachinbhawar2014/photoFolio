import { createRef } from "react";
import "../App.css";

export function AlbumForm({ setAlbumFormVisibility, addAlbumIfNotAlreadyExists }) {
    const albumInputRef = createRef(null);

    const onSubmitHandler = (e) => {
        e.preventDefault();
        if (albumInputRef.current.value === "") return;
        const albumName = albumInputRef.current.value;
        addAlbumIfNotAlreadyExists(albumName);
        albumInputRef.current.value = "";
        return;
    };

    return (
        <div className={`${setAlbumFormVisibility ? "imageform" : "imageform hidden"}`}>
            <span>Create new album</span>
            <form onSubmit={onSubmitHandler}>
                <input placeholder="Album Name" ref={albumInputRef} />
                <div className="btnContainer">
                    <button className="btn" type="submit">
                        Create an album
                    </button>
                    <button className="btn" onClick={() => setAlbumFormVisibility(false)}>
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}
