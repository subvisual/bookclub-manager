import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { expect, vi } from "vitest";

import App from "./App";
import { useClubs } from "./useClubs";

const mockClubs = [
    {
    id: 1,
    name:"Club One",
    description:"...",
    currentBook: 
    {
        title:"...",
        author: "..."
    },
    upcomingBooks: [
        {
        title:"...",
        author: "..."
        }
    ],
    pastBooks: [
        {
        title:"...",
        author: "..."
        }
    ],
    meetings: [
        {
        date:"...",
        time:"...",
        place:"..."  
        }
    ]
 }, {
    id: 2,
    name:"Club Two",
    description:"...",
    currentBook: {
        title:"...",
        author: "..."
    },
    upcomingBooks: [{
        title:"...",
        author: "..."
    }],
    pastBooks: [{
        title:"...",
        author: "..."
    }],
    meetings: [{
        date:"...",
        time:"...",
        place:"..."
        
    }]
 }]

it("Renders book clubs in the App", () => {



// O vitest substitui o módulo "./useClubs" por outro falso
vi.mock("./useClubs", () => ({
    useClubs: () => {
        return {
            clubs:mockClubs,
            deleteClub: vi.fn(),
            updateClub: vi.fn(),
            createClub: vi.fn(),
            selectedClub: null,
            showClub: vi.fn(),
            backToList: vi.fn(),
            loading:false,
            error:null,
}
    }
}));

render(<App/>)

const club = screen.getByText("Club One")
expect(club).toBeInTheDocument();

const clubTwo = screen.getByText("Club Two")
expect(clubTwo).toBeInTheDocument();
});