import "../App.css";

export function Album({ setAlbumSelected, album }) {
    const handleClick = (e) => {
        e.preventDefault();
        setAlbumSelected(album.name);
        console.log(album.name);
    };

    return (
        <div className="album-thumbnail" onClick={handleClick}>
            <img src="photo.jpg" />
            <span className="albumName">{album.name}</span>
        </div>
    );
}
