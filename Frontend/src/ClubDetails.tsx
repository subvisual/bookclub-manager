import type { BookClub } from "./callApi";

type ClubDetailsProps = BookClub;

export function ClubDetails({
	id,
	name,
	description,
	currentBook,
	upcomingBooks,
	pastBooks,
}: ClubDetailsProps) {
	return (
		<div>
			<h1>{name}</h1>
			<p>{description}</p>
			<p>{currentBook.title}</p>
			<p>{currentBook.author}</p>
			<div>
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
			<div>
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
		</div>
	);
}
