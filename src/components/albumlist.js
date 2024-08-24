import "../App.css";
import { Album } from "./album";
import { ImagesList } from "./imagelist";

export function AlbumsList(props) {
    const {
        editImage,
        setEditImage,
        updateImage,
        deleteImage,
        images,
        albums,
        imageFormVisibility,
        setImageFormVisibility,
        albumSelected,
        setAlbumSelected,
        searchBarVisibility,
        setSearchBarVisibility,
        albumFormVisibility,
        setAlbumFormVisibility,
    } = props;
    return albumSelected ? (
        <ImagesList
            editImage={editImage}
            setEditImage={setEditImage}
            updateImage={updateImage}
            deleteImage={deleteImage}
            images={images}
            albumSelected={albumSelected}
            setAlbumSelected={setAlbumSelected}
            imageFormVisibility={imageFormVisibility}
            setImageFormVisibility={setImageFormVisibility}
            searchBarVisibility={searchBarVisibility}
            setSearchBarVisibility={setSearchBarVisibility}
        />
    ) : (
        <div className="albumlist">
            <div className="albumlist-heading">
                <span>Your Albums</span>
                <button className="btn2" onClick={() => setAlbumFormVisibility(true)}>
                    Add Album
                </button>
            </div>
            <div className="albumContainer">
                {albums.map((album) => (
                    <Album setAlbumSelected={setAlbumSelected} album={album} key={album.name} />
                ))}
            </div>
        </div>
    );
}
