## metalyzer

**metalyzer** is a lightweight JavaScript library for extracting metadata from video files in the browser. It provides a simple API to retrieve information such as file name, type, size, dimensions, duration, and more.

## Installation

```
npm install metalyzer
```

## Usage for Video

```javascript
const metaData = await extractVideoMetadata(video);
const videoUrl = await extractVideoUrl(video);
console.log(metaData);
console.log(videoUrl);
```

## Features

- Extracts various video metadata, including file name, type, size, dimensions, duration, etc.
- Provides a simple and easy-to-use API for metadata extraction.
- Supports custom options for advanced usage.

## API

### `extractVideoMetadata(videoFile: File): Promise<VideoMetadata>`

Extracts metadata from a video file.

- `videoFile`: The File object representing the video file.

#### Returns

A Promise that resolves to an object containing video metadata.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests to us.

## Issues

If you discover any issues, please [open an issue](https://github.com/your-username/metalyzer/issues).

## Changelog

See the [CHANGELOG.md](CHANGELOG.md) file for details on changes and releases.
