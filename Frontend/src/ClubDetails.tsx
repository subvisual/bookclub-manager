import { useState } from "react";
import type { Book, BookClub, Meeting } from "./callApi";

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
			<p>{description}</p>
			<div className="current-book">
				<div className="book-card"></div>
				<h3>NOW READING</h3>
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
				<button
					className="buttonAdd"
					type="button"
					onClick={() => setShowForm("book")}
				>
					ADD BOOK
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
								updateClub(id, { upcomingBooks: [...upcomingBooks, newBook] });
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
				<button type="button" onClick={() => setShowForm("meeting")}>
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
	);
}
