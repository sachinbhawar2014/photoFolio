import "../App.css";
import { Image } from "./image";
import { useState } from "react";

export function ImagesList(props) {
    const {
        editImage,
        setEditImage,
        updateImage,
        deleteImage,
        images,
        imageFormVisibility,
        setImageFormVisibility,
        albumSelected,
        setAlbumSelected,
        searchBarVisibility,
        setSearchBarVisibility,
    } = props;

    const [currentIndex, setCurrentIndex] = useState(0);
    const [isCarouselVisible, setIsCarouselVisible] = useState(false);
    let imageLength = images.length;

    // write code for carousel

    return (
        <>
            {isCarouselVisible ? (
                <section className="carouselSection" aria-label="Newest Photos">
                    <div className="carousel" data-carousel>
                        <button className="carousel-button close" onClick={() => setIsCarouselVisible(false)}>
                            x
                        </button>
                        <button
                            className="carousel-button prev"
                            onClick={() => setCurrentIndex((currentIndex - 1 + imageLength) % imageLength)}
                        >
                            &#8656;
                        </button>
                        <button
                            className="carousel-button next"
                            onClick={() => setCurrentIndex((currentIndex + 1) % imageLength)}
                        >
                            &#8658;
                        </button>
                        <ul data-slides>
                            {images.map((img, ind) => (
                                <li className="slide" {...(currentIndex === ind ? { "data-active": "" } : {})}>
                                    <img src={img.url} alt="Nature Image #1" />
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>
            ) : null}
            <div className="albumlist">
                <div className="albumlist-heading">
                    <span>
                        <span className="backBtnImageContainer">
                            <img
                                className="backBtn"
                                src="back.png"
                                onClick={() => {
                                    setAlbumSelected(!albumSelected);
                                    setImageFormVisibility(false);
                                }}
                                alt="back Button"
                            />
                        </span>
                        {images.length === 0 ? `No images found in the Album ${albumSelected}` : `Images in the ${albumSelected}`}
                    </span>

                    <span>
                        {searchBarVisibility ? <input className="searchBox" placeholder="Title" /> : null}
                        <span className="backBtnImageContainer">
                            <img
                                className="backBtn"
                                src="searchpng.png"
                                onClick={() => setSearchBarVisibility(!searchBarVisibility)}
                                alt="search button"
                            />
                        </span>
                        <button className="btn2" onClick={() => setImageFormVisibility(true)}>
                            {!imageFormVisibility ? "Add Image" : "Cancel"}
                        </button>
                    </span>
                </div>
                <div className="albumContainer">
                    {images.map((img, index) => (
                        <Image
                            key={index}
                            index={index}
                            image={img}
                            deleteImage={deleteImage}
                            editImage={editImage}
                            setEditImage={setEditImage}
                            updateImage={updateImage}
                            imageFormVisibility={imageFormVisibility}
                            setImageFormVisibility={setImageFormVisibility}
                            setCurrentIndex={setCurrentIndex}
                            setIsCarouselVisible={setIsCarouselVisible}
                        />
                    ))}
                </div>
            </div>
        </>
    );
}
