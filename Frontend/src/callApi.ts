export interface BookClub {
	id: number;
	name: string;
	description: string;
	// Vou buscar na interface abaixo
	currentBook: Book;
	// Lista de livros no []
	upcomingBooks: Book[];
	pastBooks: Book[];
}

export interface Book {
	title: string;
	author: string;
}

export const url = "http://localhost:3000/clubs";

// : Tipar a função. Esta devolve uma promise que por sua vez devolve o [] de clubs.
// É chamada no react
export function getBookClubs(): Promise<BookClub[]> {
	// GET por defeito
	return fetch(url).then((response) => {
		if (response.status == 200) {
			return response.json().then((data) => data.clubs);
		}
	});
}

//Tenho que passar id como parâmetro. A promise não devolve nada, só confirma o delete.
export function deleteBookClub(id: number): Promise<void> {
	// Concatenei à const url
	return fetch(`${url}/${id}`).then((response) => {
		if (response.status == 200) {
			return;
		}
	});
}
