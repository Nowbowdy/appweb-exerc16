# Revue de code du TP1 de Zachary Vandermeerschen

Par Mikaël Charette

## **SongPlayerControls.vue**
Les variables devrait être des 'let' et non des 'var' car leur comportements sont plus faciles à gérer et empêche certain bug de survenir.
```ts
var playButton;
var pauseButton;
var stopButton;
```
\
Les variables devrait être initialisé au début du document et non à chaque appel de la fonction.
\
\
Le nom du paramètre en entrée devrait être plus spécifique comme _comportement_, _option_, _event_.
```ts
function songController(string :string){
  playButton = document.getElementById("btnPlay");
  pauseButton = document.getElementById("btnPause");
  stopButton = document.getElementById("btnStop");
```
\
Le contenue de chaque ___case___ devrait être une fonction car plus facile à débugger et à maintenir sur le long terme.
```ts
  switch(string){
    case 'play' : 
      playButton?.classList.add('d-none');
      pauseButton?.classList.remove('d-none');
      stopButton?.classList.remove('d-none');

      emit('updateAudioPlayerStatus', 'play');

      break;
    case 'pause' : 
      playButton?.classList.remove('d-none');
      pauseButton?.classList.add('d-none');
      stopButton?.classList.add('d-none');

      emit('updateAudioPlayerStatus', 'pause');

      break;
    case 'stop' : 
      playButton?.classList.remove('d-none');
      pauseButton?.classList.add('d-none');
      stopButton?.classList.add('d-none');

      emit('updateAudioPlayerStatus', 'stop');

      break;
  }
```

## **SongList.vue**
Bonne utilisation des ___await___!
```ts
songList = await songsService.getSongs();
artistList = await artistsService.getArtists();
```

Bonne définition des ___emits___!
```ts
const emit = defineEmits<{
  (event: 'changeSong', firstSong: Song): void;
  (event: 'setArtist', actualSongArtist: Artist): void;
}>()
```
Le nom du paramètre est trop vague et chaque ___case___ devrait être une sous-fonction.
```ts
function listButtonsController(string :string){
  switch(string){
    case 'shuffle' : 
      var randomSongIndex = Math.floor(Math.random() * songList.length);
      setCurrentSong(songList[randomSongIndex])
      break;

    case 'previous' : 
      var previousSongIndex = findIndexInArray(songList, actualSong) - 1
      if(previousSongIndex == -1){
        previousSongIndex = songList.length - 1
      }
      setCurrentSong(songList[previousSongIndex])
      break;

    case 'next' : 
      var nextSongIndex = findIndexInArray(songList, actualSong) + 1
      if(nextSongIndex == songList.length){
        nextSongIndex = 0
      }
      setCurrentSong(songList[nextSongIndex])
      break;
  }
}
```
Fonction trop compliqué.
```ts
function findIndexInArray(songsArray: Song[], song: Song): number {
  let index: number = 0;

  for (let i = 0; i < songsArray.length; i++) {
    if (songsArray[i] === song) {
      index =  i;
    }
  }
  return index;
}
```
Version simplifié:
```ts
function findIndexInArray(songsArray: Song[], song: Song): number {
  return songsArray.indexOf(song);
}
```
Le ___else___ à la fin n'est pas nécessaire car si l'artiste n'est pas trouvé on va par défaut lancer une exception.
```ts
//Va chercher l'artiste correspondant à  l'Id de l'Artiste de la Musique en fonction de l'Id de l'Artiste. Retourne l'Artiste si trouvé, une exception sinon.
function fetchArtistById(songId: number): Artist{
  var myArtist;

  artistList.forEach(artist => {
    if(artist.id == songId){
      myArtist = artist;
    }
  });

  if (myArtist) {
    return myArtist;
  } else {
    throw new Error(`Aucun artiste trouvé avec l'ID ${songId}`);
  }
}
```
## App.vue
Hardcode de l'adresse de base. Ne devrait pas être utilisé car le port peux changer à tout moment.
\
Privilegier les chemin relatif.
```ts
const BASES_PATH = 'http://localhost:5173/src/assets/songs/'
```
Le chemin ___'./src/assets/songs/'___ devrait être la valeur de ___BASES_PATH___.
\
Il devrait aussi avoir un ___await___ ou un ___myAudioPlayer.onload = () => {...}___ pour attendre que la ressource ai fini de charger.
```ts
function changeCurrentAudioSource(){
  var actualPath = BASES_PATH + mySong.value.fileName;

  if(mySong.value && myAudioPlayer.src != actualPath){ //Si chemin actuel n'est pas le même que le nouveau, changer le chemin actual du lecteur
    myAudioPlayer.src = './src/assets/songs/' + mySong.value.fileName //changement de source
    myAudioPlayer.load() //Arrêt de la musique
  }
}
```
## Conclusion
La majorité du code que j'ai regardé me semblait bien correcte.
\
J'ai omis les autres fichiers ***.vue*** car c'était des fichier pour l'affichage des données qui faisait moins de 10-20 lignes.
\
Bref se sont des fichier qui avait peut voir pas de logique/code/algorithme dedans.
\
\
Sinon je ne peux que féliciter mon coéquipier Zachary!
\
\
🎉🎉🎉