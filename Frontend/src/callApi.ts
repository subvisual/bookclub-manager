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
	return fetch(`${url}/${id}`, { method: "DELETE" }).then((response) => {
		if (response.status == 200) {
			return;
		}
	});
}

export function updateBookClub(
	id: number,
	// UpdatedClub recebe apenas os dados atualizados -- Partial.
	updatedClub: Partial<BookClub>,
): Promise<BookClub> {
	return fetch(`${url}/${id}`, {
		method: "PUT",
		// updatedCLub é convertido para JSON -- stringify -- no body
		body: JSON.stringify(updatedClub),
		// headers indica que está a enviar json
		headers: { "Content-Type": "application/json" },
	}).then((response) => {
		if (response.status == 200) {
			return response.json().then((data) => data);
		}
	});
}

export function createBookClub(newClub: BookClub): Promise<BookClub> {
	return fetch(url, {
		method: "POST",
		body: JSON.stringify(newClub),
		headers: { "Content-Type": "application/json" },
	}).then((response) => {
		if (response.status == 200) {
			return response.json().then((data) => data);
		}
	});
}
