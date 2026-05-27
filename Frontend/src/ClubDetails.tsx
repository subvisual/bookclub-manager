import { useState } from "react";
import type { BookClub } from "./callApi";

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
	const [showForm, setShowForm] = useState<boolean>(false);
	const [title, setTitle] =
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
		</div>
	);
}
