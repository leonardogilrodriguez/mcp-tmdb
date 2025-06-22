import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

import {
    filmography_actor_genre,
  filmography_crew_genre,
  two_actors_on_screen,
  two_movies,
  two_people,
} from "./tools";
import { jobs } from "./API/jobs";

// 1. Create the server
const server = new McpServer({
  name: "TMDB Demo",
  version: "1.0.0",
});

// 2. Define tools
server.tool(
  "two_actors_on_screen", // tool title
  "Tool to search movies where two actors appear together", // tool description
  {
    actor1: z.string().describe("Name of the first actor"),
    actor2: z.string().describe("Name of the second actor"),
    language: z
      .string()
      .optional()
      .describe('Language of the results, default is "en"'),
  },
  async ({ actor1, actor2, language }) => {
    const commonMovies = await two_actors_on_screen({
      actor1,
      actor2,
      language,
    });

    return {
      content: [{ type: "text", text: JSON.stringify(commonMovies, null, 2) }],
    };
  }
);

server.tool(
  "two_people", // tool title
  "Tool to search movies where two people work together", // tool description
  {
    person1: z.string().describe("Name of the first person"),
    job1: z.string().optional().describe("Job of the first person. Possible values: cast, crew"),
    person2: z.string().describe("Name of the second person"),
    job2: z.string().optional().describe("Job of the first person. Possible values: cast, crew"),
    language: z
      .string()
      .optional()
      .describe('Language of the results, default is "en"'),
  },
  async ({ person1, job1, person2, job2, language }) => {
    const commonMovies = await two_people({ person1, job1, person2, job2, language });

    return {
      content: [{ type: "text", text: JSON.stringify(commonMovies, null, 2) }],
    };
  }
);

server.tool(
  "two_movies", // tool title
  "Tool to search people who worked in both films", // tool description
  {
    movie1: z.string().describe("Name of the first movie"),
    year1: z.number().optional().describe("Year of the first movie"),
    movie2: z.string().describe("Name of the second movie"),
    year2: z.number().optional().describe("Year of the second movie"),
    language: z
      .string()
      .optional()
      .describe('Language of the results, default is "en"'),
  },
  async ({ movie1, year1, movie2, year2, language }) => {
    const commonPeople = await two_movies({ movie1, year1, movie2, year2, language });

    return {
      content: [{ type: "text", text: JSON.stringify(commonPeople, null, 2) }],
    };
  }
);

server.tool(
  "filmography_actor_genre", // tool title
  "Tool to search the filmography of someone as an actor and a genre", // tool description
  {
    person: z.string().describe("Name of the first actor"),
    genre: z.string().optional().describe("Name of genre"),
    language: z
      .string()
      .optional()
      .describe('Language of the results, default is "en"'),
  },
  async ({ person, genre, language }) => {
    const filmoData = await filmography_actor_genre({
      person,
      genre,
      language,
    });
    return {
      content: [{ type: "text", text: JSON.stringify(filmoData, null, 2) }],
    };
  }
);

server.tool(
  "filmography_crew_genre", // tool title
  "Tool to search the filmography of someone as a film crew and in a genre. Options for field job are in jobs_list", // tool description
  {
    person: z.string().describe("Name of the first actor"),
    job: z.string().optional().describe("Name of job"),
    genre: z.string().optional().describe("Name of genre"),
    language: z
      .string()
      .optional()
      .describe('Language of the results, default is "en"'),
  },
  async ({ person, job, genre, language }) => {
    const filmoData = await filmography_crew_genre({
      person,
      job,
      language,
      genre,
    });
    return {
      content: [{ type: "text", text: JSON.stringify(filmoData, null, 2) }],
    };
  }
);

server.tool(
  "jobs_list", // tool title
  "List of jobs to be used in the filmography_crew tool", // tool description
  {},
  async () => {
    return { content: [{ type: "text", text: JSON.stringify(jobs, null, 2) }] };
  }
);

// 3. Listen for client connections
const transport = new StdioServerTransport();
await server.connect(transport);
