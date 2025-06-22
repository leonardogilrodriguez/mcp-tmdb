# MCP TMDB

This project is an implementation of the Model Context Protocol (MCP) that provides tools to interact with The Movie Database (TMDB).

## About TMDB

<img src=https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg alt="TMDB logo" width="100%"></img>

The Movie Database (TMDB) is a popular, user editable database for movies and TV shows. It provides a comprehensive API that allows developers to access movie and TV show data, including:

- Movie and TV show information
- Cast and crew details
- Images and posters
- Ratings and reviews
- Similar content recommendations
- And much more

### API Overview

The TMDB API is free to use but requires an API key. You can get your API key by:
1. Creating an account at [TMDB](https://www.themoviedb.org/)
2. Going to your account settings
3. Selecting the "API" section
4. Requesting an API key

### Rate Limits

The API has the following rate limits:
- 40 requests per 10 seconds
- 1000 requests per day

For more information about the API, visit the [TMDB API Documentation](https://developers.themoviedb.org/3).

## Prerequisites

- Node.js (recommended version: 18 or higher)
- pnpm (version 10.7.0 or higher)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/leonardogilrodriguez/mcp-tmdb.git
cd mcp-tmdb
```

2. Install dependencies:
```bash
pnpm install
```

3. Create a `.env` file in the project root with your TMDB API key:
```
TMDB_API_KEY=your_api_key_here
```

## Available Tools

### 1. two_actors_on_screen
Searches for movies where two actors appear together on screen.

**Parameters:**
- `actor1`: Name of the first actor
- `actor2`: Name of the second actor
- `language`: (Optional) Results language (default: "en")

### 2. two_people
Searches for movies where two people work together in any role.

**Parameters:**
- `person1`: Name of the first person
- `job1`: Job of the first person. Possible values: cast, crew
- `person2`: Name of the second person
- `job2`: Job of the second person. Possible values: cast, crew
- `language`: (Optional) Results language (default: "en")

### 3. two_movies
Searches for people who worked in two films in any role.

**Parameters:**
- `movie1`: Name of the first movie
- `year1`: (Optional) Year of the first movie
- `movie2`: Name of the second movie
- `year2`: (Optional) Year of the second movie
- `language`: (Optional) Results language (default: "en")

### 4. filmography_actor_genre
Searches for a person's filmography as an actor in a specific genre.

**Parameters:**
- `person`: Actor's name
- `genre`: (Optional) Genre name
- `language`: (Optional) Results language (default: "en")

### 5. filmography_crew_genre
Searches for a person's filmography as a crew member in a specific genre.

**Parameters:**
- `person`: Person's name
- `job`: (Optional) Job name
- `genre`: (Optional) Genre name
- `language`: (Optional) Results language (default: "en")

### 6. jobs_list
Provides a list of available jobs to use in the filmography_crew_genre tool.

## Usage

To run the MCP server:

```bash
pnpm inspector
```

To run in debug mode:

```bash
pnpm dev:debug
```

## Project Structure

```
mcp-tmdb/
├── API/              # API functions and utilities
├── interfaces/       # Type and interface definitions
├── tools/           # Tool implementations
├── main.ts          # Main entry point
├── package.json     # Project configuration
└── .env            # Environment variables (create)
```

## Main Dependencies

- @modelcontextprotocol/sdk: ^1.12.1
- dotenv: ^16.5.0
- zod: ^3.25.55



## MCP Configuration

### Claude Desktop
To configure this MCP in Claude Desktop:

1. Open Claude Desktop
2. Go to Settings > MCP Configuration
3. Add a new MCP with the following settings:
```json
    "tmdb": {
      "disabled": false,
      "timeout": 60,
      "type": "stdio",
      "command": "tsx",
      "args": [
        "complete_path_to_mcp-tmdb\\main.ts"
      ],
      "env": {
        "TMDB_API_KEY": "your_api_key_here"
      }
    }
```

## Tool Output Examples

### 1. two_actors_on_screen
Example output when searching for movies with Cary Grant and Katharine Hepburn:
```json
[
    {
        "id": 31866,
        "title": "Sylvia Scarlett",
        "year": 1935,
        "media_type": "movie"
    },
    {
        "id": 900,
        "title": "Bringing Up Baby",
        "year": 1938,
        "media_type": "movie"
    },
    {
        "id": 16274,
        "title": "Holiday",
        "year": 1938,
        "media_type": "movie"
    },
    {
        "id": 981,
        "title": "The Philadelphia Story",
        "year": 1940,
        "media_type": "movie"
    }
]
```

### 2. two_people
Example output when searching for collaborations between Christopher Nolan and Hans Zimmer:
```json
[	
    {
        "id": 272,
        "title": "Batman Begins",
        "year": 2005,
        "media_type": "movie"
    },
    {
        "id": 155,
        "title": "The Dark Knight",
        "year": 2008,
        "media_type": "movie"
    },
    {
        "id": 27205,
        "title": "Inception",
        "year": 2010,
        "media_type": "movie"
    }
 	...
]
```
### 3. two_movies
Example output when searching for people who worked in two movies: Titanic and The Lord of the Rings: The Return of the King:

```json
[{
        "id": 1369,
        "name": "Bernard Hill",
        "known_for_department": "Acting"
    },
    {
        "id": 1327030,
        "name": "Lora Hirschberg",
        "job": "Sound Re-Recording Mixer",
        "known_for_department": "Sound"
    },
    {
        "id": 900,
        "name": "Christopher Boyes",
        "job": "Sound Re-Recording Mixer",
        "known_for_department": "Sound"
    },
    {
        "id": 1378696,
        "name": "Ethan Van der Ryn",
        "job": "Sound Effects Editor",
        "known_for_department": "Sound"
    },
    {
        "id": 1425978,
        "name": "Gary Summers",
        "job": "Sound Re-Recording Mixer",
        "known_for_department": "Sound"
    }
]
````

### 4. filmography_actor_genre
Example output when searching for Tom Hanks' horror movies:
```json
[{
        "title": "He Knows You're Alone",
        "character": "Elliot",
        "media_type": "movie",
        "year": 1980
    },
    {
        "title": "The 'Burbs",
        "character": "Ray Peterson",
        "media_type": "movie",
        "year": 1989
    },
    {
        "title": "Vault of Horror I",
        "character": "Baxter",
        "media_type": "movie",
        "year": 1994
    }
]
```

### 4. filmography_crew_genre
Example output when searching for Steven Spielberg's comedy movies as director:
```json
[{
        "title": "The Sugarland Express",
        "media_type": "movie",
        "year": 1974,
        "jobs": [
            "Director"
        ]
    },
    {
        "title": "1941",
        "media_type": "movie",
        "year": 1979,
        "jobs": [
            "Director"
        ]
    },
    {
        "title": "Amazing Stories",
        "media_type": "tv",
        "year": 1985,
        "jobs": [
            "Director"
        ]
    },
    {
        "title": "Hook",
        "media_type": "movie",
        "year": 1991,
        "jobs": [
            "Director"
        ]
    },
    {
        "title": "The Terminal",
        "media_type": "movie",
        "year": 2004,
        "jobs": [
            "Director"
        ]
    }
]
```

### 5. jobs_list
Example output of available jobs:
```json
{
  "jobs": [
    "Director",
    "Producer",
    "Screenplay",
    "Director of Photography",
    "Editor",
    "Production Design",
    "Art Direction",
    "Set Decoration",
    "Costume Design",
    "Makeup",
    "Sound",
    "Visual Effects",
    "Original Music Composer"
  ]
}
``` 

## Demos

### two_actors_on_screen

[![Two Actors on screen](https://img.youtube.com/vi/oQ_wfArl2cw/0.jpg)](https://www.youtube.com/watch?v=oQ_wfArl2cw)

### two_movies

[![Two Actors on screen](https://img.youtube.com/vi/E9buDNeFVBo/0.jpg)](https://www.youtube.com/watch?v=E9buDNeFVBo)

## License

MIT
