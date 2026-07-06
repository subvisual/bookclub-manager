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
