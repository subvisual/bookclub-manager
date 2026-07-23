# Book Club Manager — Estado do Código

> Última atualização: gerar este ficheiro sempre que quiseres partilhar o estado atual do projeto de uma vez só.

---

## Frontend

### `src/App.tsx`
```tsx
import "./App.css";
import logo from "./assets/owl-logo.png";
import { ClubDetails } from "./ClubDetails";
import { ClubList } from "./ClubList";
import { useClubs } from "./useClubs";

function App() {
	// Uso o hook criado em useClubs para ir buscar a lista de clubs e selectedClub
	// Fui buscar tb deleteClub e updateClub, uma vez que subiu do ClubList para o App
	const {
		clubs,
		selectedClub,
		showClub,
		deleteClub,
		updateClub,
		backToList,
		loading,
		error,
	} = useClubs();
	// Localizo o club por id, que é igual ao do selectedCLub
	const club = clubs.find((club) => club.id === selectedClub);
	// Se o selectedClub for igual a null ou se o club não existir(o id n existe na lista), mostra CLubList, se não ClubDetails

	if (loading) {
		return <p className="message">Loading...</p>;
	}

	if (error) {
		return <p className="message">Something is wrong.</p>;
	}
	return (
		<>
			<div className="header">
				<img src={logo} alt="owl logo" />
				<h1>The Club Room</h1>
			</div>
			<hr className="title-divider" />
			{selectedClub == null || !club ? (
				// Preciso passar showClub para ClubList para o fluxo App -> ClubList -> ClubCard -> DetailsButton
				<ClubList showClub={showClub} deleteClub={deleteClub} clubs={clubs} />
			) : (
				<ClubDetails
					{...club}
					updateClub={updateClub}
					backToList={backToList}
				/>
			)}
		</>
	);
}

export default App;
```

### `src/callApi.ts`
```ts
export interface BookClub {
	id: number;
	name: string;
	description: string;
	// Vou buscar na interface abaixo
	currentBook: Book;
	// Lista de livros no []
	upcomingBooks: Book[];
	pastBooks: Book[];
	meetings: Meeting[];
}

export interface Book {
	title: string;
	author: string;
}

export interface Meeting {
	date: string;
	time: string;
	place: string;
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
```

### `src/useClubs.ts`
```ts
import { useEffect, useState } from "react";
import type { BookClub } from "./callApi";
import {
	createBookClub,
	deleteBookClub,
	getBookClubs,
	updateBookClub,
} from "./callApi";

export function useClubs() {
	// Usestate devolve variável clubs com o estado atual e setClubs é função do React que atualiza o estado.
	const [clubs, setClubs] = useState<BookClub[]>([]);
	// True, uma vez que quando a pagina carrega já estou a pedir dados
	const [loading, setLoading] = useState<boolean>(true);
	// Mensagem de erro ou null(não há erro).
	const [error, setError] = useState<string | null>(null);

	useEffect(
		() => {
			setLoading(true);
			// A função do callApi, vai buscar os clubs
			getBookClubs()
				// passa os clubs para setClubs
				.then((clubsData) => {
					setClubs(clubsData);
					setLoading(false);
				})
				.catch((err) => {
					setError(err);
					setLoading(false);
				});
		},
		// Para só executar uma vez
		[],
	);

	function deleteClub(id: number) {
		//Função do CallApi que já faz o pedido delete com id
		deleteBookClub(id).then(() => {
			//Setclubs atualiza clubs, filtro o estado atual recebido. Mantém os clubs com id diferente
			setClubs((clubs) => clubs.filter((club) => club.id !== id));
		});
	}

	function updateClub(id: number, updatedClub: Partial<BookClub>) {
		// Do callApi.ts
		updateBookClub(id, updatedClub).then(() => {
			// Atualizo clubs, percorro o array com map, se o id é igual, substitui com dados atualizados, se não mantém os dados.
			setClubs((clubs) =>
				clubs.map((club) =>
					club.id == id ? { ...club, ...updatedClub } : club,
				),
			);
		});
	}

	function createClub(newClub: BookClub) {
		// O then recebe a promise --- BookClub -- em createdClub
		createBookClub(newClub).then((createdClub) => {
			//Atualizo clubs, cria novo array com clubs + novo club
			setClubs((clubs) => [...clubs, createdClub]);
		});
	}

	// Novo estado. Vai receber number(id) ou null. Inicio em null, mostrando a lista de clubs
	const [selectedClub, setSelectedClub] = useState<number | null>(null);
	// Mostro o club quando selecionado o id
	function showClub(id: number) {
		setSelectedClub(id);
	}

	function backToList() {
		setSelectedClub(null);
	}

	return {
		clubs,
		deleteClub,
		updateClub,
		createClub,
		selectedClub,
		showClub,
		backToList,
		loading,
		error,
	};
}
```

### `src/ClubList.tsx`
```tsx
import { ClubCard } from "./ClubCard";
import type { BookClub } from "./callApi";

//O App controla a navegação e agora ClubList precisa receber via props em vez de de ir buscar ao useClubs, uma vez que useClubs subiu para o App
type ClubListProps = {
	clubs: BookClub[];
	deleteClub: (id: number) => void;

	showClub: (id: number) => void;
};

export function ClubList({
	clubs,
	deleteClub,

	showClub,
}: ClubListProps) {
	// percorro o array através de map
	return (
		<div className="club-list">
			{clubs.map((club) => {
				// Passo para o card (key por causa do react)
				//Atualizei o card com
				return (
					<ClubCard
						key={club.id}
						{...club}
						deleteClub={deleteClub}
						showClub={showClub}
					/>
				);
			})}
		</div>
	);
}
```

### `src/ClubCard.tsx`
```tsx
//Importo a interface
import { BookItem } from "./BookItem";
import type { BookClub } from "./callApi";
import { DeleteButton } from "./DeleteButton";
import { DetailsButton } from "./DetailsButton";

//Para receber a function deleteClub. Extende BookClub
type ClubCardProps = BookClub & {
	deleteClub: (id: number) => void;

	showClub: (id: number) => void;
};

// Component para mostrar Club - {props} do BookClub
// Props deleteClub adicionada
export function ClubCard({
	// O DeleteButton precisa do id para saber qual eliminar
	id,
	name,
	description,
	currentBook,
	deleteClub,
	showClub,
	meetings,
}: ClubCardProps) {
	return (
		<div className="club-card" onClick={() => showClub(id)}>
			<BookItem book={currentBook} />
			<div className="club-card-info">
				<h2>{name}</h2>
				<p>{description}</p>
				<div className="current-book-info">
					<h3>Now reading</h3>
					<p>
						{currentBook.title}, by {currentBook.author}
					</p>
				</div>
				<hr />
				<h3>
					Next meeting • <span>{meetings[0].date}</span>
				</h3>
				{/* Passa as props para o DeleteButton, as props que são definidas no ButtonProps*/}

				{/*<DetailsButton id={id} showClub={showClub} />*/}
			</div>
			<div className="button-wrapper">
				<DeleteButton id={id} deleteClub={deleteClub} />
			</div>
		</div>
	);
}
```

### `src/ClubDetails.tsx`
```tsx
import { useState } from "react";
import { BookItem } from "./BookItem";
import type { Book, BookClub, Meeting } from "./callApi";

type ClubDetailsProps = BookClub & {
	backToList: () => void;
	updateClub: (id: number, updateClub: Partial<BookClub>) => void;
};

export function ClubDetails({
	id,
	name,
	description,
	currentBook,
	upcomingBooks,
	pastBooks,
	meetings,
	updateClub,
	backToList,
}: ClubDetailsProps) {
	//Estado para controlar os forms, verifica se é book, meeting ou null
	const [showForm, setShowForm] = useState<"book" | "meeting" | null>(null);
	// Para novo Book
	const [newBook, setNewBook] = useState<Book>({ title: "", author: "" });

	const [newMeeting, setNewMeeting] = useState<Meeting>({
		date: "",
		time: "",
		place: "",
	});
	return (
		<div>
			<h2 className="club-title">{name}</h2>
			<div className="club-header">
				<p>{description}</p>

				<button
					className="back-clubs-button"
					type="button"
					onClick={() => backToList()}
				>
					{" "}
					‹ Back All Clubs{" "}
				</button>
			</div>
			<div className="club-layout">
				<div className="books-layout">
					<div className="current-book">
						<BookItem book={currentBook} />
						<div className="current-book-info">
							<h3>NOW READING</h3>
							<p>{currentBook.title}, </p>
							<p> by {currentBook.author} </p>
						</div>
					</div>

					<h2 style={{ marginTop: "50px", marginBottom: "-25px" }}>
						UPCOMING BOOKS
					</h2>
					<div className="upcoming-books">
						{upcomingBooks.map((book) => {
							return <BookItem key={book.title} book={book} />;
						})}
						<button
							className="buttonAdd"
							type="button"
							onClick={() => setShowForm("book")}
						>
							<span>+</span>
							<span>ADD BOOK</span>
						</button>
						{showForm == "book" && (
							<form className="forms">
								{/*Inicia com o valor do estado newBook que é "" */}
								{/* onChange Esimvent Handler function, o (e) armazena cada letra presionada*/}
								{/*e target copia = valor do input*/}
								<p>TITLE</p>
								<input
									value={newBook.title}
									onChange={(e) =>
										setNewBook({ ...newBook, title: e.target.value })
									}
								/>
								<p>AUTHOR</p>
								<input
									value={newBook.author}
									onChange={(e) =>
										setNewBook({ ...newBook, author: e.target.value })
									}
								/>
								<button
									type="button"
									onClick={() => {
										updateClub(id, {
											upcomingBooks: [...upcomingBooks, newBook],
										});
										//Fecho o form quando termina
										setShowForm(null);
										setNewBook({ title: "", author: "" });
									}}
								>
									SUBMIT
								</button>
							</form>
						)}
					</div>
					<h2 style={{ marginTop: "50px", marginBottom: "-25px" }}>
						PAST BOOKS
					</h2>
					<div className="past-books">
						{pastBooks.map((book) => {
							return <BookItem key={book.title} book={book} />;
						})}
					</div>
				</div>

				<div className="upcoming-meetings">
					<h2>UPCOMING MEETINGS</h2>
					{meetings.map((meeting) => {
						return (
							<div key={meeting.date}>
								<p>{meeting.date}</p>
								<p>{meeting.time}</p>
								<p>{meeting.place}</p>
								<hr />
							</div>
						);
					})}
					<button
						className="buttonDark"
						type="button"
						onClick={() => setShowForm("meeting")}
					>
						ADD MEETING
					</button>
					{showForm == "meeting" && (
						<form>
							<p>DATE</p>
							<input
								value={newMeeting.date}
								onChange={(e) =>
									setNewMeeting({ ...newMeeting, date: e.target.value })
								}
							/>
							<p>TIME</p>
							<input
								value={newMeeting.time}
								onChange={(e) =>
									setNewMeeting({ ...newMeeting, time: e.target.value })
								}
							/>
							<p>PLACE</p>
							<input
								value={newMeeting.place}
								onChange={(e) =>
									setNewMeeting({ ...newMeeting, place: e.target.value })
								}
							/>
							<button
								type="button"
								onClick={() => {
									updateClub(id, { meetings: [...meetings, newMeeting] });
									setShowForm(null);
									setNewMeeting({ date: "", time: "", place: "" });
								}}
							>
								SUBMIT
							</button>
						</form>
					)}
				</div>
			</div>
		</div>
	);
}
```

### `src/BookItem.tsx`
```tsx
import type { Book } from "./callApi";

type BookItemProps = {
	book: Book;
};

export function BookItem({ book }: BookItemProps) {
	return (
		<div className="book-card">
			<div className="book-info">
				<p className="up">{book.author}</p>
				<p>{book.title}</p>
			</div>
		</div>
	);
}
```

### `src/DeleteButton.tsx`
```tsx
type ButtonProps = {
	// DeleteCLub recebe o id do club a apagar e a função deleteClub passado via props
	id: number;

	deleteClub: (id: number) => void;
};

export function DeleteButton({ id, deleteClub }: ButtonProps) {
	return (
		<button className="buttonDark" type="button" onClick={() => deleteClub(id)}>
			DELETE CLUB
		</button>
	);
}
```

### `src/DetailsButton.tsx` (não usado atualmente)
```tsx
type ButtonProps = {
	id: number;
	showClub: (id: number) => void;
};

export function DetailsButton({ id, showClub }: ButtonProps) {
	return (
		<button type="button" onClick={() => showClub(id)}>
			VIEW DETAILS
		</button>
	);
}
```

### `src/App.css`
```css
@import url("https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@300;400;600&family=Quicksand:wght@300;400;500&display=swap");

.header {
	padding: 0 0;
	display: flex;
	align-items: center;
}

.header img {
	height: 100px;
	margin-bottom: -13px;
}

.club-header {
	display: flex;
	justify-content: space-between;
}

body {
	background-color: #fefcf7;
	border: #849483;
	font-family: "Quicksand", sans-serif;
}

h1 {
	color: #b47a65;
	font-family: "Josefin Sans", sans-serif;
	font-weight: 300;
	letter-spacing: 1px;
	font-size: 50px;
	text-align: left;
	margin-bottom: 0;
}

h2 {
	color: #2c3e50;
	font-family: "Josefin Sans", sans-serif;
	font-weight: 600;
	letter-spacing: 0.5px;
	text-align: left;
}

h3 {
	color: #2c3e50;
	font-family: "Josefin Sans", sans-serif;
	font-weight: 400;
	letter-spacing: 0.5px;
	margin-bottom: 3px;
}

p,
span {
	color: #3d5066;
	font-family: "Quicksand", sans-serif;
	font-size: 15px;
	letter-spacing: 0.1px;
	text-align: left;
}

hr {
	border: none; /*para retirar a linha criada por defeito*/
	border-top: 1px solid #e4dac8;
	margin: 8px 0 16px;
}

.message {
	display: flex;
	justify-content: center;
	align-items: center;
	/*Ocupa a altura do ecrã, para centrar na vertical*/
	height: 100vh;
	font-size: x-large;
}

.title-divider {
	border: none;
	border-top: 1px solid #b47a65;
}

.club-card {
	background-color: #ffffff;
	border: 1px solid #e4dac8;
	border-radius: 8px;
	padding: 20px;
	box-sizing: border-box;

	width: calc((100% - 40px) / 3);
	height: 320px;
	display: flex;
	gap: 12px;
	align-items: flex-start;
	cursor: pointer;
	position: relative;
}

@media (max-width: 900px) {
	.club-card {
		width: calc((100% - 20px) / 2);
	}
}

@media (max-width: 600px) {
	.club-card {
		width: 100%;
	}
}

.club-card:hover {
	border: 1px solid #b47a65;
	box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
	position: relative;
	top: -5px;
	overflow: hidden;
}

.button-wrapper {
	position: absolute;
	bottom: 0;
	right: 0;
	background-color: #ffffff;
	padding: 16px;
}

.buttonDark {
	background-color: #3d5066;
	color: #fefcf7;
	border-radius: 5px;
	border: none;
	padding: 6px 10px;

	bottom: 10px;
	right: 16px;
	cursor: pointer;
}

.buttonDark:hover {
	background-color: #2c3e50;
}

.club-card-info {
	text-align: left;
	padding-bottom: 60px;
}
.club-card-info p {
	margin-bottom: 10px;
}

.club-card-info h3 {
	margin-top: 4px;
}

.club-list {
	max-width: 1350px;
	width: 100%;
	margin: 0 auto;
	display: flex;
	justify-content: space-around;
	margin-top: 30px;
	flex-wrap: wrap;
	gap: 20px;
}

.club-title {
	font-size: 35px;
	margin-top: 40px;
}

.back-clubs-button {
	font-family: "Josefin Sans", sans-serif;
	color: #2c3e50;
	background-color: transparent;
	border: none;
	cursor: pointer;
	font-size: 18px;
	display: flex;
	justify-content: center;
	align-items: center;
}

.back-clubs-button:hover {
	background-color: #3d5066;
	color: #ffffff;
	border-radius: 5px;
	padding: 5px;
	display: flex;
	justify-content: center;
	align-items: center;
}

.current-book {
	margin-top: 30px;
	border: 1px solid #b47a65;
	border-radius: 5px;
	padding: 20px;
	max-width: 750px;
	text-align: left;
	display: flex;
	gap: 20px;
	background-color: #ffffff;
}

.current-book-info {
	text-align: left;
	display: flex;
	flex-direction: column;
}

.book-card {
	width: 90px;
	height: 130px;
	background-color: #82a87f;
	border-radius: 3px;
	flex-shrink: 0;
	display: flex;
	border-left: 4px solid rgba(0, 0, 0, 0.1);
}

.book-info {
	border: 1px solid #fefcf780;
	margin: 5px;
	height: calc(100% - 10px);
	width: calc(100% - 10px);
	border-radius: 2px;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	box-sizing: border-box;
}

.book-info p {
	font-size: 11px;
	text-align: left;
	padding: 4px;
	color: #fefcf7;
}
.up {
	text-transform: uppercase;
	font-size: 9px;
}

.upcoming-books {
	text-align: left;
	margin-top: 30px;
	padding: 20px 0;
	display: flex;
	gap: 25px;
	background-color: #ffffff;
	max-width: 800px;
	flex-wrap: wrap;
}

.past-books {
	text-align: left;
	margin-top: 30px;
	padding: 20px 0;
	display: flex;
	gap: 25px;
	max-width: 800px;
	flex-wrap: wrap;
}

.upcoming-meetings {
	border: 1px solid #b47a65;
	border-radius: 5px;
	text-align: left;
	margin-top: 30px;
	padding: 20px;
	width: 350px;
	background-color: #ffffff;
	margin-left: auto;
}

.club-layout {
	display: flex;
	gap: 30px;
	margin-top: 25px;
	align-items: flex-start;
	justify-content: space-between;
	padding-right: 170px;
}

.books-layout {
	max-width: 1350px;
	margin: 0 auto;
	padding: 0 40px;
}

.buttonAdd {
	font-family: "Josefin Sans", sans-serif;

	background-color: #ffffff;
	cursor: pointer;
	border: 1px solid #82a87f;
	width: 90px;
	height: 130px;

	border-radius: 3px;
}
.buttonAdd span {
	display: block;
	text-align: center;
	color: #82a87f;
	font-weight: 500;
}

.buttonAdd:hover {
	border: 1px solid #b47a65;
	background-color: #fefcf7;
}
.buttonAdd:hover span {
	color: #b47a65;
}

.forms {
	text-align: left;
}
.forms input {
	display: block;
	margin-bottom: 10px;
}
```

---

## Backend

### `routes/clubs.js`
```javascript
const express = require("express");
const router = express.Router();
const fs = require("fs");
const { stringify } = require("querystring");

const data = fs.readFileSync("./clubs.json", "utf8");
const clubs = JSON.parse(data);

router.get("/", (req, res) => {
	res.json(clubs);
});

router.post("/", (req, res) => {
	const newBookClub = req.body;
	//Adiciono ao array
	clubs.clubs.push(newBookClub);
	// Guarda em json
	fs.writeFileSync("./clubs.json", JSON.stringify(clubs));
	res.json(newBookClub);
});

router.delete("/:id", (req, res) => {
	// Para ir buscar o id do pedido, é devolvido em req.params.id e armazenado em id
	const id = Number(req.params.id);
	// Filtro os clubs e armazeno se for diferente do id.
	const update = clubs.clubs.filter((club) => club.id !== id);

	clubs.clubs = update;
	fs.writeFileSync("./clubs.json", JSON.stringify(clubs));

	res.json(update);
});

router.put("/:id", (req, res) => {
	const id = Number(req.params.id);
	// Para buscar os novos dados do clube
	const updatedClub = req.body;
	// Localizo o clube pelo id
	const clubId = clubs.clubs.find((club) => club.id == id);
	// Modifica o clube encontrado, copia os dados do updatedClub para clubId
	Object.assign(clubId, updatedClub);

	fs.writeFileSync("./clubs.json", JSON.stringify(clubs));
	res.json(clubId);
});

module.exports = router;
```

---

## Notas / Pontos em aberto conhecidos

- `createClub` / `createBookClub` / `POST /clubs` estão implementados mas nunca usados no frontend (não há UI para criar um novo clube).
- `DetailsButton.tsx` existe mas não é usado — o `ClubCard` inteiro é clicável em vez disso.
- `PUT` só é usado para adicionar livros/reuniões, nunca para editar nome/descrição do clube.
- Sem raciocínio implementado sobre múltiplos pedidos simultâneos a alterar o `clubs.json`.
- Erros Biome pendentes: `DetailsButton` importado sem uso no `ClubCard.tsx`, vários `==` em vez de `===`, `noNonNullAssertion` no `main.tsx`, acessibilidade do `onClick` no `.club-card`.
