# video-processor <a id="top"></a>

A simple video project created to refresh skills in Nest.js, RabbitMQ, and MongoDB.

## Table of contents

- [Description](#description)
- [Usage](#usage)
    - [Prerequisites](#prerequisites)
    - [Running the application](#running)
    - [Tests](#tests)
- [Architecture](#architecture)
    - [C1 - Context](#context)
    - [C2 - Container](#container)
    - [C3 - Component](#component)
- [References](#references)

## Description <a id="description"></a>

This API should be able to perform a basic processing of a given video.
Firstly, all necessary metadata should be extracted from this video.
Then, based on the metadata a video should be processed.
Eventually, the processed video should be saved based on a configured strategy (e.g. locally).
Finally, the database should contain information about processing status and video data.

<p align="right">(<a href="#top">back to top</a>)</p>

## Usage <a id="usage"></a>

### Prerequisites <a id="prerequisites"></a>

Before using the app you need make sure you have installed FFmpeg on your machine:

```
brew install ffmpeg
```

Also, make sure you have installed [Docker](https://www.docker.com/products/docker-desktop/).

<p align="right">(<a href="#top">back to top</a>)</p>

### Running the application <a id="running"></a>

To start the application:

1. Run docker in the project's root directory

```
docker-compose up
```

2. Install dependencies:

```
npm i --legacy-peer-deps
```

3. Start the app:

```
npm start
```

Here's a list of supported endpoints:

| Method | URI               | Description                       |
|--------|-------------------|-----------------------------------|
| POST   | _/videos/process_ | inits video processing            |
| GET    | _/videos/:id_     | retrieves video with the given id |
| GET    | _/docs_           | shows OpenAPI documentation       |

<p align="right">(<a href="#top">back to top</a>)</p>

### Tests <a id="tests"></a>

Tests can be run via the following script:

```
npm test
```

<p align="right">(<a href="#top">back to top</a>)</p>

## Architecture <a id="architecture"></a>

In order to better understand what's going on here, let's see a few diagrams and shed more light on the system.

### C1 - Context <a id="context"></a>

Generally speaking, the video processor should take a video, do the magic, and make it available to see the results.
Because it's based on asynchronous communication via queues, after the user sends a request to process a video,
he receives a quick response with generated video ID, so he's able to check the processing status later.

<img src="docs/architecture/C1.png" alt="C1">

<p align="right">(<a href="#top">back to top</a>)</p>

### C2 - Container <a id="container"></a>

The only part of the system which is exposed to users is an API Gateway.
Because processing videos must be somehow triggerred, a simple HTTP endpoint was created for that,
but it can be easily replaced with another event.

After a handler is called, RabbitMQ topics are used to orchestrate its work.
Thanks to them, we are able to create a modular structure
(which is going to be described in the next section)
and react on some topics in order to save or update results in MongoDB.

<img src="./docs/architecture/C2.png" alt="C2">

<p align="right">(<a href="#top">back to top</a>)</p>

### C3 - Component <a id="component"></a>

The application consists of 5 major modules:

1. Gateway Module
2. Analyzing Module
3. Processing Module
4. Storage Module
5. Video Module

Let's briefly describe each of them.

#### Gateway Module

This module represents an API gateway layer containing the HTTP endpoints which can be used to use the app.
This module starts the chain of operations performed to process the video.

#### Analyzing Module

It is responsible for extracting the metadata from the given video.
Also, it should notify the Processing Module that it can start its work.

#### Processing Module

It processes a video by applying some filters (scaling and padding the video) using FFmpeg.
Also, it triggers the right storage strategy responsible for saving the processed video.
Once its job is done, it notifies the Video Module that the video is processed.

#### Storage Module

This module is a layer responsible for storing the results of video processing.
Thanks to it, we can implement a set of strategies used for storing results
(e.g. storing the results locally, in S3, database, or any other source).

#### Video Module

The aim of this module is to encapsulate the logic connected with the database.
Thanks to it, we can easily replace the chosen database, and plug another one in seconds.
Also, if scaling the database was necessary, or if we wanted to migrate to microservices,
a dedicated module for database would be a great help with it!

<img src="./docs/architecture/C3.png" alt="C3">

<p align="right">(<a href="#top">back to top</a>)</p>

## References <a id="references"></a>

- All videos used for testing were taken from [this](https://gist.github.com/jsturgis/3b19447b304616f18657) gist.
- Postman collection for API can be found in the [docs](./docs) directory.
