import { useEffect, useReducer, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

import { AlbumForm } from "./components/albumform";
import { AlbumsList } from "./components/albumlist";
import { Navbar } from "./components/navbar";
import { ImageForm } from "./components/imageform";

import Spinner from "./components/spinner";

import { doc, addDoc, collection, setDoc, getDoc, onSnapshot, query, where, getDocs, deleteDoc } from "firebase/firestore";
import { db } from "./firebaseConfig";

const imgReducer = (state, action) => {
    const { payload } = action;
    switch (action.type) {
        case "GET_IMAGE":
            return {
                ...state,
                images: payload.images,
            };
        case "ADD_IMAGE":
            return {
                ...state,
                images: [payload.image, ...state.images],
            };
        case "REMOVE_IMAGE":
            return {
                ...state,
                images: state.images.filter((img) => img.id !== payload),
            };
        case "UPDATE_IMAGE":
            const images = [...state.images];
            images[payload.imgPos] = payload.image;
            return {
                ...state,
                images,
            };
        default:
            return state;
    }
};

const albumReducer = (state, action) => {
    const { payload } = action;
    switch (action.type) {
        case "GET_ALBUM":
            return {
                ...state,
                albums: payload.albums,
            };
        case "ADD_ALBUM":
            return {
                ...state,
                albums: [payload.album, ...state.albums],
            };
        case "REMOVE_ALBUM":
            return {
                ...state,
                albums: state.albums.filter((album) => album.id !== payload.id),
            };
        case "UPDATE_ALBUM":
            const albums = [...state.albums];
            albums[payload.albPos] = payload.album;
            return {
                ...state,
                albums,
            };
        default:
            return state;
    }
};

function App() {
    const [albumFormVisibility, setAlbumFormVisibility] = useState(false);
    const [imageFormVisibility, setImageFormVisibility] = useState(false);
    const [searchBarVisibility, setSearchBarVisibility] = useState(false);
    const [albumSelected, setAlbumSelected] = useState(null);
    const [imgState, imgDispatch] = useReducer(imgReducer, { images: [] });
    const [albumState, albumDispatch] = useReducer(albumReducer, { albums: [] });
    // const [sideEffect, setSideEffect] = useState(false);
    const [loading, setLoading] = useState(true);
    const [editImage, setEditImage] = useState(null);

    const addImage = async (albumName, imageURL, imageTitle) => {
        setLoading(true);
        try {
            let date = new Date();
            let url = imageURL.replace(/\s+/g, "");
            console.log(url);
            const image = {
                album: `/Albums/${albumSelected}`,
                albumName: albumSelected,
                createdAt: date,
                title: imageTitle,
                url: url,
            };

            console.log(image);
            const imageRef = collection(db, "Images");
            const docRef = await addDoc(imageRef, image);
            imgDispatch({
                type: "ADD_IMAGE",
                payload: { image: { id: docRef.id, ...image } },
            });
            toast.success("Image added successfully.");
        } catch (error) {
            console.error("Error adding image:", error);
            toast.error("Failed to add image.");
        } finally {
            setLoading(false);
        }
    };

    const deleteImage = async (imageId) => {
        setLoading(true);
        try {
            const imageRef = doc(db, "Images", imageId);
            await deleteDoc(imageRef);
            toast.success("Image deleted successfully.");
            imgDispatch({ type: "REMOVE_IMAGE", payload: imageId });
        } catch (error) {
            toast.error("Error occurred while deleting the image.");
        } finally {
            setLoading(false);
        }
    };

    const updateImage = async (image, url, title) => {
        setLoading(true);
        try {
            let updatedImage = {
                Album: `/Albums/${image.albumName}`,
                albumName: image.albumName,
                createdAt: image.createdAt,
                title: title,
                url: url,
            };
            const imageRef = doc(db, "Images", image.id.toString());
            await setDoc(imageRef, updatedImage);

            let imgPos = imgState.images.findIndex((img) => img.id === image.id);
            imgDispatch({
                type: "UPDATE_IMAGE",
                payload: { imgPos: imgPos, image: { ...updatedImage, id: image.id } },
            });
            toast.success("Image Updated successfully.");
        } catch (error) {
            toast.error("Failed to add image.");
        } finally {
            setLoading(false);
        }

        return;
    };

    const getImages = async (albumName) => {
        setLoading(true);
        try {
            const imagesRef = collection(db, "Images");
            const q = query(imagesRef, where("albumName", "==", `${albumName}`));
            const querySnapshot = await getDocs(q);
            const fetchedImages = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            // console.log(fetchedImages);
            imgDispatch({ type: "GET_IMAGE", payload: { images: fetchedImages } });
            toast.success("Images retrieved successfully.");
        } catch (error) {
            toast.error("Failed to retrieve images.");
        } finally {
            setLoading(false);
        }
    };

    const addAlbumIfNotAlreadyExists = async (albumId) => {
        setLoading(true);
        try {
            const albumRef = doc(db, "Albums", albumId);
            const docSnap = await getDoc(albumRef);

            if (docSnap.exists()) {
                console.log(`Album with name "${albumId}" already exists!`);
                toast.error("Album name already exists. Try another name.");
            } else {
                const newAlbum = { name: albumId, createdAt: new Date() };
                await setDoc(albumRef, newAlbum);
                albumDispatch({
                    type: "ADD_ALBUM",
                    payload: { album: { id: albumId, ...newAlbum } },
                });
                toast.success("Album added successfully.");
            }
        } catch (error) {
            console.error("Error adding album:", error);
            toast.error("Failed to add album.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const getAlbums = async () => {
            try {
                onSnapshot(collection(db, "Albums"), (snapShot) => {
                    const albums = snapShot.docs.map((doc) => ({
                        id: doc.id,
                        ...doc.data(),
                    }));
                    albumDispatch({ type: "GET_ALBUM", payload: { albums } });
                    toast.success("All albums retrieved successfully.");
                });
            } catch (error) {
                console.error("Error fetching albums:", error);
                toast.error("Failed to retrieve albums.");
            } finally {
                setLoading(false);
            }
        };
        getAlbums();
    }, []);

    useEffect(() => {
        if (albumSelected) {
            setLoading(true);
            getImages(albumSelected);
        }
    }, [albumSelected]);

    return (
        <>
            <ToastContainer />
            <Navbar />
            {loading ? (
                <div className="spinner-container">
                    <Spinner radius={50} color={"#333"} stroke={5} visible={true} />
                    <p>Loading data...</p>
                </div>
            ) : null}

            {albumSelected ? (
                imageFormVisibility ? (
                    <ImageForm
                        editImage={editImage}
                        setEditImage={setEditImage}
                        addImage={addImage}
                        imageFormVisibility={imageFormVisibility}
                        albumSelected={albumSelected}
                        setImageFormVisibility={setImageFormVisibility}
                        updateImage={updateImage}
                    />
                ) : null
            ) : albumFormVisibility ? (
                <AlbumForm
                    setAlbumFormVisibility={setAlbumFormVisibility}
                    albumDispatch={albumDispatch}
                    addAlbumIfNotAlreadyExists={addAlbumIfNotAlreadyExists}
                />
            ) : null}
            <AlbumsList
                editImage={editImage}
                setEditImage={setEditImage}
                updateImage={updateImage}
                deleteImage={deleteImage}
                images={imgState.images}
                albums={albumState.albums}
                imageFormVisibility={imageFormVisibility}
                setImageFormVisibility={setImageFormVisibility}
                albumSelected={albumSelected}
                setAlbumSelected={setAlbumSelected}
                searchBarVisibility={searchBarVisibility}
                setSearchBarVisibility={setSearchBarVisibility}
                albumFormVisibility={albumFormVisibility}
                setAlbumFormVisibility={setAlbumFormVisibility}
            />
        </>
    );
}

export default App;
