console.log('Lets write JavaScript');
let currentSong = new Audio();
let songs;
let currFolder;
var players = document.getElementById("plays");

function secondsToMinutesSeconds(seconds) {
    if (isNaN(seconds) || seconds < 0) {
        return "00:00";
    }

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');

    return `${formattedMinutes}:${formattedSeconds}`;
}

async function getSongs(folder) {
    currFolder = folder;
    
    try {
        // Fetch the songs list from songs.json
        let response = await fetch(`/${folder}/songs.json`);
        if (!response.ok) throw new Error(`Failed to load songs from ${folder}`);
        
        let songsData = await response.json();
        songs = songsData.map(song => song.file); // Extract just the filenames
        
        // Show all the songs in the playlist
        let songUL = document.querySelector(".songList").getElementsByTagName("ul")[0];
        songUL.innerHTML = "";
        
        for (const songData of songsData) {
            const displayName = `${songData.artist} - ${songData.name}`;
            
            // Build credit section with links
            let credit = "";
            if (songData.credit) {
                credit = `${songData.credit}<br>Music provided by NoCopyrightSounds<br>`;
                if (songData.download) {
                    credit += `<a class="links" href="${songData.download}" target="_blank">Download</a>`;
                }
                if (songData.watch) {
                    credit += ` | <a class="links" href="${songData.watch}" target="_blank">Watch</a>`;
                }
            }
        
            songUL.innerHTML += `<li class="li">
            <img class="songimg" width="44" src="${folder}/cover.jpg" alt="">
            <div class="info">
                <div>${displayName}</div>
            </div>
            <div class="playnow">
                <img class="invert" src="img/play.svg" alt="">
            </div>
            </li>
            ${credit ? `<div class="credit" style="font-size: 12px; margin-top: 5px; margin-bottom: 10px;">${credit}</div>` : ''}`;
        }
        
        // Attach an event listener to each song
        Array.from(document.querySelector(".songList").getElementsByTagName("li")).forEach((e, index) => {
            e.addEventListener("click", () => {
                players.removeAttribute("style");
                playMusic(songs[index]);
            });
        });

        return songs;
    } catch (error) {
        console.error('Error loading songs:', error);
        return [];
    }
}

const playMusic = (track, pause = false) => {
    currentSong.src = `/${currFolder}/` + track;
    if (!pause) {
        currentSong.play();
        play.src = "img/pause.svg";
    }
    document.querySelector(".songinfo").innerHTML = decodeURI(track).replace('.mp3', " ");
    document.querySelector(".songtime").innerHTML = "00:00 / 00:00";
}

function attachCardListeners() {
    Array.from(document.getElementsByClassName("card")).forEach(e => { 
        e.addEventListener("click", async item => {
            console.log("Fetching Songs");
            songs = await getSongs(`songs/${item.currentTarget.dataset.folder}`);
            if (songs.length > 0) {
                players.removeAttribute("style");
                playMusic(songs[0]);
            }
        });
    });
}

async function displayAlbums() {
    try {
        let cardContainer = document.querySelector(".cardContainer");
        
        // Fetch albums.json that lists all available albums
        let albumsResponse = await fetch('/albums.json');
        let albums;
        
        if (albumsResponse.ok) {
            albums = await albumsResponse.json();
        } else {
            // Fallback to hardcoded list if albums.json doesn't exist
            albums = [
                {folder: 'Angry_(mood)', title: 'Angry Mood', description: 'Calm your Anger'}, 
                {folder: 'Bright_(mood)', title: 'Bright Songs', description: 'Bright Songs for you'},
                {folder: 'Chill_(mood)', title: 'Just Chill', description: 'Yes, Just Chill'}, 
                {folder: 'Funky_(mood)', title: 'Go Funky', description: 'Lets go Funky'}, 
                {folder: 'Love_(mood)', title: 'I Love You', description: 'Love is in the air'}, 
                {folder: 'ncs', title: 'NCS Songs', description: 'Songs for you'},
                {folder: 'Uplifting_(mood)', title: 'Get up', description: 'You can do it!'}
            ];
        }

        // Clear and display albums
        cardContainer.innerHTML = '';
        albums.forEach(album => {
            cardContainer.innerHTML += `
                <div data-folder="${album.folder}" class="card">
                    <div class="play">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5 20V4L19 12L5 20Z" stroke="#141B34" fill="#000" stroke-width="1.5" stroke-linejoin="round" />
                        </svg>
                    </div>
                    <img src="/songs/${album.folder}/cover.jpg" alt="">
                    <h2>${album.title}</h2>
                    <p>${album.description}</p>
                </div>`;
        });

        // Attach event listeners to cards
        attachCardListeners();

        // Search functionality
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.addEventListener('input', function() {
                const query = this.value.toLowerCase();
                const filteredAlbums = albums.filter(album => 
                    album.title.toLowerCase().includes(query) || 
                    album.description.toLowerCase().includes(query)
                );
                
                cardContainer.innerHTML = '';
                filteredAlbums.forEach(album => {
                    cardContainer.innerHTML += `
                        <div data-folder="${album.folder}" class="card">
                            <div class="play">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5 20V4L19 12L5 20Z" stroke="#141B34" fill="#000" stroke-width="1.5" stroke-linejoin="round" />
                                </svg>
                            </div>
                            <img src="/songs/${album.folder}/cover.jpg" alt="">
                            <h2>${album.title}</h2>
                            <p>${album.description}</p>
                        </div>`;
                });
                
                // Re-attach listeners after filtering
                attachCardListeners();
            });
        }
    } catch (error) {
        console.error('Error displaying albums:', error);
    }
}

async function main() {
    // Get the list of all the songs
    await getSongs("songs/ncs");
    if (songs && songs.length > 0) {
        playMusic(songs[0], true);
    }

    // Display all the albums on the page
    await displayAlbums();

    // Attach an event listener to play
    play.addEventListener("click", () => {
        if (currentSong.paused) {
            currentSong.play();
            play.src = "img/pause.svg";
        } else {
            currentSong.pause();
            play.src = "img/play.svg";
        }
    });

    // Listen for timeupdate event
    currentSong.addEventListener("timeupdate", () => {
        document.querySelector(".songtime").innerHTML = `${secondsToMinutesSeconds(currentSong.currentTime)} / ${secondsToMinutesSeconds(currentSong.duration)}`;
        document.querySelector(".circle").style.left = (currentSong.currentTime / currentSong.duration) * 100 + "%";
    });

    // Add an event listener to seekbar
    document.querySelector(".seekbar").addEventListener("click", e => {
        let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
        document.querySelector(".circle").style.left = percent + "%";
        currentSong.currentTime = ((currentSong.duration) * percent) / 100;
    });

    // Add an event listener for hamburger
    const hamburger = document.querySelector(".hamburger");
    if (hamburger) {
        hamburger.addEventListener("click", () => {
            document.querySelector(".left").style.left = "0";
        });
    }

    // Add an event listener for close button
    const closeBtn = document.querySelector(".close");
    if (closeBtn) {
        closeBtn.addEventListener("click", () => {
            document.querySelector(".left").style.left = "-120%";
        });
    }

    // Add an event listener to previous
    previous.addEventListener("click", () => {
        currentSong.pause();
        console.log("Previous clicked");
        let index = songs.indexOf(currentSong.src.split("/").slice(-1)[0]);
        if ((index - 1) >= 0) {
            playMusic(songs[index - 1]);
        }
    });

    // Add an event listener to next
    next.addEventListener("click", () => {
        currentSong.pause();
        console.log("Next clicked");

        let index = songs.indexOf(currentSong.src.split("/").slice(-1)[0]);
        if ((index + 1) < songs.length) {
            playMusic(songs[index + 1]);
        }
    });

    // Add an event to volume
    document.querySelector(".range").getElementsByTagName("input")[0].addEventListener("change", (e) => {
        console.log("Setting volume to", e.target.value, "/ 100");
        currentSong.volume = parseInt(e.target.value) / 100;
        if (currentSong.volume > 0) {
            document.querySelector(".volume>img").src = document.querySelector(".volume>img").src.replace("mute.svg", "volume.svg");
        }
    });

    // Add event listener to mute the track
    document.querySelector(".volume>img").addEventListener("click", e => { 
        if (e.target.src.includes("volume.svg")) {
            e.target.src = e.target.src.replace("volume.svg", "mute.svg");
            currentSong.volume = 0;
            document.querySelector(".range").getElementsByTagName("input")[0].value = 0;
        } else {
            e.target.src = e.target.src.replace("mute.svg", "volume.svg");
            currentSong.volume = .10;
            document.querySelector(".range").getElementsByTagName("input")[0].value = 10;
        }
    });

    // Keyboard controls
    document.addEventListener("keydown", (event) => {
        if (event.code === "Space") {
            event.preventDefault();
            if (currentSong.paused) {
                currentSong.play();
                play.src = "img/pause.svg";
            } else {
                currentSong.pause();
                play.src = "img/play.svg";
            }
        } else if (event.code === "ArrowRight") {
            event.preventDefault();
            next.click();
        } else if (event.code === "ArrowLeft") {
            event.preventDefault();
            previous.click();
        }
    });
}

main();

// Theme toggle
const themeToggleButton = document.getElementById('theme-toggle');
const lightIcon = document.getElementById('light-icon');
const darkIcon = document.getElementById('dark-icon');

function toggleTheme() {
    document.body.classList.toggle('light-theme');

    if (document.body.classList.contains('light-theme')) {
        if (lightIcon) lightIcon.style.display = 'none';
        if (darkIcon) darkIcon.style.display = 'block';
    } else {
        if (lightIcon) lightIcon.style.display = 'block';
        if (darkIcon) darkIcon.style.display = 'none';
    }
}

if (themeToggleButton) {
    themeToggleButton.addEventListener('click', toggleTheme);
}

// Check theme preference on page load
window.addEventListener('load', () => {
    // Default to dark theme (no need for storage in this simple version)
    if (lightIcon && darkIcon) {
        lightIcon.style.display = 'block';
        darkIcon.style.display = 'none';
    }
});
