import { useState } from "react";
import type { Book, BookClub } from "./callApi";

type ClubDetailsProps = BookClub & {
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
}: ClubDetailsProps) {
	//Estado para controlar o form, inicia em null para mostrar apenas quando o button é clicado
	const [showForm, setShowForm] = useState<boolean>(false);
	// Para novo Book
	const [newBook, setNewBook] = useState<Book>({ title: "", author: "" });
	return (
		<div>
			<h1>{name}</h1>
			<p>{description}</p>
			<div className="current-book">
				<h2>CURRENT BOOK</h2>
				<p>{currentBook.title}</p>
				<p>{currentBook.author}</p>
			</div>
			<div className="upcoming-books">
				<h2>UPCOMING BOOKS</h2>
				{upcomingBooks.map((book) => {
					return (
						<div key={book.title}>
							<div>
								{" "}
								<p>{book.title}</p>
							</div>
							<div>
								{" "}
								<p>{book.author}</p>
							</div>
						</div>
					);
				})}
			</div>
			<div className="past-books">
				<h2>PAST BOOKS</h2>
				{pastBooks.map((book) => {
					return (
						<div key={book.title}>
							<div>
								{" "}
								<p>{book.title}</p>
							</div>
							<div>
								<p>{book.author}</p>
							</div>
						</div>
					);
				})}
			</div>
			<div className="upcoming-meetings">
				<h2>UPCOMING MEETINGS</h2>
				{meetings.map((meeting) => {
					return (
						<div key={meeting.date}>
							<p>{meeting.date}</p>
							<p>{meeting.time}</p>
							<p>{meeting.place}</p>
						</div>
					);
				})}
			</div>
			<button type="button" onClick={() => setShowForm(true)}>
				ADD BOOK
			</button>
			{showForm && (
				<form className="forms">
					{/*Inicia com o valor do estado newBook que é "" */}
					{/* onChange Event Handler function, o (e) armazena cada letra presionada*/}
					{/*e target copia = valor do input*/}
					<p>TITLE</p>
					<input
						value={newBook.title}
						onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
					/>
					<p>AUTHOR</p>
					<input
						value={newBook.author}
						onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
					/>
					<button
						type="button"
						onClick={() =>
							updateClub(id, { upcomingBooks: [...upcomingBooks, newBook] })
						}
					>
						SUBMIT
					</button>
				</form>
			)}
		</div>
	);
}
