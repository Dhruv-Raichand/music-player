# 🎵 MUZIX - Music Player

A modern, fully-featured web-based music player with mood-based playlists, search functionality, and a beautiful dark/light theme interface. Built with vanilla JavaScript, HTML5, and CSS3.

![Music Player Demo](https://img.shields.io/badge/Status-Live-success)
![License](https://img.shields.io/badge/License-MIT-blue)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)

## 📖 Description

MUZIX is a sleek, responsive web music player that provides a Spotify-like experience. It features mood-based playlist organization, real-time audio controls, and an elegant interface with animated card effects. Perfect for personal music collections or as a learning project for web development.

**Keywords**: music player, web audio player, HTML5 audio, responsive design, mood playlists, JavaScript audio, dark mode, CSS animations, web music app, audio streaming

## ✨ Features

- 🎨 **Dark/Light Theme Toggle** - Switch between themes for comfortable listening
- 🎵 **Multiple Playlists** - 7 mood-based playlists (Angry, Bright, Chill, Funky, Love, NCS, Uplifting)
- 🔍 **Search Functionality** - Quickly find albums by title or description
- ⌨️ **Keyboard Controls** - Space to play/pause, Arrow keys for next/previous track
- 📱 **Responsive Design** - Works seamlessly on desktop, tablet, and mobile
- 🎚️ **Full Audio Controls** - Play, pause, next, previous, seek, volume control
- 🖼️ **Album Art Display** - Beautiful cover images for each playlist
- 📝 **Song Credits** - Proper attribution with download and watch links
- 🎯 **Progress Bar** - Visual seekbar with time display
- ✨ **Animated Cards** - Rotating gradient border animations
- 🌐 **SEO Optimized** - Meta tags and Open Graph support

## 🛠️ Technologies Used

- **HTML5** - Semantic markup and audio element
- **CSS3** - Custom properties, animations, flexbox, grid
- **JavaScript (ES6+)** - Async/await, fetch API, DOM manipulation
- **JSON** - Data storage for songs and playlists
- **SVG** - Scalable vector icons
- **Web Audio API** - HTML5 audio playback

## 🚀 Demo

[Live Demo](https://music-player-six-taupe.vercel.app)

## 📋 Prerequisites

- A web server (Apache, Nginx) or static hosting service (Vercel, Netlify, GitHub Pages)
- Modern web browser with HTML5 audio support
- Basic knowledge of JSON for managing playlists

## 📁 Project Structure

```
music-player/
├── index.html              # Main HTML file
├── style.css              # Styling
├── script.js              # Main JavaScript logic
├── img/                   # UI icons (play, pause, volume, etc.)
│   ├── play.svg
│   ├── pause.svg
│   ├── volume.svg
│   └── mute.svg
└── songs/                 # Music library
    ├── ncs/
    │   ├── songs.json     # Song metadata
    │   ├── info.json      # Album information
    │   ├── cover.jpg      # Album artwork
    │   ├── Cradles.mp3
    │   └── Mortals.mp3
    ├── Angry_(mood)/
    │   ├── songs.json
    │   ├── info.json
    │   └── cover.jpg
    └── ... (other playlists)
```

## 🛠️ Installation

### Option 1: Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/music-player.git
   cd music-player
   ```

2. **Add SEO Meta Tags** (Optional but recommended)
   - Add the meta tags from `meta-tags.html` to your `index.html` `<head>` section
   - Update URLs and author information
   - Add a `manifest.json` file for PWA support

3. **Start a local server**
   ```bash
   # Using Python 3
   python -m http.server 8000
   
   # Using PHP
   php -S localhost:8000
   
   # Using Node.js http-server
   npx http-server -p 8000
   ```

3. **Open in browser**
   ```
   http://localhost:8000
   ```

### Option 2: Deploy to Vercel

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Deploy**
   ```bash
   vercel
   ```

3. **Note**: Vercel has file size limits. For MP3 files, consider using external storage (see Troubleshooting section).

### Option 3: Deploy to Netlify

1. **Drag and drop** your project folder to [Netlify Drop](https://app.netlify.com/drop)
2. Or use Netlify CLI:
   ```bash
   npm install netlify-cli -g
   netlify deploy
   ```

## 📝 Configuration

### Adding a New Playlist

1. **Create a folder** in `/songs/` directory:
   ```
   /songs/YourPlaylist/
   ```

2. **Add `info.json`**:
   ```json
   {
     "title": "Your Playlist Name",
     "description": "Playlist description"
   }
   ```

3. **Add `songs.json`**:
   ```json
   [
     {
       "name": "Song Title",
       "artist": "Artist Name",
       "file": "song-file.mp3",
       "watch": "https://youtube.com/watch?v=...",
       "download": "https://download-link.com",
       "credit": "Song: Artist - Title [Release Info]"
     }
   ]
   ```

4. **Add files**:
   - Place MP3 files in the folder
   - Add `cover.jpg` (recommended: 300x300px)

5. **Update script.js**:
   Add your playlist to the albums array (around line 116):
   ```javascript
   {folder: 'YourPlaylist', title: 'Your Playlist Name', description: 'Description'}
   ```

### Optional: Create `/albums.json`

To dynamically load all albums, create this file in the root:

```json
[
  {"folder": "ncs", "title": "NCS Songs", "description": "Songs for you"},
  {"folder": "YourPlaylist", "title": "Your Playlist", "description": "Description"}
]
```

## ⌨️ Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `Space` | Play / Pause |
| `→` (Right Arrow) | Next track |
| `←` (Left Arrow) | Previous track |

## 🎨 Customization

### Change Theme Colors

Edit `style.css` to customize colors:

```css
:root {
  --primary-color: #your-color;
  --background: #your-background;
}
```

### Modify Player Controls

The player controls are in `index.html`. You can add more buttons or features by:
1. Adding HTML elements
2. Creating event listeners in `script.js`
3. Styling in `style.css`

## 🐛 Troubleshooting

### MP3 Files Not Playing on Vercel

**Problem**: Vercel has file size limits and may not deploy large MP3 files.

**Solutions**:

1. **Use external hosting** for MP3 files:
   - Upload MP3s to Cloudinary, AWS S3, or Google Cloud Storage
   - Update `playMusic()` function in `script.js`:
     ```javascript
     currentSong.src = `https://your-cdn.com/${currFolder}/${track}`;
     ```

2. **Use Netlify instead** - Better for hosting media files

3. **Compress MP3 files** to reduce size

### Songs Not Loading

- Check browser console (F12) for errors
- Verify `songs.json` format is correct
- Ensure file paths match exactly (case-sensitive)
- Check that MP3 files are in the correct folders

### Theme Not Saving

This is expected behavior - the theme resets on page reload. To persist theme:
- Use a backend to store preferences
- Or uncomment the localStorage code (note: may not work in all hosting environments)

## 🤝 Contributing

Contributions are welcome! Here's how:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Credits

- **NCS Music** - [NoCopyrightSounds](https://ncs.io) for royalty-free music
- Icons - SVG icons for player controls
- Fonts - [Your font source]

## 📧 Contact

**GitHub**: [@Dhruv-Raichand](https://github.com/yourusername)  
**Email**: dhruvraichand70@example.com  
**LinkedIn**: [Dhruv Raichand](https://www.linkedin.com/in/dhruv-raichand-560a67273)

**Project Link**: [https://github.com/yourusername/music-player](https://github.com/yourusername/music-player)  
**Live Demo**: [https://music-player-six-taupe.vercel.app](https://music-player-six-taupe.vercel.app)

---

⭐ **Star this repo** if you found it helpful!

## 🔮 Future Enhancements

- [ ] Playlist creation and management
- [ ] Shuffle and repeat modes
- [ ] Lyrics display
- [ ] Audio visualizer
- [ ] Social sharing features
- [ ] User accounts and favorites
- [ ] Queue management
- [ ] Equalizer controls
