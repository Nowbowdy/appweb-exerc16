# Revue de code du TP1 de ZMikael Charette

Par Zachary Vandermeerschen



## SongList.vue

__Premièrement, le code n'est, malheureusement, pas bien réparti dans le projet. La page "SongList" devient trop lourde pour ce qu'elle est censé être et vient ruiner l'impact que les composants sont censés avoir sur la construction du projet.__

\
\
Le nom de la méthode n'est pas assez claire, certes elle créé un _li_, mais elle devrait spécifié l'utilité du _li_ créé, tel que _createLiSongElement_. Voir même _createListSongElement_.
```ts
function createLiElement(json: any, i: number): void {
    const li = document.createElement("li");
    li.innerHTML = json[i].songName;
    li.id = `songs-${json[i].id - 1}`
    li.addEventListener("click", chooseThisSong)
    if (i === currentIndex) li.classList.add("active")
    document.getElementById("songsList")!.appendChild(li)
}
```
\
\
\
Certes, la méthode est efficace, mais d'après moi, faire une fonction pour les __Artist__ et une fonction pour les __Song__ auraient été pertinent,
que ce soit pour un soucis de débuggage, mais aussi de lisibilité. Mais sinon très bonne utilisation du _fetch_, _then_, _catch_, _finally_, je prend note.
```ts
function fetchDatabase(): void {
    fetch(SONGS_URL)
        .then(response => response.json())
        .then(json => {
            for (let i = 0; i < json.length; i++) {
                songList = songList.concat(json[i])
                createLiElement(json, i);
            }
        })
        .catch(showErrorMessage)
        .finally(() => {
            fetch(ARTISTS_URL)
                .then(response => response.json())
                .then(json => {
                    for (let i = 0; i < json.length; i++) {
                        artistList = artistList.concat(json[i])
                    }
                })
                .catch(showErrorMessage)
                .finally(() => {
                    changePageSongInfo(currentIndex)
                })

        })
};
```
\
\
Plusieurs méthodes ne respectent pas la norme de la __Résponsabilité unique__, comme par exemple _changePageActiveSong_, qui, à chaque appel, doit aller chercher l'élément afin de changer sa visibilité. Une méthode s'occupant de la recherche ainsi que du changement de visibilité aurait pu être une bonne idée.
```ts
function changePageActiveSong(id: number): void {
    document.getElementById(`songs-${currentIndex}`)!.classList.remove("active")
    currentIndex = (currentIndex + id) % (songList.length)
    if (currentIndex < 0) currentIndex += songList.length
    document.getElementById(`songs-${currentIndex}`)!.classList.add("active")
}
```
\
\
\
Sur-utilisation des _getElementById_, comme dans ce cas-ci, ou, une variable déclaré dans la page aurait été plus efficace que de toujours aller les recherchers à chaque appel de fonction.
```ts
function changePageSongInfo(id: number): void {
    document.getElementById("songName")!.innerHTML = songList[id].songName
    document.getElementById("artistName")!.innerHTML = artistList[songList[id].artistId - 1].name
    document.getElementById("songDesc")!.innerHTML = songList[id].desc
    document.getElementById("artistDesc")!.innerHTML = artistList[songList[id].artistId - 1].desc

    // https://stackoverflow.com/questions/34647536/how-to-get-audio-duration-value-by-a-function#34647636
    audio.src = `./src/assets/songs/${songList[id]["fileName"]}`
    audio.onloadedmetadata = () => {
        document.getElementById("duration")!.innerHTML = "" + formatTime(audio.duration)
    }
}
```
\
\
\
Un nom de méthode plus parlant aurait été bien. 
```ts
function rng(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min)) + min
}
```
\
\
\
Un nom de méthode et de variable plus parlant auraient été bien. (Sans docummentation je n'aurais pas compris le but de la méthode)
```ts
function padTime(n: number): string {
    return n.toString().padStart(2, "0")
}
```
\
\
\
Encore une fois, sur-utilisation du _getElementById_, des variables générales auraient été plus qu'efficace ici.
```ts
function setEventListeners(): void {
    document.getElementById("btnPlay")!.onclick = () => {
        if (audio.paused)
            audio.play()

        document.getElementById("btnPlay")!.classList.add(DISPLAY_NONE_SHORTCUT)
        document.getElementById("btnPause")!.classList.remove(DISPLAY_NONE_SHORTCUT)
        document.getElementById("btnStop")!.classList.remove(DISPLAY_NONE_SHORTCUT)
    }
    document.getElementById("btnPause")!.onclick = () => {
        if (!audio.paused)
            audio.pause()

        document.getElementById("btnPlay")!.classList.remove(DISPLAY_NONE_SHORTCUT)
        document.getElementById("btnPause")!.classList.add(DISPLAY_NONE_SHORTCUT)
        document.getElementById("btnStop")!.classList.remove(DISPLAY_NONE_SHORTCUT)
    }
    document.getElementById("btnStop")!.onclick = () => {
        audio.pause()
        audio.currentTime = 0

        document.getElementById("btnPlay")!.classList.remove(DISPLAY_NONE_SHORTCUT)
        document.getElementById("btnPause")!.classList.add(DISPLAY_NONE_SHORTCUT)
        document.getElementById("btnStop")!.classList.add(DISPLAY_NONE_SHORTCUT)
    }
}
```
\
\
\
Un nom de méthode pas assez parlant. Que signifie les _intervales_ dans ce contexte ?
```ts
function setIntervals(): void {
    setInterval(function () { document.getElementById("currentTime")!.innerHTML = formatTime(audio.currentTime) }, 200)
}
```
\

## Conclusion

En bref, je trouve le travail bien réalisé, mais beaucoup de DRY dans l'ensemble du code aurait pu être évité. 
\
\
🎉🎉🎉