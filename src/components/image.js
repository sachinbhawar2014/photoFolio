import { useState } from "react";
import "../App.css";

export function Image({
    index,
    image,
    deleteImage,
    setEditImage,
    setImageFormVisibility,
    setCurrentIndex,
    setIsCarouselVisible,
}) {
    const [showBtns, setShowBtns] = useState(false);

    return (
        <div className="image-thumbnail" onMouseOver={() => setShowBtns(true)} onMouseOut={() => setShowBtns(false)}>
            <span className={showBtns ? "editDeleteBtnContainer" : "editDeleteBtnContainer hidden"}>
                {/* <span className={showBtns ? "editDeleteBtnContainer" : "editDeleteBtnContainer hidden"}> */}
                <img
                    className={showBtns ? "" : "hidden"}
                    src="edit.png"
                    alt="Edit"
                    onClick={() => {
                        setEditImage(image);
                        setImageFormVisibility(true);
                    }}
                />
                <img className={showBtns ? "" : "hidden"} src="delete.png" alt="Delete" onClick={() => deleteImage(image.id)} />
            </span>
            <img
                src={image.url}
                alt="Photo"
                onClick={() => {
                    setCurrentIndex(index);
                    setIsCarouselVisible(true);
                }}
            />
            <span className="albumName">{image.title}</span>
        </div>
    );
}
